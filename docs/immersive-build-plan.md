# The Magic Tree Adventures — Immersive Experience Build Plan

> Turn the homepage from a storybook *info page* into an immersive, interactive WebGL
> experience — the book's journey *becomes* the scroll. Inspiration:
> `cornrevolution.resn.global` (RESN). Adapted for a warm, painterly children's brand.

## Decisions (locked 2026-06-15)

- **Approach:** Hybrid — WebGL (Three.js / React Three Fiber) brings *painterly generated art* to life with depth, particles, light, portal shaders, and a scroll-driven camera. Not cold procedural 3D.
- **Scope:** Homepage rebuilt as the flagship experience. Story / Chakras / About / Buy stay as polished storybook pages (Phase 6 ties them in visually).
- **Art:** Generated now with Higgsfield (painterly scenes + characters + a few ambient loops). Swappable for client/illustrator art later.
- **Design skills:** `frontend-design` + `ui-ux-pro-max` enabled in `.claude/settings.local.json` — consult both when building UI/overlays.

## ⚠️ Stack-rule change (must update CLAUDE.md in Phase 0)

The current `CLAUDE.md` says *"No Three.js. All visual effects are Framer Motion + CSS."*
That rule is **superseded for the experience layer**. New rule to codify:

> Three.js / R3F is permitted **only** inside `src/experience/` (the WebGL canvas + scenes).
> The rest of the site (inner pages, overlays, UI) stays Framer Motion + CSS. WebGL is the
> *delivery* layer for warm painterly art — never the *look* itself. No GSAP (Lenis + R3F scroll instead).

## Stack additions

| Package | Role |
|---|---|
| `three` | WebGL engine (vanilla — imperative, NOT React Three Fiber) |
| `three/examples/jsm/postprocessing/*` | Bloom (UnrealBloomPass), composer, output pass |
| `lenis` | Smooth-scroll spine (camera follows scroll) |
| `framer-motion` | (existing) HTML overlay text/UI choreography |

> **Why not React Three Fiber:** R3F v9 is incompatible with Next 14.2's App Router
> runtime (`Cannot read properties of undefined (reading 'S')` — its reconciler reads
> React client internals Next 14 doesn't expose). Confirmed in Phase 0; React-version
> pin and `transpilePackages` both failed. Vanilla Three.js has no react-reconciler and
> works. Revisit R3F only if/when the project moves to Next 15. See `CLAUDE.md` Gotchas.

Higgsfield (MCP) for art-asset generation — **`select_workspace` at session start** (defaults to hidden private workspace).

## The journey (homepage scroll narrative)

Aligned to **Book One's real arc** (ends heading *toward* the mountain → Book Two cliffhanger).
Every beat maps to an existing Barajas illustration — see `docs/higgsfield-asset-plan.md`.

```
Scroll ↓   (Book One's FULL arc — a complete loop; file refs in higgsfield-asset-plan.md)
   1. The Garden            apple tree + ivy cottage
   2. The Wish / tree glows  bark shimmers to liquid gold
   3. The Golden Door        a portal blooms open in the trunk ✦
   4. Angelica reveal        golden hills, blue lake, crystal mountain ✦   (hero plate ✅)
   5. Meet Alina & Gino      angel of voices + the winged lion
   6. The ferry crossing     Otter Joe's boat through the storm
   7. Crystal Mountain       arrival + rainbow-winged Angel Ari ✦
   8. The Crystal Cave       blue-crystal apples — Rory finds his voice (climax)
   9. Flying home on Gino    soaring over lake + hills ✦                   (plate ✅)
  10. Return to the garden   "The End (for now…)" → buy CTA
```

Each scene = an existing painterly illustration rendered as **2.5D depth planes** (image + depth-map
→ parallax displacement). Camera + mouse move *through* it. Caveat-font dialogue + Fraunces headings
fade in per beat as HTML overlays synced to scroll progress. The 7 chakra crystals ignite as a
motif across the Angelica beats. **Art pipeline: `docs/higgsfield-asset-plan.md`.**

---

## Phase 0 — Foundations & de-risking spike ✅ DONE (2026-06-15)

**Goal:** Prove the stack runs before committing to the full build.
**What shipped:**
- `three` + `lenis` installed (R3F path attempted, then removed — see below).
- `src/experience/ExperienceCanvas.tsx` — vanilla Three.js (`useEffect` + rAF), SSR-disabled via `next/dynamic` in `ExperienceMount.tsx`. `src/app/experience/page.tsx` route.
- Spike scene: the Angelica-reveal plate (`public/scenes/raw/page-09.png`) as a displaced relief plane (luminance = stand-in depth), Lenis scroll → camera push-in + pan, pointer parallax, UnrealBloom.
- `CLAUDE.md` updated (stack-rule change, `src/experience/`, R3F gotcha).
**Verified:** `pnpm build` clean; `/experience` static at 1.22 kB first-load (Three.js in its own client chunk — zero weight on other pages); canvas renders + scroll drives camera; **zero console errors**; SSR-safe.
**Key decisions recorded:**
- **Vanilla Three.js, not R3F** — R3F v9 incompatible with Next 14.2 (the `.S` reconciler crash). Pivoted; documented in `CLAUDE.md`.
- **Lenis page-scroll** (not drei ScrollControls) drives a global scroll-progress value into the render loop — the right model for HTML overlays scrolling over the canvas in later phases.
- React reverted to ^19.2.4 (the 19.1 pin was only for the abandoned R3F attempt).
**Known spike artifacts (fixed in Phase 2):** bloom too hot (sky blows out); luminance-as-depth smears edges; baked-in book text on the plate displaces oddly → use a real depth map + text-free outpainted plate.

## Phase 1 — Art generation (Higgsfield)

**Goal:** Produce the painterly asset library with locked art direction.
**Scope:**
- Lock one art-direction style frame first (palette: parchment/gold/forest/crystal/lavender; painterly storybook, soft light). Design-audit it before scaling.
- Generate 6 scenes (Garden, Golden Door, Angelica hills, Blue Lake + ferry, Crystal Mountain + 7 crystals, Home-again).
- For each: export depth layers (fg/mid/bg) **or** derive a depth map for the displacement technique.
- Generate 3 sibling characters + Otter Joe (transparent PNGs).
- Optional: 2 short ambient loops (firefly drift, god-ray shimmer) — only if cheaper/better than shader particles.
- Store in `public/scenes/` and `public/characters/`.
**Deliverables:** Consistent asset library, palette-audited.
**Dependencies:** Phase 0 (so we know the export format the engine needs).
**Exit:** All scenes share one cohesive painterly look; every asset on-palette; depth maps validated in the test scene.

## Phase 2 — The Scene Engine

**Goal:** Reusable WebGL scene system.
**Scope:**
- `<Scene>` — depth-parallax planes from image + depth map (displacement shader), mouse + scroll parallax.
- `<ParticleField>` — GPU fireflies / motes (instanced).
- `<Atmosphere>` — bloom, god-rays, vignette via postprocessing.
- `cameraRig` driven by global scroll progress (0→1 across the journey).
- Performance budget + **mobile fallback** (reduced particles / static illustrated layer).
**Deliverables:** 2–3 scenes rendering + transitioning on scroll.
**Dependencies:** Phases 0–1.
**Exit:** 60fps desktop, graceful mobile; scenes swap by scroll progress without jank.

## Phase 3 — The Journey (scroll choreography)

**Goal:** Wire the full 6-beat narrative.
**Scope:**
- Sequence all scenes along scroll progress.
- **Golden Door portal shader** transition (radial bloom from garden → Angelica).
- Chakra-light ignition sequence on the Crystal Mountain beat (ties to `CHAKRAS` constant).
- Beat-synced HTML overlays: Fraunces headings + Caveat dialogue fade/rise per scene (Framer Motion).
**Deliverables:** Full homepage journey playable top→bottom.
**Dependencies:** Phase 2.
**Exit:** Every beat lands; portal + chakra moments feel "wow"; copy is real (from `constants.ts`), not lorem.

## Phase 4 — Overlay UI, content & CTAs

**Goal:** Production homepage around the experience.
**Scope:**
- Nav adapts over canvas (transparent → solid on scroll-out).
- Scroll hint + slim progress indicator.
- Buy / newsletter CTAs woven into the Home-again beat; clean handoff links to inner pages.
- `prefers-reduced-motion` → static illustrated fallback of the journey.
**Deliverables:** Complete, content-accurate, accessible homepage.
**Dependencies:** Phase 3.
**Exit:** Real content; keyboard + reduced-motion paths work; nav/CTAs correct.

## Phase 5 — Performance, responsive, a11y, SEO

**Goal:** Ship-ready.
**Scope:**
- Texture compression (KTX2/basis), lazy-load per scene, code-split canvas.
- SSR-safe dynamic import; SEO meta/OG intact despite canvas.
- 375 → 768 → 1024 → 1440 QA; mobile thermal/perf check.
- Lighthouse pass (target 90+ where feasible for an experience site).
**Deliverables:** Optimised, responsive, accessible build.
**Dependencies:** Phase 4.
**Exit:** No jank; mobile solid; Lighthouse acceptable; reduced-motion fully functional.

## Phase 6 — Inner-page polish & cohesion

**Goal:** Bring Story/Chakras/About/Buy up to the new bar (absorbs the old `polish-plan.md`).
**Scope:**
- Story page: journey map + character deep dives (the one unfinished page).
- Swap inner-page placeholders for Phase 1 generated art.
- Micro-interactions, typography/spacing pass, visual tie-in to the hero.
**Deliverables:** Cohesive, premium site end-to-end.
**Dependencies:** Phases 1–5.
**Exit:** Whole site feels like one studio-built experience; old polish-plan stages closed.

---

## Execution rules

- One phase per session; `pnpm build` + verify at each phase end; commit `feat: magic-tree Phase N — …`; `/wrap` then `/clear`/`/compact` between phases.
- Re-read this file at the start of each phase (source of truth).
- **Housekeeping:** the `projects/magic-tree/` folder is docs-only and duplicates this project's name — consolidate it into `projects/magic-tree-adventures/` (or remove) to stop the two-directory confusion.
