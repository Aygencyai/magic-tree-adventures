/**
 * Scene data for the immersive journey.
 *
 * Each beat is one painterly Barajas plate (outpainted to 16:9, text-cleaned)
 * plus a smoothed pseudo-depth proxy that drives the depth-parallax shader.
 * The `depth` slot is engine-agnostic: drop a real Depth-Anything V2 / MiDaS
 * map at the same path in Phase 5 and the look upgrades with no code change.
 *
 * Phase 3 sequences Book One's FULL arc across the 8 owned plates (9 scroll
 * beats — the Angelica plate carries two beats: the reveal, then meeting Alina
 * & Gino). The two missing narrative beats are handled without new plates:
 *   - "The Golden Door" is the radial portal-shader transition (`portalAfter`).
 *   - "Meet Alina & Gino" reuses the Angelica plate with character cameos.
 *
 * `overlay` copy is real (drawn from the book + constants.ts), rendered as
 * beat-synced Fraunces/Caveat HTML over the canvas. The engine itself only
 * reads image/depth/tint/strength/portalAfter; the React overlay layer reads
 * overlay/sprites/chakraIgnite/cta. One shared source of truth for both.
 */

export interface SceneOverlay {
  /** small Caveat eyebrow above the heading */
  kicker: string;
  /** Fraunces heading */
  title: string;
  /** Caveat narration / dialogue line */
  line: string;
}

export interface SceneSprite {
  /** transparent PNG under /public */
  src: string;
  /** which edge it drifts in from */
  side: "left" | "right";
  /** display alt / name */
  alt: string;
}

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
  /** beat-synced HTML overlay copy */
  overlay: SceneOverlay;
  /** golden-door portal bloom fires in the transition AFTER this beat */
  portalAfter?: boolean;
  /** the 7 chakra crystals ignite over this beat (ties to CHAKRAS constant) */
  chakraIgnite?: boolean;
  /** character cameos that drift in on this beat */
  sprites?: SceneSprite[];
  /** the closing beat carries the buy CTA */
  cta?: boolean;
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
    overlay: {
      kicker: "Once upon a time",
      title: "The Magic Tree",
      line: "At the bottom of the garden grew an apple tree, older than anyone could remember.",
    },
  },
  {
    id: "wish",
    image: `${W}/beat2-glowing-tree-16x9.webp`,
    depth: `${W}/beat2-glowing-tree-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xffd27a,
    motes: 1.15,
    overlay: {
      kicker: "A whispered wish",
      title: "The Tree Awakens",
      line: "“If only I could find my voice,” whispered Rory — and the old bark began to shimmer like liquid gold.",
    },
    portalAfter: true,
  },
  {
    id: "angelica",
    image: `${W}/beat4-angelica-reveal-16x9.webp`,
    depth: `${W}/beat4-angelica-reveal-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0xf6c8d6,
    motes: 1.2,
    overlay: {
      kicker: "Through the golden door",
      title: "Welcome to Angelica",
      line: "Golden hills, a shining lake, and far in the distance — the Crystal Mountain.",
    },
  },
  {
    id: "friends",
    image: `${W}/beat4-angelica-reveal-16x9.webp`,
    depth: `${W}/beat4-angelica-reveal-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0xbcd6f4,
    motes: 1.1,
    overlay: {
      kicker: "New friends",
      title: "Alina & Gino",
      line: "An angel with wings of softest blue, and a gentle lion who longed to be understood.",
    },
    sprites: [
      { src: "/characters/alina.png", side: "left", alt: "Alina, the angel of voices" },
      { src: "/characters/gino.png", side: "right", alt: "Gino, the gentle lion" },
    ],
  },
  {
    id: "ferry",
    image: `${W}/beat6-ferry-16x9.webp`,
    depth: `${W}/beat6-ferry-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xb8d4f0,
    motes: 0.9,
    overlay: {
      kicker: "Across the water",
      title: "Otter Joe's Ferry",
      line: "Through wind and storm, the little boat carried them on toward the mountain.",
    },
  },
  {
    id: "arrival",
    image: `${W}/beat7-crystal-mountain-arrival-16x9.webp`,
    depth: `${W}/beat7-crystal-mountain-arrival-16x9.depth.webp`,
    depthStrength: 0.05,
    tint: 0xffe6f2,
    motes: 1.3,
    overlay: {
      kicker: "The seven lights",
      title: "The Crystal Mountain",
      line: "At its foot waited Angel Ari, rainbow-winged, who knew every child by name.",
    },
    chakraIgnite: true,
  },
  {
    id: "cave",
    image: `${W}/beat8-cave-16x9.webp`,
    depth: `${W}/beat8-cave-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0x9fc4f0,
    motes: 1.1,
    overlay: {
      kicker: "The crystal cave",
      title: "Rory Finds His Voice",
      line: "He reached for a blue crystal apple — and at last, the words came free.",
    },
  },
  {
    id: "flying",
    image: `${W}/beat9-flying-home-16x9.webp`,
    depth: `${W}/beat9-flying-home-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xd0c0ec,
    motes: 1.1,
    overlay: {
      kicker: "Homeward",
      title: "Flying Home on Gino",
      line: "They soared over the lake and the golden hills, hearts glowing with all they had found.",
    },
  },
  {
    id: "return",
    image: `${W}/beat10-return-garden-16x9.webp`,
    depth: `${W}/beat10-return-garden-16x9.depth.webp`,
    depthStrength: 0.035,
    tint: 0xffe0a0,
    motes: 1,
    overlay: {
      kicker: "The End (for now…)",
      title: "Back to the Garden",
      line: "The magic tree stood quiet once more, keeping its secret — until the next adventure.",
    },
    cta: true,
  },
];

/** Plate aspect — all processed plates are outpainted to 16:9 (2752×1536). */
export const PLATE_ASPECT = 16 / 9;
