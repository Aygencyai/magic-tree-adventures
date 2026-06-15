import * as THREE from "three";

/**
 * The Golden Door — a radial bloom that opens between the garden world and
 * Angelica. As the journey crosses the transition (the beat flagged
 * `portalAfter`), a warm golden core swells and an expanding ring sweeps
 * outward, washing the screen at the midpoint to mask the crossfade, then
 * receding to reveal Angelica. A faint vertical "door" streak hints at the
 * trunk's opening before the burst.
 *
 * One additive fullscreen quad in front of the plates + particles. Intensity
 * is 0 everywhere except the transition, so it costs nothing the rest of the
 * journey. Scroll-driven (not autonomous) so it is safe under reduced motion.
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
  uniform float uIntensity;   // 0..1 across the transition
  uniform float uAspect;      // width / height (keeps the burst circular)
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uAspect;
    float dist = length(p);

    // warm central bloom — swells with intensity
    float core = exp(-dist * mix(7.0, 2.6, uIntensity));

    // expanding ring sweeping outward as the door opens
    float ringR = mix(0.0, 0.85, uIntensity);
    float ring = smoothstep(0.10, 0.0, abs(dist - ringR)) * (1.0 - uIntensity * 0.4);

    // faint vertical door-slit before the burst (fades as the ring takes over)
    float slit = smoothstep(0.05, 0.0, abs(p.x)) * exp(-abs(p.y) * 2.2);
    slit *= (1.0 - smoothstep(0.0, 0.5, uIntensity));

    float a = (core * 1.25 + ring * 0.9 + slit * 0.7) * uIntensity;
    vec3 gold = mix(vec3(1.0, 0.84, 0.42), vec3(1.0, 0.97, 0.86), core);
    gl_FragColor = vec4(gold, clamp(a, 0.0, 1.0));
  }
`;

export class Portal {
  readonly mesh: THREE.Mesh;
  private readonly material: THREE.ShaderMaterial;
  private readonly geometry: THREE.PlaneGeometry;

  constructor() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uIntensity: { value: 0 },
        uAspect: { value: 1 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.renderOrder = 60; // in front of plates (0..n) + particles (50)
    this.mesh.frustumCulled = false;
    this.mesh.position.z = 0.5;
  }

  /** size the quad to cover the viewport plane (overscanned) + lock the aspect */
  setSize(planeW: number, planeH: number) {
    this.mesh.scale.set(planeW * 1.6, planeH * 1.6, 1);
    this.material.uniforms.uAspect.value = planeH > 0 ? planeW / planeH : 1;
  }

  setIntensity(v: number) {
    this.material.uniforms.uIntensity.value = v;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
