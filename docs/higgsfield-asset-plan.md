# Higgsfield Asset Plan — Magic Tree Immersive Homepage

> **Key strategic shift:** We already own a full set of finished, professional illustrations
> (book interior PDF, illustrated by **Alejandra Barajas**, StoryTerrace © 2025). So Higgsfield's
> job is **extend + separate + animate the existing art**, NOT generate a new look from scratch.
> This keeps 100% fidelity to the book's style (the whole brand) and is faster + cheaper.
> Generate net-new only where the book has no usable plate.

Source file: `~/Downloads/2026_01_The Magic Tree_INT.pdf` (24 pp). Export plates at max res first.

### ⚠️ PDF file index ≠ printed page number (the interior is laid out as 2-page spreads)
Rendered files are `public/scenes/raw/page-NN.png` (regenerate via the `pdftoppm` command in `.gitignore`). Mapping (confirmed for the story's first half; **page-13…24 still unviewed — review in Phase 1**):

| File | Content |
|---|---|
| page-01 | Cover — crystal mountain in a circle (rainbow pastel, lavender sky) |
| page-02 | Copyright + title page |
| page-03 | "The Beginning of the Magic Tree" intro text + foliage corner motifs |
| page-04 | **Angelica map** (left) + **character portraits** (Rory/Riley/Tilly/Gino/Squirrel/Joe/Ari/Alina) (right) |
| page-05 | **Garden** (cottage+tree+3 kids, left) + autumn street (Tilly+dad+poodle, right) |
| page-06 | Riley in tree + Rory hugging trunk (left) + Rory crying vignette (right) |
| page-07 | Alina meets Rory (left) + **glowing liquid-gold tree** (right) |
| page-08 | **The golden door** appears/creaks open (kids) |
| page-09 | **ANGELICA REVEAL — hero plate** (used by the Phase 0 spike) |
| page-10 | Alina full angel (left) + **Gino the lion** reveal (right) |
| page-11 | Group + Alina + Gino (left/right), crystal mountain mid-distance |
| page-12 | Tilly worried vignette (left) + **running downhill toward the mountain** (right) |
| page-13 | Squirrel + spilt milk + Tilly fixes the bike (vignettes) |
| page-14 | Gino + squirrel (left) + **the route MAP to Crystal Mountain** (right) |
| page-15 | Storm vignette + **the ferry boat with Otter Joe** (right, book pp28–29) |
| page-16 | **Crystal Mountain ARRIVAL** + rainbow-winged Angel Ari — panoramic, but ~60% text columns |
| page-17 | **The Crystal Cave** — blue-crystal-apple trees (the climax) |
| page-18 | Rory plucks his blue crystal, glowing (vignettes) |
| page-19 | **Flying home on Gino** — epic panoramic spread |
| page-20 | Gino hugs Rory (left) + all the angels gather (right) |
| page-21 | Back in the garden — "The End (for now…)" |
| page-22 | **All About Chakras** — meditating child + 7 individual chakra cards (ready-made `/chakras` art) |
| page-23 | What is a Chakra / Angels + **real author photos** (Jools Abrams, Sara Oberman Babai, Alejandra Barajas) |
| page-24 | **Clean text-free crystal mountain** in a circle (back cover) — isolated asset |

## ⚠️ Rights check (confirm before publishing AI-extended art)
The illustrations are commissioned work (Barajas / StoryTerrace). Using them on the book's own
promo site is expected; **AI-outpainting/animating a named illustrator's art** should be confirmed
as in-scope with the client/publisher. Not a blocker for building — a flag before launch.

## Art-direction lock (from the book — do not drift)
- **Style:** soft painterly digital storybook (gouache-like), lush foliage, organic vignette framing, gentle glow.
- **Palette:** matches `CLAUDE.md` design system — parchment, gold, forest greens, lavender sky (#C8B8E8), candy-floss pink clouds, rainbow-pastel crystal (pink/mint/lavender/blue).
- **Characters (canon, keep exact):**
  - **Rory** — shy boy, brown hair, orange green-striped jumper, brown cargo trousers, green shoes (the protagonist).
  - **Riley** — little sister, brown pigtails, yellow tee + pink dungarees, fearless.
  - **Tilly** — teen sister, long wavy brown hair, green school blazer, white shirt, maroon tie, navy tartan skirt, knee socks, black boots.
  - **Alina** — angel of voices, blonde, soft-blue feathered wings, pale-blue dress.
  - **Gino** — friendly lion, big red-orange mane, tiny wings (needs his voice too).
  - **Otter Joe** — otter ferryman, captain's hat, yellow jacket. **Squirrel** — pink jacket.

## The journey — Book One's FULL arc (corrected after reading the whole book)
**Correction:** Book One does NOT end before the lake — the full adventure is in this book
(ferry → mountain → cave → fly home → return). So the scroll is a **complete loop**, ending on
"The End (for now…)" + the buy CTA. (Earlier note that the lake/summit was a Book-Two cliffhanger
was wrong.) Beats reference the rendered file index `page-NN` (see mapping table above).

| # | Beat | Source file | Notes |
|---|------|-------------|-------|
| 1 | **The Garden** — apple tree, ivy cottage | page-05 (left half) | half-spread → crop before outpaint |
| 2 | **The Wish / tree glows** | page-07 (right half) | half-spread → crop |
| 3 | **The Golden Door opens** (portal) | page-08 | door + halo |
| 4 | **Angelica reveal** (hero) ✦ | page-09 | ✅ outpainted (clean) |
| 5 | **Meet Alina & Gino** | page-10 / page-11 | angel + winged lion |
| 6 | **The ferry across the lake** — Otter Joe, the storm | page-15 (right) | half-spread → crop |
| 7 | **Crystal Mountain arrival** + Angel Ari ✦ | page-16 | ⚠ text-heavy → crop band, redo |
| 8 | **The Crystal Cave** — blue-crystal apples (climax) | page-17 | crop illustration |
| 9 | **Flying home on Gino** ✦ | page-19 | ✅ outpainted (minor captions to clean) |
| 10 | **Return to the garden** → "The End (for now…)" + CTA | page-21 | closes the loop |

Freebies (no AI generation needed): **chakra art** (page-22) for `/chakras`; **author photos**
(page-23) for `/about`; **clean crystal mountain** (page-24) as an isolated motif.

## Per-beat Higgsfield operations

**Beat 1 — Garden**
- `outpaint_image` p8 → full-bleed 16:9 **and** tall 9:16 (mobile) plates (extend sky + foreground grass).
- `remove_background` on Rory / Riley / Tilly crops (from p8/p10) → transparent PNG sprites for parallax float.
- Cut p4–5 leaf/apple/wildflower clusters → corner-flourish PNGs (UI framing, reused site-wide).
- Optional ambient: `generate_video` (image→video) subtle leaf-drift/firefly loop, 3–5s seamless — only if lighter than shader particles (decide in Phase 2).

**Beat 2 — Wish/glow → Beat 3 — Door (the portal transition)**
- `outpaint_image` p15 (door) → full-bleed.
- Isolate the door + golden halo as its own layer (`remove_background` on the glow/door).
- **Portal bloom:** `generate_video` image→video using p13 (glowing tree) → p15 (open door, light burst) as start/end (bookend) → short seamless clip; OR drive a radial reveal **shader** with these two stills. Build both, pick the smoother.

**Beat 4 — Angelica reveal (hero)**
- `outpaint_image` p16–17 → true full-bleed 16:9 + 9:16. This is the money shot — highest-res export, careful outpaint of sky/clouds/foreground flowers.
- Separate layers: foreground flowers, mid hills+cottages, lake, crystal-mountain glow, cloud band, sky → deep multi-plane parallax.
- Butterfly cutouts → animated sprites drifting on scroll.

**Beat 5 — Alina & Gino**
- `remove_background` Alina (p18) + Gino (p19/21) → transparent guide sprites that enter on their beats.
- `outpaint_image` p20–21 meadow as the scene backdrop.
- Optional: Alina blue-mist swirl loop (`generate_video`) for her entrance.

**Beat 6 — Toward the mountain → CTA**
- `outpaint_image` p23 (running downhill) as the closing scene.
- Crystal mountain from p1 cover: isolate + `generate_video` gentle facet-shimmer loop (or shader refraction) for the destination glow.
- p6 map → reuse as the Story-page journey map (Phase 6) and a mini progress motif.

## Global / atmospheric (generate once, reuse)
- 7 **chakra crystal lights** — small glowing pastel crystal PNGs in the 7 chakra colours (for the chakra-ignition moment + `/chakras`). Generate in Barajas style or build as shader sprites.
- Particle textures: soft firefly/pollen mote, gold sparkle, star twinkle (can be canvas/shader — generate only if a painterly look is wanted).
- Cloud/mist puffs (candy-floss pink + lavender) as parallax sky layers — outpaint from p16–17 clouds.

## Technique notes
- **Depth / parallax:** preferred route = generate a **depth map per plate** with a local depth model (Depth Anything V2 / MiDaS) and drive a displacement shader on the original illustration — preserves the exact art, far less work than hand-cutting. Higgsfield is NOT a depth-map tool. Fallback = manual 3-layer split (foreground cut + `outpaint_image` to reconstruct the occluded background behind it). Use multi-plane split only for Beat 4 (hero) where depth matters most.
- **Higgsfield tools we'll use:** `outpaint_image` (full-bleed extends), `remove_background` (sprites), `generate_video` (ambient + portal loops, image→video / bookend), `upscale_image` (hero plates). Default image model **Nano Banana 2** for any net-new/inpaint. `select_workspace` at session start (MCP defaults to a hidden private workspace).
- **Formats:** export plates as WebP; KTX2/basis-compress textures for the WebGL layer (Phase 5). Transparent sprites as PNG.

## Generation queue (sequence)
1. Export all source plates from the PDF at max res (no Higgsfield — just extraction).
2. Lock Beat 4 (hero reveal): outpaint + upscale + layer-separate → validate in the Phase-0 test scene.
3. Outpaint Beats 1, 2, 3, 5, 6 full-bleed plates.
4. Background-removal sprite pass: 3 kids, Alina, Gino, butterflies, door/glow, mountain.
5. Depth-map pass on all full-bleed plates.
6. Video loops: portal bloom, crystal shimmer, (optional) Alina mist, leaf/firefly drift.
7. Global assets: chakra crystals, cloud/mist layers, corner flourishes.

## Net-new vs reuse
- **~95% reuse/extend** of existing Barajas art — the right call for brand fidelity.
- **Net-new only:** particle textures (firefly/sparkle), possibly a cloud layer. Chakra crystals are NOT net-new — the book's chakra art (page-22) covers it.

## Phase 1 progress & learnings (2026-06-15)

### ✅ Phase 1 COMPLETE (2026-06-15)
**All 8 scene plates outpainted 16:9 + text-free in `public/scenes/processed/`:**
- beat1-garden · beat2-glowing-tree · beat4-angelica-reveal · beat6-ferry ·
  beat7-crystal-mountain-arrival · beat8-cave · beat9-flying-home · beat10-return-garden.
- beat7 redone via **crop-first** (the prior text-column version is gone).
- Text-clean inpaint (`nano_banana_2`, 2k) ran on beat4 (hero caption), beat9 (3 captions),
  beat10 (top block + "The End") — captions removed, Barajas style preserved.

**Character sprites (transparent PNG) in `public/characters/`:**
- rory · riley · tilly · otter-joe (clean busts from the p04 portrait grid) ·
  alina · gino (full-body from p10), all via `remove_background`.
- ⚠ **Alina lost her soft blue wings** — translucent feathers read as background to the
  remover (inherent limit). Her full-winged form is preserved in the beat9 flying plate.

**Freebies (no AI) in `public/chakras/` + `public/about/` + `public/scenes/processed/`:**
- 7 chakra cards (p22) · 3 author photos: Jools Abrams, Sara Oberman Babai, Alejandra Barajas
  (p23) · clean-mountain motif (p24).

**Ambient video loops (`grok_video_v15`, 5s 720p, ~22cr each) in `public/scenes/video/`:**
- beat1-garden · beat4-angelica-reveal · beat7-arrival · beat9-flying-home.

**Web textures in `public/scenes/web/`:** each plate → 2048w `.webp` (~200-400KB) +
smoothed greyscale `.depth.webp` proxy (~12KB) driving the Phase-2 parallax shader.

### Tooling
- **`scripts/crop.mjs`** (sharp) — offset/half/fractional crops (`sips` only does centred).
  Usage: `node scripts/crop.mjs <in> <out> --frac <l> <t> <w> <h>` (0-1 or 0-100), or `--half left|right`.

### Learnings
- `outpaint_image` is excellent + cheap (~2 cr) and **perfectly preserves Barajas's style**.
  Pipeline: `media_upload` (batch `files[]`) → curl PUT → `media_confirm` → `outpaint_image` (16:9) → `job_status` → download.
- **Text-heavy + half-spread plates need crop-to-illustration BEFORE outpaint**; the painted
  *edges* of the crop must be scene (inscribe inside oval vignettes — parchment corners would
  extend as parchment). `nano_banana_2` then removes any residual captions and **faithfully
  inpaints painterly sky/grass/water** — verified on 4 plates, zero style drift.
- `remove_background` is clean on opaque subjects + the solid p04 portrait ovals; it **cannot
  keep translucent wings/glows** (treats them as background).
- Total Phase-1 spend trivial (well under 100 cr of the 2971 team balance).

### Depth maps (Phase 2+)
The shipped depth proxy is a **smoothed greyscale of the colour plate** (sharp: greyscale →
blur → mild contrast) — not true depth, but a smooth displacement driver that avoids the
luminance-edge smear the spike hit. The engine reads `*.depth.webp` from a generic slot:
drop a real **Depth-Anything V2 / MiDaS** map at the same path and the look upgrades with no
code change.

## Phase 6.5 — Per-page art batch (2026-06-15)

### ✅ Art batch COMPLETE (Chakras + About; Buy reuses existing plates)
The per-page experiences (build-plan §6.5) needed new art only for **Chakras** (the page that
genuinely needs a new set) plus a single **About origin** plate. **Buy** reuses the home-journey
plates (mountain / angelica / garden) per the plan's "mostly reuse". All assets are
`public/scenes/web/<name>-16x9.webp` (2048w colour) + `<name>-16x9.depth.webp` (greyscale proxy)
+ archival `public/scenes/processed/<name>-16x9.png`.

**Chakras (8 plates) — `chakra-*-16x9`:**
- **`chakra-intro`** — *generated* (nano_banana_pro i2i, throat-child as style ref): the boy
  meditating with all **7 chakras glowing rainbow** up his body, lavender-and-gold sky, lush
  foliage, sparkles. The page's showpiece opener ("The Magic Inside Every Child").
- **`chakra-root … chakra-crown`** (7) — the book's page-22 meditating-child cards
  (`public/chakras/*.png`), tight-cropped to the illustration (drops the right-edge text),
  `outpaint_image` 16:9. Each sits on its own chakra-colour field (root=red, sacral=orange,
  solar-plexus=yellow, heart=green, throat=blue, third-eye=lavender, crown=mauve) → the field
  colour reinforces the engine's per-beat tint + the igniting orb. Throat happened to outpaint a
  soft sky/sand horizon (kept — reads well).

**About (1 new plate):**
- **`about-origin`** — page-06 left, cropped to the **apple-tree canopy band** (Riley swinging in
  the old apple tree, apples, lush foliage; cropped above the body text), `outpaint_image` 16:9.
  The "1964 magic apple tree" origin beat. The Sara/Alejandra creator beats reuse the existing
  author photos (`public/about/`) over a reused garden plate — **Jools dropped per Louis** (Sara =
  Author, Alejandra = Illustrator).

### Learnings (additive to Phase 1)
- **`nano_banana_pro` (MCP) = `nano_banana_2` (server) for i2i** and supports **16:9 output
  directly** — so a generated plate needs no separate outpaint step (used for `chakra-intro` +
  the heart redo). Reference image passed via `medias[{role:"image"}]` preserves Barajas style +
  the boy's identity faithfully.
- **page-22 is not uniform:** the **heart** card is a head-and-shoulders *bust*, not the
  full seated body the other 6 cards use — so outpainting it always yields a bust (tried twice).
  Fix = **generate** a full-body heart via nano_banana i2i using a full-body chakra crop (root) as
  the pose reference + "green field, green heart orb" → now matches the sequence. Lesson: check the
  source card's shot scale before assuming a uniform outpaint; regenerate the odd one out.
- **Outpaint is flaky under load** — 2 of 8 jobs (`throat`, `heart`) failed transiently on first
  submit; a straight re-submit of the same `image_id` succeeded. Poll + retry, don't re-crop.
- `scripts/process-plate.mjs` (new) — one input PNG → archival `processed/*.png` + 2048w
  `web/*.webp` + smoothed-greyscale `web/*.depth.webp`. Codifies the Phase-1 pipeline.
- Source crops live in `public/scenes/raw/crops/` (**gitignored** — regenerable from the cards via
  `scripts/crop.mjs`). Total Phase-6.5 spend trivial (~25cr of the 2880 balance).

### Still to wire (not art — build-plan §6.1–6.3)
The plates exist; the **journeys don't yet consume them**. Next: add `CHAKRAS_JOURNEY` (intro →
7 chakra beats with copy from `CHAKRAS` constants → close) and `ABOUT_JOURNEY` / `BUY_JOURNEY`
to `engine/scenes.ts`, and route each page through `<Experience journey={…} />`.
