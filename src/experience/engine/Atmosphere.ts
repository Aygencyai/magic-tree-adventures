import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/**
 * Post-processing stack. Gentle bloom (high tier only) for the golden glow +
 * crystal shimmer, then output/colour-management pass. Bloom is kept low so
 * the warm parchment palette doesn't blow out (the spike ran it too hot).
 * Vignette is handled per-plate in the ParallaxScene shader, so it survives
 * the crossfade and costs nothing extra here.
 */
export class Atmosphere {
  readonly composer: EffectComposer;
  private readonly bloom: UnrealBloomPass | null;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    enableBloom: boolean,
  ) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));

    if (enableBloom) {
      this.bloom = new UnrealBloomPass(
        new THREE.Vector2(1, 1),
        0.22, // strength — a whisper; the painterly plates are already bright
        0.5, // radius
        0.85, // threshold — only the brightest highlights (crystals, sun) bloom
      );
      this.composer.addPass(this.bloom);
    } else {
      this.bloom = null;
    }

    this.composer.addPass(new OutputPass());
  }

  setSize(w: number, h: number) {
    this.composer.setSize(w, h);
    this.bloom?.setSize(w, h);
  }

  render() {
    this.composer.render();
  }

  dispose() {
    this.composer.dispose();
  }
}
