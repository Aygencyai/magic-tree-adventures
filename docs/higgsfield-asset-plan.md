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
| page-13…24 | Unviewed — second half of the story + back matter |

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

## The journey — aligned to Book One's REAL arc
Book One ends with the children heading *toward* the Crystal Mountain (the crossing/summit is the
cliffhanger → Book Two). So the homepage scroll should end on the mountain glowing in the distance +
a "the adventure continues / get the book" CTA — not a fabricated summit scene.

| # | Beat | Primary book source | What we already have |
|---|------|---------------------|----------------------|
| 1 | **The Garden** — apple tree, ivy cottage, dusk | p8 (garden + 3 kids), p4–5 foliage corners, p10 tree | Full scene + characters + UI motifs |
| 2 | **The Wish / tree glows** — liquid-gold bark | p13 (glowing tree) | Full scene |
| 3 | **The Golden Door opens** (the portal) | p14–15 (door in trunk, halo of light) | Full scene |
| 4 | **Angelica reveal** (the wow) — golden hills, blue lake, crystal mountain, lavender sky | p16–17 (wide spread) | Near-widescreen hero plate ✦ |
| 5 | **Meet Alina & Gino** | p12/p18 (Alina), p19–21 (Gino) | Full scenes + portraits |
| 6 | **Toward the Crystal Mountain** → CTA | p23 (running downhill), p1 cover (mountain), p6 map | Motion scene + iconic mountain |

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
- **~90% reuse/extend** of existing Barajas art — the right call for brand fidelity.
- **Net-new only:** chakra crystal lights, particle textures, possibly a cloud layer. The old "Blue Lake ferry crossing" beat is **dropped** for Book One (it's a Book-Two teaser) — saves a fully-generated scene.
