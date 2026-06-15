import * as THREE from "three";

/**
 * Ambient firefly / pollen motes — a single THREE.Points buffer drifting in a
 * soft sine field, additively blended, tinted to the active beat. GPU-cheap:
 * one draw call, motion in the vertex shader off a time uniform, count scaled
 * by device tier. Painterly soft-disc sprite generated procedurally (no asset).
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aScale;
  varying float vTwinkle;
  void main() {
    vec3 p = position;
    float t = uTime * 0.12 + aSeed * 6.2831;
    p.x += sin(t * 1.3 + aSeed * 10.0) * 0.18;
    p.y += cos(t * 1.1 + aSeed * 7.0) * 0.14 + sin(uTime * 0.05) * 0.02;
    p.z += sin(t * 0.7) * 0.05;
    vTwinkle = 0.5 + 0.5 * sin(uTime * 1.6 + aSeed * 20.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha;
    gl_FragColor = vec4(uColor, alpha * uOpacity * (0.35 + 0.65 * vTwinkle));
  }
`;

export class ParticleField {
  readonly points: THREE.Points;
  private readonly material: THREE.ShaderMaterial;
  private readonly geometry: THREE.BufferGeometry;

  constructor(count: number) {
    this.geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    // deterministic spread (no Math.random — varies by index)
    for (let i = 0; i < count; i++) {
      const a = (i * 9301 + 49297) % 233280;
      const r1 = a / 233280;
      const r2 = ((i * 4567 + 12345) % 99991) / 99991;
      const r3 = ((i * 7919 + 7) % 100003) / 100003;
      pos[i * 3] = (r1 - 0.5) * 7.5;
      pos[i * 3 + 1] = (r2 - 0.5) * 4.6;
      pos[i * 3 + 2] = r3 * 1.6 - 0.2;
      seed[i] = r1;
      scale[i] = 0.6 + r3 * 1.1;
    }
    this.geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 26 },
        uPixelRatio: { value: 1 },
        uColor: { value: new THREE.Color(0xffe0a0) },
        uOpacity: { value: 0.85 },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.renderOrder = 50;
    this.points.frustumCulled = false;
    this.points.position.z = 0.4; // float in front of the plates
  }

  setPixelRatio(pr: number) {
    this.material.uniforms.uPixelRatio.value = pr;
  }

  /** ease the mote tint toward the active beat colour */
  setTint(hex: number, lerp = 1) {
    const c = this.material.uniforms.uColor.value as THREE.Color;
    c.lerp(new THREE.Color(hex), lerp);
  }

  setDensityOpacity(o: number) {
    this.material.uniforms.uOpacity.value = o;
  }

  update(time: number) {
    this.material.uniforms.uTime.value = time;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
