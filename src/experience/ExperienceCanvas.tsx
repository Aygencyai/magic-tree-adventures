"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import Lenis from "lenis";

/**
 * Phase 0 spike — VANILLA Three.js (no React Three Fiber).
 *
 * Why vanilla: @react-three/fiber v9 is incompatible with Next 14's App Router
 * runtime (its reconciler reads React client internals Next 14 doesn't expose →
 * "Cannot read properties of undefined (reading 'S')"). Vanilla three has no
 * react-reconciler, so it sidesteps that entirely. This is also the typical
 * stack for bespoke immersive/WebGL sites.
 *
 * Proves the core technique: the Angelica-reveal illustration as a displaced
 * relief plane that parallaxes on scroll (Lenis) + mouse, with bloom. The
 * displacement is driven by the art's own luminance as a STAND-IN depth map;
 * Phase 2 swaps in a real Depth-Anything depth texture.
 */
const IMG = "/scenes/raw/page-09.png";
const IMG_ASPECT = 3213 / 2079;
const BASE_DIST = 5;

export default function ExperienceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FDF6EC");

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, BASE_DIST);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const dir = new THREE.DirectionalLight(0xffffff, 0.5);
    dir.position.set(2, 3, 4);
    scene.add(dir);

    const geo = new THREE.PlaneGeometry(1, 1, 220, 150);
    const mat = new THREE.MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.35,
      displacementScale: -0.55,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    new THREE.TextureLoader().load(IMG, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      mat.map = tex;
      mat.displacementMap = tex;
      mat.emissiveMap = tex;
      mat.needsUpdate = true;
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.4, 0.65),
    );
    composer.addPass(new OutputPass());

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // cover-fit the plane to the viewport at the base camera distance
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const vpH = 2 * Math.tan(vFOV / 2) * BASE_DIST;
      const vpW = vpH * camera.aspect;
      let pw: number, ph: number;
      if (vpW / vpH > IMG_ASPECT) {
        pw = vpW;
        ph = vpW / IMG_ASPECT;
      } else {
        ph = vpH;
        pw = ph * IMG_ASPECT;
      }
      mesh.scale.set(pw * 1.18, ph * 1.18, 1);
    }
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0, y: 0 };
    function onMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("pointermove", onMove);

    const lenis = new Lenis();
    let progress = 0;
    lenis.on("scroll", (e: { scroll: number; limit: number }) => {
      progress = e.limit > 0 ? e.scroll / e.limit : 0;
    });

    let raf = 0;
    function frame(time: number) {
      lenis.raf(time);
      camera.position.x = pointer.x * 0.45;
      camera.position.y = pointer.y * 0.28 + progress * 0.7;
      camera.position.z = BASE_DIST - progress * 1.8;
      camera.lookAt(0, progress * 0.35, 0);
      composer.render();
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      lenis.destroy();
      composer.dispose();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
