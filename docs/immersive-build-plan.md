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

## Phase 1 — Art generation (Higgsfield) ✅ DONE (2026-06-15)

**Shipped:** all 8 scene plates outpainted to 16:9 + text-cleaned (`public/scenes/processed/`);
6 character sprites (`public/characters/`, transparent PNG; Alina wings lost to bg-removal —
caveat in `higgsfield-asset-plan.md`); freebies (7 chakra cards, 3 author photos, clean-mountain);
4 ambient video loops (`public/scenes/video/`); web-optimised `.webp` textures + greyscale
depth proxies (`public/scenes/web/`); `scripts/crop.mjs` offset-crop tool. Full per-asset
ledger + learnings in `docs/higgsfield-asset-plan.md` (§Phase 1 COMPLETE). Real Depth-Anything
maps drop into the engine's `*.depth.webp` slot later with no code change.

<details><summary>Original Phase 1 scope</summary>

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
</details>

## Phase 2 — The Scene Engine ✅ DONE (2026-06-15)

**Shipped:** `src/experience/engine/` — a reusable vanilla-Three engine:
- `ParallaxScene` — one painterly plate as a **depth-parallax plane**: in-shader UV parallax
  (near pixels slide opposite far pixels off pointer/scroll), soft vignette, per-scene opacity
  for crossfades. No scene lighting → nothing blows out under bloom (the spike's emissive
  approach did). Reads colour `.webp` + greyscale depth proxy.
- `ParticleField` — instanced firefly/pollen motes, drift in the vertex shader, additive,
  tinted to the active beat, count scaled by device tier (deterministic spread, no `Math.random`).
- `Atmosphere` — `EffectComposer` render → gentle `UnrealBloomPass` (high tier only, low
  strength) → `OutputPass`.
- `SceneEngine` — owns renderer/camera/Lenis, maps global scroll progress (0→1) across the
  scene list with linear neighbour crossfade, cover-fits plates (landscape + portrait), runs
  one rAF loop, disposes cleanly. `?p=0..1` deep-links/freezes progress (QA + sharing).
- `quality.ts` — device tier + `prefers-reduced-motion` → static crossfades, no bloom/motion.
- `scenes.ts` — 3-beat arc wired (garden → angelica → flying); extend the array for Phase 3.

**Verified (headless WebGL, swiftshader):** all 3 scenes load + render; scroll crossfades
between them (screenshots at p=0/0.5/1.0); particles + bloom + vignette present; mobile width
cover-fits + drops to low tier; `pnpm build` clean, `/experience` = 1.21 kB / 88.7 kB first load
(Three.js in its own chunk, zero weight on other routes); no console errors.

**Next (Phase 3):** sequence the full 10-beat journey, the golden-door portal shader transition,
chakra-light ignition, and beat-synced Fraunces/Caveat HTML overlays.

<details><summary>Original Phase 2 scope</summary>

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
</details>

## Phase 3 — The Journey (scroll choreography) ✅ DONE (2026-06-15)

**Shipped:**
- `engine/scenes.ts` — the full **9-beat** journey wired (Book One's complete arc across
  the 8 owned plates; the Angelica plate carries two beats — the reveal, then meeting Alina
  & Gino). Each `SceneDef` now also carries overlay copy (real, from the book + `constants.ts`),
  per-beat tint, and `portalAfter`/`chakraIgnite`/`sprites`/`cta` flags. The two missing
  narrative beats need no new plate: "The Golden Door" is the portal transition; "Meet Alina
  & Gino" reuses the Angelica plate with character cameos.
- `engine/Portal.ts` + `SceneEngine` wiring — the **Golden Door**: an additive radial
  bloom (warm core + expanding ring + a faint vertical door-slit) firing as a smooth
  triangular pulse at the midpoint of the beat flagged `portalAfter` (garden world → Angelica),
  0 everywhere else. Aspect-locked, overscanned fullscreen quad, renderOrder above plates +
  particles. Scroll-driven → safe under reduced motion.
- `JourneyOverlays.tsx` — beat-synced HTML over the canvas: glass-warm copy cards (Caveat
  kicker + Fraunces title + Caveat narration), the **7-chakra ignition** down the Crystal-
  Mountain beat (root→crown stagger, colours from `CHAKRAS`), Alina & Gino **cameos** on the
  meet beat, a **buy CTA** on the closing beat, and a scroll hint. Reads the same page scroll
  as the engine (+ `?p=` deep-link, mirroring the engine's freeze) so copy stays locked to its
  plate. Scroll spacer in `ExperienceMount` now grows with beat count (~135vh/beat).

**Verified (headless WebGL, swiftshader):** `pnpm build` clean; `/experience` = 2.38 kB /
89.9 kB first load; all 9 beats sequence with real copy; portal fires at the garden→Angelica
seam; chakra orbs ignite; cameos + CTA present; responsive at 375/768/1440; **zero console
errors across 5 runs.**

**Key decisions / learnings recorded:**
- **Overlays are deliberately NOT Framer Motion.** `motion.*` components invoke Framer's WAAPI
  accelerated path, which throws a benign-but-noisy `"offsets must be monotonically
  non-decreasing"` TypeError racing the scroll-linked values on first paint (every load; not
  fixed by `times`/yoyo/CSS-conversion/deferred-mount/`ssr:false`). These overlays are pure
  scroll→style mappings, so a single rAF loop writing `opacity`/`transform` straight to plain
  elements is the right tool — no WAAPI, zero console errors, and it dropped the route from
  148 kB → 89.9 kB (framer-motion out of the chunk). Float/bob use CSS keyframes.
- **Tailwind `content` must include `src/experience/`** — it didn't, so every class used *only*
  in the experience layer (`bottom-[11vh]`, `right-[6vw]`, `glass-warm`, …) was purged and
  overlays mis-rendered (copy stuck top-left, no card). Fixed in `tailwind.config.ts`.

**Open / deferred to later phases:**
- Chakra-orb prominence on mobile (375) is faint against the bright arrival plate — refine in
  Phase 5 (responsive/perf pass). Headless swiftshader also over-brightens bloom vs real GPU.
- `/experience` is still a standalone route; homepage swap + nav/progress UI = Phase 4.

<details><summary>Original Phase 3 scope</summary>

**Goal:** Wire the full narrative.
**Scope:** Sequence all scenes along scroll progress · Golden Door portal shader transition ·
chakra-light ignition on the Crystal Mountain beat · beat-synced HTML overlays (Fraunces +
Caveat) per scene.
**Exit:** Every beat lands; portal + chakra moments feel "wow"; copy is real, not lorem.
</details>

## Phase 4 — Overlay UI, content & CTAs ✅ DONE (2026-06-15)

**Decisions (Louis):** homepage = **journey + conversion tail** (the 9-beat journey, then
Reviews + Newsletter scroll up to close); nav = **transparent over the journey, solid on the tail**.

**Shipped:**
- **Homepage swap** — `/` now renders the journey then the conversion tail (`Reviews` +
  `Newsletter`, opaque `z-20` block). The previous storybook homepage is retired (in git
  history; its content lives on the inner pages). `/experience` stays as a journey-only route
  (handy for `?p=` QA/sharing).
- **Sticky scrollytelling architecture** — `ExperienceMount` is now a tall
  `[data-journey-track]` section whose sticky `h-screen` child pins the canvas + overlays while
  you scroll the journey, then releases so the tail scrolls up over it naturally (no z-index/
  hide hacks). Canvas + overlays moved from `fixed` → `absolute` inside the sticky wrapper.
- **Progress bound to the track** (`engine/progress.ts` → `journeyProgress()`) — engine + HTML
  overlays both read it, so the journey maps to the track and not the whole document (which now
  includes the tail). Engine reads it each rAF frame (Lenis still smooths the scroll).
- **Nav adapts** — transparent across the whole journey track, flips to the solid glass-warm
  bar as the tail enters; non-journey pages (and the reduced-motion static page) keep the
  `scrollY ≥ 50` rule. Re-binds on route change + resize.
- **Slim progress indicator** — a gold gradient bar at the top edge, `scaleX` = journey progress.
- **Reduced-motion fallback** — `StaticJourney`: `prefers-reduced-motion` swaps the whole WebGL
  journey for a calm vertical storybook (each plate + its Fraunces/Caveat copy, the CTA on the
  closing beat). No canvas, no scroll-scrubbing, no autonomous motion.

**Verified (headless WebGL, swiftshader):** `pnpm build` clean; `/` = 3 kB / 187 kB,
`/experience` = 3 kB / 99.2 kB; homepage journey full-bleed under the transparent nav; `?p=`
deep-link drives the homepage journey (chakra beat confirmed); conversion tail (Reviews +
Newsletter) server-rendered after the track; reduced-motion static storybook renders; mobile
(375) hero clean; **zero console errors.**

**Deferred:** keyboard-nav affordance for the journey (you can scroll/tab to CTAs; an explicit
"skip the journey" link could help a11y — fold into Phase 5). Homepage `<title>`/OG still the
layout default — confirm in Phase 5 SEO pass.

<details><summary>Original Phase 4 scope</summary>

**Goal:** Production homepage around the experience.
**Scope:** Nav adapts over canvas · scroll hint + slim progress indicator · Buy/newsletter CTAs
woven into the Home-again beat + handoff links · `prefers-reduced-motion` static fallback.
**Exit:** Real content; keyboard + reduced-motion paths work; nav/CTAs correct.
</details>

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

## Open loose ends — revisit before launch (logged 2026-06-15, end of Phase 2)

Carried forward from the Phase 1–2 session. Re-check each at the end; several may
fold into a later phase or turn out unnecessary.

- [ ] **Alina sprite has no wings.** `remove_background` stripped her translucent blue
  feathers (read as background). Her winged form survives inside the beat9 flying plate.
  *Decide:* leave wingless (she only needs to appear winged in-scene), or remake the
  standalone sprite via manual mask / fresh gen. Only matters if a winged Alina sprite is
  needed as an overlay element in Phase 3/6.
- [ ] **Depth maps are smoothed-greyscale proxies, not true depth.** Parallax is gentle +
  correct but flat. *Optional upgrade:* run Depth-Anything V2 / MiDaS locally per plate →
  drop into the engine's `public/scenes/web/*.depth.webp` slot (no code change). Decide if
  the extra pop is worth it after the full journey is wired (Phase 3) and judged on real GPU.
- [ ] **The experience is still the standalone `/experience` route**, not the homepage. It
  folds into `/` during Phase 3–4 (journey + overlay UI). Confirm the homepage swap when
  Phase 4 lands; keep `/` as the storybook page until then.
- [ ] **Inner pages don't yet use the Phase 1 generated art.** Sprites, 7 chakra cards,
  3 author photos, clean-mountain motif are generated + on-palette but unused. Wiring is
  Phase 6 scope (Story/Chakras/About) — verify nothing's orphaned at the end.
- [ ] **Rights check before publishing AI-extended Barajas art.** AI-outpainting/animating a
  named illustrator's commissioned work should be confirmed in-scope with the client/publisher.
  Not a build blocker — a launch gate. (Also noted in `higgsfield-asset-plan.md`.)

## Execution rules

- One phase per session; `pnpm build` + verify at each phase end; commit `feat: magic-tree Phase N — …`; `/wrap` then `/clear`/`/compact` between phases.
- Re-read this file at the start of each phase (source of truth).
- **Housekeeping:** the `projects/magic-tree/` folder is docs-only and duplicates this project's name — consolidate it into `projects/magic-tree-adventures/` (or remove) to stop the two-directory confusion.
