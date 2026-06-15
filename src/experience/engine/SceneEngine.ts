import * as THREE from "three";
import Lenis from "lenis";
import { ParallaxScene } from "./ParallaxScene";
import { ParticleField } from "./ParticleField";
import { Atmosphere } from "./Atmosphere";
import { Portal } from "./Portal";
import { JourneySnap } from "./JourneySnap";
import { detectQuality, type QualitySettings } from "./quality";
import { journeyProgress } from "./progress";
import { JOURNEY, PLATE_ASPECT, type SceneDef } from "./scenes";

const FOV = 45;
const BASE_DIST = 5;
const OVERSCAN = 1.05;

/**
 * The Phase 2 scene engine. Owns the renderer, a stack of depth-parallax plates
 * (one per beat), the ambient particle field, the post-processing atmosphere,
 * and the Lenis-driven camera/scroll rig. Global scroll progress (0→1) maps
 * across the scene list and crossfades adjacent beats; pointer drives in-shader
 * depth parallax. Reduced-motion → static crossfades, no autonomous motion or
 * bloom. One rAF loop; everything disposes cleanly for React unmount.
 */
export class SceneEngine {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly quality: QualitySettings;
  private readonly scenes: ParallaxScene[];
  private readonly particles: ParticleField;
  private readonly atmosphere: Atmosphere;
  private readonly portal: Portal;
  /** index of the beat the golden-door transition fires after (-1 = none) */
  private readonly portalIndex: number;
  private readonly lenis: Lenis;
  /** snap-to-beat: eases the page to the nearest beat on scroll-idle (Phase 5A) */
  private readonly snap: JourneySnap;

  private readonly pointer = new THREE.Vector2(0, 0);
  private readonly pointerTarget = new THREE.Vector2(0, 0);
  private progress = 0;
  /** ?p=0..1 deep-links / freezes the journey at a fixed progress (QA + sharing) */
  private readonly forcedProgress: number | null;
  private raf = 0;
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, defs: SceneDef[] = JOURNEY) {
    this.quality = detectQuality();

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(this.quality.pixelRatio);
    this.scene.background = new THREE.Color("#FDF6EC");

    this.camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    this.camera.position.set(0, 0, BASE_DIST);

    const loader = new THREE.TextureLoader();
    this.scenes = defs.map((d, i) => {
      const s = new ParallaxScene(d, loader, i);
      this.scene.add(s.mesh);
      return s;
    });

    this.particles = new ParticleField(this.quality.particleCount);
    this.particles.setPixelRatio(this.quality.pixelRatio);
    this.scene.add(this.particles.points);

    this.portal = new Portal();
    this.portalIndex = defs.findIndex((d) => d.portalAfter);
    this.scene.add(this.portal.mesh);

    this.atmosphere = new Atmosphere(
      this.renderer,
      this.scene,
      this.camera,
      this.quality.bloom && !this.quality.reducedMotion,
    );

    const p = new URLSearchParams(window.location.search).get("p");
    const pn = p === null ? NaN : Number(p);
    this.forcedProgress = Number.isFinite(pn)
      ? Math.min(1, Math.max(0, pn))
      : null;
    if (this.forcedProgress !== null) this.progress = this.forcedProgress;

    // Lenis smooths the actual page scroll; progress is read each frame from
    // the journey track (see ./progress), so engine + HTML overlays stay locked.
    this.lenis = new Lenis();

    // Snap to the nearest beat on scroll-idle. Bypassed when ?p= freezes the
    // journey; reduced motion never reaches here (StaticJourney renders instead).
    this.snap = new JourneySnap(
      this.lenis,
      this.scenes.length,
      () => this.forcedProgress !== null || this.quality.reducedMotion,
    );

    this.onResize = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.frame = this.frame.bind(this);

    window.addEventListener("resize", this.onResize);
    if (!this.quality.reducedMotion) {
      window.addEventListener("pointermove", this.onPointerMove);
    }

    this.onResize();
    this.raf = requestAnimationFrame(this.frame);
  }

  private planeSize() {
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const vpH = 2 * Math.tan(vFOV / 2) * BASE_DIST;
    const vpW = vpH * this.camera.aspect;
    let pw: number, ph: number;
    if (vpW / vpH > PLATE_ASPECT) {
      pw = vpW;
      ph = vpW / PLATE_ASPECT;
    } else {
      ph = vpH;
      pw = ph * PLATE_ASPECT;
    }
    return { pw: pw * OVERSCAN, ph: ph * OVERSCAN };
  }

  private onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.atmosphere.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const { pw, ph } = this.planeSize();
    for (const s of this.scenes) s.setSize(pw, ph);
    this.portal.setSize(pw, ph);
  }

  /** golden-door intensity: a smooth triangular pulse peaking at the midpoint
   *  between the flagged beat and the next, 0 elsewhere */
  private portalIntensity() {
    if (this.portalIndex < 0) return 0;
    const s = this.progress * (this.scenes.length - 1);
    const peak = this.portalIndex + 0.5;
    const raw = Math.max(0, 1 - Math.abs(s - peak) / 0.5);
    return raw * raw * (3 - 2 * raw); // smoothstep ease
  }

  private onPointerMove(e: PointerEvent) {
    this.pointerTarget.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
  }

  /** map progress → per-scene opacity (linear crossfade between neighbours) */
  private updateScenes() {
    const n = this.scenes.length;
    const s = this.progress * (n - 1);
    let activeTint = this.scenes[0].def.tint;
    let bestW = -1;
    for (let i = 0; i < n; i++) {
      const w = Math.max(0, 1 - Math.abs(s - i));
      this.scenes[i].setOpacity(w);
      this.scenes[i].setParallax(this.pointer.x, this.pointer.y);
      if (w > bestW) {
        bestW = w;
        activeTint = this.scenes[i].def.tint;
      }
    }
    return activeTint;
  }

  private frame(timeMs: number) {
    if (this.disposed) return;
    const t = timeMs * 0.001;
    this.lenis.raf(timeMs);
    this.progress = journeyProgress(this.forcedProgress);

    if (!this.quality.reducedMotion) {
      // ease pointer for buttery parallax
      this.pointer.lerp(this.pointerTarget, 0.06);
    }

    const tint = this.updateScenes();
    this.portal.setIntensity(this.portalIntensity());

    // ambient mote field: ease tint toward active beat, freeze under reduced-motion
    this.particles.setTint(tint, this.quality.reducedMotion ? 1 : 0.02);
    this.particles.setDensityOpacity(this.quality.reducedMotion ? 0.25 : 0.85);
    if (!this.quality.reducedMotion) this.particles.update(t);

    // gentle camera rig — a breath of push-in across the journey + pointer drift
    if (!this.quality.reducedMotion) {
      this.camera.position.x = this.pointer.x * 0.12;
      this.camera.position.y = this.pointer.y * 0.08;
      this.camera.position.z = BASE_DIST - Math.sin(this.progress * Math.PI) * 0.18;
      this.camera.lookAt(0, 0, 0);
    }

    this.atmosphere.render();
    this.raf = requestAnimationFrame(this.frame);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    this.snap.dispose();
    this.lenis.destroy();
    for (const s of this.scenes) s.dispose();
    this.particles.dispose();
    this.portal.dispose();
    this.atmosphere.dispose();
    this.renderer.dispose();
  }
}
