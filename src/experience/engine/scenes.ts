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

export interface SceneCtaButton {
  label: string;
  href: string;
  /** gold pill (primary) or outlined (secondary); defaults to secondary */
  variant?: "primary" | "secondary";
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
  /** the closing beat carries a CTA button row */
  cta?: boolean;
  /** override the CTA buttons for this beat (defaults to Get the Book +
   *  About Us); used by the Buy page for real purchase links */
  ctaButtons?: SceneCtaButton[];
}

/** default CTA row for journeys that just set `cta: true` (home/chakras/about) */
export const DEFAULT_CTA_BUTTONS: SceneCtaButton[] = [
  { label: "Get the Book", href: "/buy", variant: "primary" },
  { label: "About Us", href: "/about", variant: "secondary" },
];

const W = "/scenes/web";

/** The homepage journey — Book One's full arc. One exported journey per page
 *  (Phase 6): each route renders `<Experience journey={…} />` over this same
 *  engine. CHAKRAS_JOURNEY / ABOUT_JOURNEY / BUY_JOURNEY are added in 6.1–6.3. */
export const HOME_JOURNEY: SceneDef[] = [
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
    image: `${W}/friends-alina-gino-16x9.webp`,
    depth: `${W}/friends-alina-gino-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0xbcd6f4,
    motes: 1.1,
    overlay: {
      kicker: "New friends",
      title: "Alina & Gino",
      line: "An angel with wings of softest blue, and a gentle lion who longed to be understood.",
    },
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

/**
 * The Chakras experience (Phase 6.1) — the seven energy centres as a calm,
 * meditative beat sequence. One painterly plate per chakra (the book's page-22
 * meditating-child cards, outpainted onto each chakra's colour field), plus a
 * generated rainbow opener. Each plate already carries its own glowing chakra
 * orb on the child, so the engine just tints the motes to the chakra colour and
 * the overlay narrates it — no special ignition layer (that's the home journey's
 * 7-at-once arrival moment). Copy is drawn from `CHAKRAS` in constants.ts,
 * trimmed to one Caveat line per beat. The grounded "inner rainbow" close + CTA
 * is server-rendered in the page tail (crawlable), not a journey beat.
 */
export const CHAKRAS_JOURNEY: SceneDef[] = [
  {
    id: "chakra-intro",
    image: `${W}/chakra-intro-16x9.webp`,
    depth: `${W}/chakra-intro-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xc8b8e8,
    motes: 1.3,
    overlay: {
      kicker: "The magic inside",
      title: "Every Child's Inner Rainbow",
      line: "Seven little lights live inside you — spinning colours that help you feel brave, kind, and wonderfully you.",
    },
  },
  {
    id: "chakra-root",
    image: `${W}/chakra-root-16x9.webp`,
    depth: `${W}/chakra-root-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0xe05555,
    motes: 1.1,
    overlay: {
      kicker: "I am safe",
      title: "The Root Chakra",
      line: "Deep roots, like the old apple tree — the red glow that helps you feel strong, safe, and at home.",
    },
  },
  {
    id: "chakra-sacral",
    image: `${W}/chakra-sacral-16x9.webp`,
    depth: `${W}/chakra-sacral-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0xf0923e,
    motes: 1.15,
    overlay: {
      kicker: "I can create",
      title: "The Sacral Chakra",
      line: "The orange spark of fun and feelings — drawing, storytelling, the joy that makes adventures possible.",
    },
  },
  {
    id: "chakra-solar-plexus",
    image: `${W}/chakra-solar-plexus-16x9.webp`,
    depth: `${W}/chakra-solar-plexus-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0xf0d03e,
    motes: 1.2,
    overlay: {
      kicker: "I can do it",
      title: "The Solar Plexus",
      line: "Your inner sunshine — the golden confidence to climb higher and try brave new things.",
    },
  },
  {
    id: "chakra-heart",
    image: `${W}/chakra-heart-16x9.webp`,
    depth: `${W}/chakra-heart-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0x5dbb63,
    motes: 1.15,
    overlay: {
      kicker: "I am loved",
      title: "The Heart Chakra",
      line: "The green glow of love — caring for others, hugging your family, feeling warm when someone is kind.",
    },
  },
  {
    id: "chakra-throat",
    image: `${W}/chakra-throat-16x9.webp`,
    depth: `${W}/chakra-throat-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0x5b8fd4,
    motes: 1.15,
    overlay: {
      kicker: "I can speak my truth",
      title: "The Throat Chakra",
      line: "Rory's chakra — the blue light of finding your voice, singing your song, and being heard.",
    },
  },
  {
    id: "chakra-third-eye",
    image: `${W}/chakra-third-eye-16x9.webp`,
    depth: `${W}/chakra-third-eye-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0x8b5dc8,
    motes: 1.15,
    overlay: {
      kicker: "I can see clearly",
      title: "The Third Eye",
      line: "The indigo spark of imagination — big ideas, daydreams, and seeing answers clearly.",
    },
  },
  {
    id: "chakra-crown",
    image: `${W}/chakra-crown-16x9.webp`,
    depth: `${W}/chakra-crown-16x9.depth.webp`,
    depthStrength: 0.03,
    tint: 0xd4b8f0,
    motes: 1.25,
    overlay: {
      kicker: "I am connected",
      title: "The Crown Chakra",
      line: "The violet light at the top of your head, connecting you to the stars, the trees, and everyone you love.",
    },
  },
];

/**
 * The About experience (Phase 6.2) — the sixty-year story behind the book as a
 * short, warm beat sequence: the origin (the 1964 magic apple tree + Poppa
 * Stan's bedtime stories) → Sara, the author → Alejandra, the illustrator →
 * a Poppa Stan close with the buy CTA. Only the origin beat needs its own plate
 * (`about-origin`, the apple-tree canopy); the creator + close beats reuse the
 * home-journey plates (glowing tree / Angelica / return garden) on-style — so,
 * like Chakras, this is pure data with zero engine/overlay changes. The real
 * author photos + bios live in the page's crawlable tail (Sara = Author,
 * Alejandra = Illustrator; Jools dropped per Louis), not as journey sprites.
 */
export const ABOUT_JOURNEY: SceneDef[] = [
  {
    id: "about-origin",
    image: `${W}/about-origin-16x9.webp`,
    depth: `${W}/about-origin-16x9.depth.webp`,
    depthStrength: 0.035,
    tint: 0xffe0a0,
    motes: 1,
    overlay: {
      kicker: "Where it all began",
      title: "The Old Apple Tree",
      line: "In 1964, a little girl found a magic tree at the bottom of the garden — and Poppa Stan's bedtime stories began.",
    },
  },
  {
    id: "about-author",
    image: `${W}/beat2-glowing-tree-16x9.webp`,
    depth: `${W}/beat2-glowing-tree-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xffd27a,
    motes: 1.1,
    overlay: {
      kicker: "The author",
      title: "Sara Oberman Babai",
      line: "She wove the wisdom of the chakras into Poppa Stan's tales, so every child could find a little more light inside.",
    },
  },
  {
    id: "about-illustrator",
    image: `${W}/beat4-angelica-reveal-16x9.webp`,
    depth: `${W}/beat4-angelica-reveal-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0xf6c8d6,
    motes: 1.2,
    overlay: {
      kicker: "The illustrator",
      title: "Alejandra Barajas",
      line: "Her brush brought the land of Angelica to life — golden hills, shining lakes, and angels with shimmering wings.",
    },
  },
  {
    id: "about-close",
    image: `${W}/beat10-return-garden-16x9.webp`,
    depth: `${W}/beat10-return-garden-16x9.depth.webp`,
    depthStrength: 0.035,
    tint: 0xffe0a0,
    motes: 1,
    overlay: {
      kicker: "For Poppa Stan",
      title: "Every Child Has a Voice",
      line: "Sixty years of bedtime stories, now a book — so every child, everywhere, can find their own.",
    },
    cta: true,
  },
];

/**
 * The Buy experience (Phase 6.3) — the book sold as a short, warm scroll: the
 * hero (the Crystal Mountain, the book's destination) → what's inside (Angelica
 * + the chakras) → a five-star review → a "get your copy" close whose CTA jumps
 * to the crawlable purchase panel in the tail. Like Chakras/About it reuses the
 * home-journey plates (mountain / Angelica / flying / return garden), so no new
 * art. Unlike them, **conversion stays front-and-centre**: the close beat's CTA
 * is a real purchase button (→ `#buy`), and the page tail SSRs the full,
 * prominent buy panel (cover, format, retailer links) — the experience frames
 * the buy action, it never buries it.
 */
export const BUY_JOURNEY: SceneDef[] = [
  {
    id: "buy-hero",
    image: `${W}/beat7-crystal-mountain-arrival-16x9.webp`,
    depth: `${W}/beat7-crystal-mountain-arrival-16x9.depth.webp`,
    depthStrength: 0.05,
    tint: 0xffe6f2,
    motes: 1.3,
    overlay: {
      kicker: "Book One",
      title: "Journey to the Crystal Mountain",
      line: "A magical story about finding your voice, discovering your inner light, and the adventure of a lifetime.",
    },
  },
  {
    id: "buy-inside",
    image: `${W}/beat4-angelica-reveal-16x9.webp`,
    depth: `${W}/beat4-angelica-reveal-16x9.depth.webp`,
    depthStrength: 0.045,
    tint: 0xf6c8d6,
    motes: 1.2,
    overlay: {
      kicker: "What's inside",
      title: "A Whole World to Explore",
      line: "Step through the golden door into Angelica — and meet the seven chakras, woven gently through every page.",
    },
  },
  {
    id: "buy-loved",
    image: `${W}/beat9-flying-home-16x9.webp`,
    depth: `${W}/beat9-flying-home-16x9.depth.webp`,
    depthStrength: 0.04,
    tint: 0xd0c0ec,
    motes: 1.1,
    overlay: {
      kicker: "★★★★★  Parents & teachers",
      title: "Loved at Bedtime",
      line: "“My daughter asked me to read it three times in a row. She wants to find the Crystal Mountain herself now.”",
    },
  },
  {
    id: "buy-cta",
    image: `${W}/beat10-return-garden-16x9.webp`,
    depth: `${W}/beat10-return-garden-16x9.depth.webp`,
    depthStrength: 0.035,
    tint: 0xffe0a0,
    motes: 1,
    overlay: {
      kicker: "Bring the magic home",
      title: "Get Your Copy",
      line: "Ages 4–10 · 48 pages · full colour hardcover. Available now from Amazon, Waterstones, and your local bookshop.",
    },
    cta: true,
    ctaButtons: [
      { label: "Get Your Copy", href: "#buy", variant: "primary" },
      { label: "Read the Story", href: "/about", variant: "secondary" },
    ],
  },
];

/** Plate aspect — all processed plates are outpainted to 16:9 (2752×1536). */
export const PLATE_ASPECT = 16 / 9;
