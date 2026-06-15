import * as THREE from "three";
import type { SceneDef } from "./scenes";

/**
 * One painterly plate rendered as a depth-parallax plane.
 *
 * The 2.5D effect is depth-driven UV parallax in the fragment shader: each
 * pixel is sampled with an offset proportional to (depth − 0.5) × parallax, so
 * near pixels (high depth) slide opposite to far pixels as the pointer/scroll
 * move "through" the scene. A soft vignette + per-scene opacity (for scroll
 * crossfades) live in the same shader — no scene lighting, so nothing blows out
 * under bloom (the Phase 0 spike's emissive/displacement approach did).
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uMap;
  uniform sampler2D uDepth;
  uniform vec2  uParallax;     // pointer + scroll, -1..1
  uniform float uDepthStrength;
  uniform float uOpacity;      // scroll crossfade
  uniform float uReady;        // 0 until textures loaded
  varying vec2 vUv;

  void main() {
    float d = texture2D(uDepth, vUv).r;
    vec2 off = uParallax * (d - 0.5) * uDepthStrength;
    vec2 uv = clamp(vUv + off, 0.001, 0.999);
    vec4 col = texture2D(uMap, uv);

    // soft painterly vignette
    float vig = smoothstep(0.95, 0.30, length(vUv - 0.5));
    col.rgb *= mix(0.80, 1.0, vig);

    gl_FragColor = vec4(col.rgb, col.a * uOpacity * uReady);
  }
`;

export class ParallaxScene {
  readonly def: SceneDef;
  readonly mesh: THREE.Mesh;
  private readonly material: THREE.ShaderMaterial;
  private readonly geometry: THREE.PlaneGeometry;
  private mapTex: THREE.Texture | null = null;
  private depthTex: THREE.Texture | null = null;

  constructor(def: SceneDef, loader: THREE.TextureLoader, renderOrder: number) {
    this.def = def;
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uMap: { value: null },
        uDepth: { value: null },
        uParallax: { value: new THREE.Vector2(0, 0) },
        uDepthStrength: { value: def.depthStrength },
        uOpacity: { value: 0 },
        uReady: { value: 0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.renderOrder = renderOrder;
    this.mesh.frustumCulled = false;

    loader.load(def.image, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      this.mapTex = t;
      this.material.uniforms.uMap.value = t;
      this.tryReady();
    });
    loader.load(def.depth, (t) => {
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      this.depthTex = t;
      this.material.uniforms.uDepth.value = t;
      this.tryReady();
    });
  }

  private tryReady() {
    if (this.mapTex && this.depthTex) this.material.uniforms.uReady.value = 1;
  }

  /** cover-fit this plane to the viewport plane size at the camera distance */
  setSize(planeW: number, planeH: number) {
    this.mesh.scale.set(planeW, planeH, 1);
  }

  setOpacity(o: number) {
    this.material.uniforms.uOpacity.value = o;
  }

  setParallax(x: number, y: number) {
    this.material.uniforms.uParallax.value.set(x, y);
  }

  get visibleEnough() {
    return this.material.uniforms.uOpacity.value > 0.01;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.mapTex?.dispose();
    this.depthTex?.dispose();
  }
}
