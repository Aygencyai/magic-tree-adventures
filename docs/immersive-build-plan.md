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

## Phase 5 — Feel, key assets, cohesion + ship-readiness

**Goal:** Make the journey *feel* right, fix the two weakest beats/sections, and get
ship-ready (perf / responsive / a11y / SEO). Larger than the original Phase 5 — run it in the
labelled workstreams below; commit per workstream. **Re-read this section at the start.**

> **Decisions locked with Louis (2026-06-15) before this phase:**
> snap-to-beat scroll · dedicated Alina & Gino plate generated from the book · the homepage
> tail (Reviews/Newsletter) restyled to the book look. Inner-page cohesion stays Phase 6.

### A. Snap-to-beat scroll (the journey should *land* on beats) ✅ DONE (2026-06-15)
**Shipped:** `engine/JourneySnap.ts` — wired into `SceneEngine` (constructed after Lenis,
disposed with it; the engine owns the scroll source). Hybrid snap: analog scrubbing stays
(engine + overlays still read `journeyProgress()` each frame; snap only nudges the scroll
position). Idle = debounced ~140ms after the last wheel/touch gesture **and** Lenis velocity
settled (covers trackpad + touch momentum). Direction bias `FORWARD_BIAS=0.25` → one flick ≈
one beat (symmetric backward). A fresh gesture cancels any in-flight snap (`lenis.scrollTo`
`lock:false`) and re-arms. Only snaps while the scroll sits *inside* `[data-journey-track]` —
never fights the nav above or the conversion tail below (so `track.offsetTop` is honoured, not
assumed 0). Bypassed under `?p=` and reduced motion (`disabled()` predicate). Tunables at the
top of `JourneySnap.ts`: `IDLE_MS`, `VELOCITY_EPS`, `SNAP_DURATION`, `FORWARD_BIAS`.

**Verified (headless WebGL, Chrome-for-Testing + ANGLE/swiftshader, prod build):** canvas +
WebGL mount, zero console errors. Snap behavioural test via CDP wheel events + settle-until-
stable polling: one flick forward lands beat 1.000 then 2.000; small back-flick stays (2.000);
back-flick returns one beat (1.001); hard flicks settle *exactly* on a beat (2.000, 4.000);
`?p=0.5` freezes the journey with snap disabled (free scroll, no snap-back). `pnpm build` clean
(`/experience` 99.2 kB, unchanged); `tsc --noEmit` clean; target-selection math unit-tested.
> Harness note: `chrome-headless-shell` can't client-render the `next/dynamic({ssr:false})`
> canvas (Suspense stays in `BAILOUT`); the **full Chrome-for-Testing** binary (with
> `--user-data-dir`) does. Use it, not the shell, for behavioural WebGL checks here.

**Problem:** pure analog scrubbing makes beats hard to rest on — the ideal spot (beat centred,
transition complete) is a moving target and trackpad momentum overshoots.
**Approach (hybrid snap, NOT full scroll-hijack):**
- Keep analog scrubbing. On scroll-idle (debounce ~140ms after wheel/touch ends, when Lenis
  velocity ≈ 0) animate `lenis.scrollTo(targetBeatScroll, { duration ~0.7, easeInOutCubic })`.
- Target = beat centre scroll position = `round? ` nearest beat with a **direction bias**: if the
  user moved >~25% toward the next beat in the scroll direction, snap to that next beat (so one
  flick ≈ one beat); otherwise snap to nearest. Beat centre px = `i/(N-1) * trackLength`
  (`trackLength = track.offsetHeight - innerHeight`, track offsetTop = 0).
- Don't fight active input: only snap when idle; cancel the snap tween if the user scrolls again.
- `?p=` (forced) bypasses snap entirely. Reduced-motion path is `StaticJourney` (no snap needed).
- Lives where the scroll source is owned: the engine owns Lenis, so add the snap there (or a
  small `useJourneySnap` reading the same Lenis/track). Keep engine + overlays still reading
  `journeyProgress()` each frame — snap just nudges the scroll position they read.
- **Exit:** a single flick advances ≈ one beat and settles centred with the transition finished;
  no fighting the user; mobile + trackpad feel good; `?p=` still freezes.

### B. Dedicated "Meet Alina & Gino" plate (it currently reuses the Angelica reveal)
**Problem:** the `friends` beat shows the same plate as `angelica` with floating sprites → reads
as the same scene.
**Approach (generate from the book — Higgsfield, proven pipeline):**
- Source: **book page-10** (Alina as a full *winged* angel + Gino the lion reveal); page-11 as
  backup (group + Alina + Gino). Render from the interior PDF if `page-10` raw isn't present.
- `select_workspace` at session start (MCP defaults to a hidden workspace). Crop to the
  illustration → `media_upload` → `outpaint_image` 16:9 → `nano_banana_2` text-clean if captions
  → download → `scripts/crop.mjs`/sharp → `public/scenes/web/beat-friends-16x9.webp` +
  `.depth.webp` proxy. Default model Nano Banana 2 for any inpaint.
- Update `scenes.ts`: `friends` beat points at the new plate (no longer reuses `beat4`). The
  winged-angel plate also resolves the wingless-Alina loose end *for this beat* — so **drop the
  floating Alina/Gino sprite cameos here** (they're now in the plate); re-judge if a subtle Gino
  cameo still helps. ~tens of credits (well within balance).
- Rights: same Barajas/StoryTerrace launch-gate note applies.
- **Exit:** the `friends` beat is visibly its own scene with Alina & Gino as the focus.

### C. Restyle the homepage tail (Reviews + Newsletter) to the book look
**Problem:** after the journey releases, the tail (`Reviews`, `Newsletter`) reads like generic
sections, not part of the book.
**Approach (visual cohesion, still normal-flow — no WebGL):**
- Carry the journey's language into the tail: parchment / parchment-dark grounds, a soft
  painterly motif behind them (e.g. the `return-garden` plate or `clean-mountain` motif faded
  low-opacity, or Phase-1 corner-flourish PNGs), Fraunces headings + Caveat accents, `glass-warm`
  review cards, gold CTAs. Make journey→tail feel like turning to the book's closing pages.
- Keep it light (CSS/Framer on a normal page); this is cohesion, not a second WebGL surface.
- **Exit:** scrolling past "Back to the Garden" into Reviews/Newsletter feels like the same book,
  just different info; nav still flips solid here.

### D. Performance
- ✅ **Washout / ghosting fix (2026-06-15, from live feedback).** The crossfade blended two
  semi-transparent plates across the *whole* gap (`opacity = 1 - |s-i|`) → constant ghosted
  double-image + bright parchment background bleeding through → "distorted faces", washout,
  "only the exact-beat frame looks right". Replaced with a **layered hold + short dissolve**
  (`SceneEngine.updateScenes`, `CROSSFADE_BAND=0.2`): current beat held opaque as the back
  layer, next beat fades in over it only in a thin band at the midpoint → ~80% of each beat is
  one clean plate, no bg bleed. Also tamed bloom (strength 0.42→0.22, threshold 0.72→0.85) and
  additive motes (0.85→0.5). Verified via screenshots at beat centres + off-midpoint + midpoint.
- Texture compression (KTX2/basis), lazy-load per scene, confirm canvas stays code-split.
- Headless swiftshader over-brightens bloom; judge bloom/chakra-orb prominence on a real GPU and
  bump **mobile chakra-orb contrast** (deferred from P3) if still faint. `CROSSFADE_BAND` and the
  bloom params are the tuning knobs if the dissolve still feels too soft/hot on a real GPU.
- Optional: real **Depth-Anything V2 / MiDaS** maps to replace the greyscale proxies (drop-in at
  `*.depth.webp`, no code change) — decide if the extra parallax pop is worth it on real GPU.

### E. Responsive + a11y
- 375 → 768 → 1024 → 1440 QA; mobile thermal/perf check.
- **Skip-the-journey affordance** (deferred from P4): a keyboard-reachable "skip to the book" /
  jump-to-tail link so the long journey isn't a keyboard trap. Confirm reduced-motion path.

### F. SEO
- SSR-safe dynamic import (already); **homepage `<title>` / OG** is still the layout default —
  give `/` proper metadata despite the canvas. Confirm OG/meta on all routes.

**Dependencies:** Phase 4.
**Exit:** journey lands on beats; the friends beat is its own scene; the tail feels like the
book; no jank; mobile solid; Lighthouse acceptable; reduced-motion + keyboard paths work.

## Phase 6 — Every page is its own immersive experience

**Decision (Louis, 2026-06-15):** a mixed site (immersive homepage + plain inner pages) "doesn't
really work." So **every page becomes its own scroll experience** in the same painterly Barajas
art style — built on the homepage engine, with page-specific art (generated via Higgsfield to
stay on-style) + page-specific content. **The Story page is removed** (the homepage journey *is*
the story). End state: Home (the journey) · Chakras · About · Buy — four cohesive experiences,
one world.

> **Why this reverses the earlier "inner pages stay Framer+CSS for SEO" note:** the new
> directive is full cohesion. We keep SEO/perf safe by **server-rendering each page's real copy
> as DOM text** (the canvas is decoration over crawlable content) and code-splitting/disposing
> each canvas per route. SEO is a build constraint here, not a reason to keep pages plain.

### 6.0 Generalise the experience engine into a reusable per-page system ✅ DONE (2026-06-15)
**Shipped:** `JOURNEY`→`HOME_JOURNEY`; `ExperienceMount`→`Experience` taking a `journey` prop
(computes track height from it); `ExperienceCanvas`/`JourneyOverlays`/`StaticJourney` all take
`journey`; `/` and `/experience` render `<Experience journey={HOME_JOURNEY} />`. Snap, `?p=`,
progress bar, reduced-motion all unchanged. Build + tsc clean; homepage mount verified.

The engine is already 90% generic — make it fully parameterised so each page is just *data*:
- `SceneEngine` already takes `defs: SceneDef[]` ✅. Generalise `JourneyOverlays` (drop the
  `import { JOURNEY }`; take a `journey` prop) and `ExperienceMount` (take `journey` + compute
  track height from it). `StaticJourney` already maps any journey — pass it the same array.
- `scenes.ts` → one exported journey per page: `HOME_JOURNEY` (current `JOURNEY`),
  `CHAKRAS_JOURNEY`, `ABOUT_JOURNEY`, `BUY_JOURNEY`. Same `SceneDef` shape (image/depth/tint/
  copy/flags). Snap-to-beat (Phase 5A), `?p=`, progress bar, reduced-motion static fallback,
  nav-over-track all work unchanged for every page.
- Each route renders `<Experience journey={X} />`; one engine, four data sets.

### 6.1 Chakras experience (`/chakras`)
Natural fit — the 7 chakras are already a beat sequence with rich copy in `constants.ts`.
- Beats: intro ("The Magic Inside Every Child") → **one beat per chakra** (Root→Crown) → close
  (→ Buy / Home). Each chakra beat: its painterly scene, the chakra colour as tint, the orb
  igniting, copy from `CHAKRAS` (`childFriendly` + `meaning` + `tryThis` + `storyConnection`).
- Art: generate per-chakra plates in Barajas style from the book's **page-22** chakra art + each
  chakra's story moment (e.g. Throat = the crystal cave). Replaces today's Chakra Explorer.

### 6.2 About experience (`/about`)
- **Content correction (Louis, confirmed 2026-06-15):** the About page features **Sara
  (Author)** and **Alejandra Barajas (Illustrator)** — two people. This overrides current
  `constants.ts` `CREATORS` (which lists *Jools Abrams* as Author and Sara as "Spiritual
  Guide"): reattribute Sara → **Author** and **drop Jools** entirely. Keep the in-story
  grandfather **Poppa Stan** in the origin beats.
- Beats: the origin (1964, the old apple tree, Poppa Stan's bedtime stories — the 60-year
  story) → **Sara, the author** → **Alejandra, the illustrator** → invite/close.
- Art: generate origin/garden scenes from book **page-05/06**; for Sara + Alejandra use the real
  author photos (book **page-23**, already in `public/about/`) set in painterly frames, or
  generate Barajas-style portrait scenes — tailored to read as part of the world.

### 6.3 Buy experience (`/buy`)
- Its own tailored experience, but **conversion stays front-and-centre**: the actual buy action
  (price, format, purchase link) must be prominent and crawlable — the experience frames it, it
  doesn't bury it.
- Beats: the book hero (cover / crystal mountain, book **page-01/24**) → "what's inside" (journey
  + chakras teaser) → a review beat → strong **buy CTA** beat (price/format/buy button).

### 6.4 Remove the Story page ✅ DONE (2026-06-15)
**Shipped:** deleted `src/app/story/page.tsx` (no dedicated components existed — it only used
shared UI primitives). Dropped "The Story" from `NAV_LINKS`. Repointed every `/story` link:
journey + StaticJourney closing CTA → `/chakras` "Discover the Chakras"; not-found → `/chakras`;
old Chakra-Explorer CTA + orphaned Hero → `/` "Enter the Journey"; removed the sitemap entry.
No `/story` references remain; build clean. (Done early, alongside 6.0 — both no-art structural.)

### 6.5 Assets, perf, SEO, a11y across all experiences
- **Higgsfield generation pass** for Chakras (7+ plates), About (origin + creators), Buy
  (book-focused) — same outpaint + text-clean + web-webp + depth-proxy pipeline as Phase 1;
  `select_workspace` first; rights note applies. Watch credit balance (ample).
- Per-page **reduced-motion static fallback** (StaticJourney already generalises), code-split +
  dispose each canvas on route change, real copy SSR'd for SEO, per-page `<title>`/OG, 375→1440
  QA + mobile thermal, Lighthouse per page.

**Dependencies:** Phases 1–5 (esp. the engine + snap + asset pipeline).
**Exit:** Home / Chakras / About / Buy are four cohesive immersive experiences in one art world;
Story removed; About credits correct (Sara author, Alejandra illustrator); every page has a
reduced-motion fallback + crawlable content; no jank on mobile.

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
