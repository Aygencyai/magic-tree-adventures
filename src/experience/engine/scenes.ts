/**
 * Scene data for the immersive journey.
 *
 * Each beat is one painterly Barajas plate (outpainted to 16:9, text-cleaned)
 * plus a smoothed pseudo-depth proxy that drives the depth-parallax shader.
 * The `depth` slot is engine-agnostic: drop a real Depth-Anything V2 / MiDaS
 * map at the same path in Phase 5 and the look upgrades with no code change.
 *
 * Phase 2 wires the 3-beat arc below (opening → hero → climax) to prove the
 * engine + transitions. Phase 3 sequences the full 10-beat journey — just
 * extend this array; the engine renders N scenes generically.
 */

export interface SceneDef {
  id: string;
  /** full-bleed colour plate (web-optimised webp) */
  image: string;
  /** greyscale proxy depth (0 = far, 1 = near) driving parallax + relief */
  depth: string;
  /** parallax depth strength in UV space (per-scene tuned) */
  depthStrength: number;
  /** firefly/mote tint for this beat (hex) */
  tint: number;
  /** ambient particle density multiplier (0 disables) */
  motes: number;
}

const W = "/scenes/web";

export const JOURNEY: SceneDef[] = [
  {
    id: "garden",
    image: `${W}/beat1-garden-16x9.webp`,
    depth: `${W}/beat1-garden-16x9.depth.webp`,
    depthStrength: 0.035,
    tint: 0xffe0a0,
    motes: 1,
  },
  {
    id: "angelica",
    image: `${W}/beat4-angelica-reveal-16x9.webp`,
    depth: `${W}/beat4-angelica-reveal-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0xf6c8d6,
    motes: 1.2,
  },
  {
    id: "flying",
    image: `${W}/beat9-flying-home-16x9.webp`,
    depth: `${W}/beat9-flying-home-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xd0c0ec,
    motes: 1.1,
  },
];

/** Plate aspect — all processed plates are outpainted to 16:9 (2752×1536). */
export const PLATE_ASPECT = 16 / 9;
