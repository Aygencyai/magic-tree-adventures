# The Magic Tree Adventures — Website Plan

## Context

"The Magic Tree Adventures: Journey to the Crystal Mountain" is a children's book (Book One of a series) about three siblings — Rory, Riley, and Tilly — who discover a magic apple tree that opens a portal to Angelica, a land of angels and chakras. The book is deeply personal, based on Poppa Stan's stories told to the family since 1964, dedicated to his memory after passing in 2021. Written by Jools Abrams, with spiritual guidance from Sara Oberman Babai, illustrated by Alejandra Barajas.

The website needs to feel like stepping into the book itself — a living storybook, not a marketing page. Parents are the buyers; children are the audience. The spiritual/chakra angle is the unique differentiator no other children's book site has.

---

## Creative Direction: "The Living Storybook"

Every scroll is a step deeper into Angelica. Think Studio Ghibli meets premium picture book publishing. Warm, magical, gently spiritual — not saccharine or garish. The seven chakra colours weave through as a thread, culminating in an interactive Chakra Explorer.

---

## Tech Stack

| Tool | Choice |
|------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animations | Framer Motion |
| Fonts | next/font/google (Fraunces, Nunito, Caveat) |
| Forms | React Hook Form + Zod |
| Email | Resend (newsletter) |
| Icons | Lucide React (minimal) |
| Package manager | pnpm |
| Deployment | Vercel |

No Three.js needed — all effects achievable with Framer Motion + CSS (lighter, more performant).

---

## Colour Palette

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| parchment | #FDF6EC | Primary background (60%+) — warm storybook paper |
| parchment-dark | #F5E6CC | Section alternates, card backgrounds |
| bark | #3D2B1F | Primary text — deep warm brown |
| bark-light | #5C4033 | Secondary text |
| bark-muted | #8B7355 | Tertiary/caption text |
| gold | #C8963E | Primary accent — CTAs, the golden door, borders |
| gold-light | #E8C778 | Glows and highlights |
| gold-dark | #A07830 | Hover states |
| sky-lavender | #C8B8E8 | Atmospheric gradients |
| cloud-pink | #F4C2D0 | Warmth accents (sparingly) |
| forest | #2D5A3D | Dark sections, footer |
| forest-dark | #1A3A28 | Darkest background |
| crystal | #5B8FD4 | Crystal apples, Rory's journey |
| mist-blue | #B8D4F0 | Alina's blue mist |

### Chakra Accents (used in Chakra Explorer + decorative rainbow only)

| Chakra | Hex |
|--------|-----|
| Root | #E05555 |
| Sacral | #F0923E |
| Solar Plexus | #F0D03E |
| Heart | #5DBB63 |
| Throat | #5B8FD4 |
| Third Eye | #8B5DC8 |
| Crown | #D4B8F0 |

---

## Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Hero heading | Fraunces | 64px (lg) / 44px (md) / 32px (sm) | 700 |
| Section heading | Fraunces | 44px | 600 |
| Subheading | Fraunces | 24px | 500 |
| Body | Nunito | 17px | 400 |
| Handwritten accent | Caveat | 22px | 700 |
| Character dialogue | Caveat | 20px | 400 |
| Nav links | Nunito | 14px, uppercase, tracking 0.08em | 600 |
| Button text | Nunito | 14px, uppercase, tracking 0.1em | 700 |

---

## Pages (5 total)

1. **Homepage** (`/`) — The hero experience, sells through wonder
2. **The Story** (`/story`) — Synopsis, world, characters, journey map
3. **The Chakras** (`/chakras`) — Interactive scrollytelling chakra explorer
4. **About** (`/about`) — Poppa Stan's legacy, the creative team
5. **Buy** (`/buy`) — Purchase links, reviews, gift positioning

---

## Homepage Sections (10 sections)

### 1. Hero — "Through the Golden Door"
Full-viewport parallax scene with layered illustrations:
- Background: Lavender-to-cream sky gradient + floating candy-floss clouds (0.2x scroll)
- Midground: Golden hills + green valleys (0.5x scroll)
- Foreground: The old apple tree with glowing golden door (0.8x scroll)
- Content: Title (Fraunces) → tagline (Caveat) → description (Nunito) → two CTAs
- Golden particles float across the scene
- On scroll: text fades, golden door opens, light floods → transitions to next section

### 2. The World Awaits — "Knock on the Tree"
Interactive apple tree with golden door. Hover = door glows. Click = door opens with golden light wipe transitioning to Angelica.

### 3. Welcome to Angelica
Full-width panoramic illustration. Three vignettes (golden hills, lake, Crystal Mountain) with TiltCard hover.

### 4. Meet the Adventurers
Character cards with personality animations:
- Rory: gentle vibration (finding his voice)
- Riley: playful bounce (fearless)
- Tilly: composed glow (responsible)
- Alina: floating blue mist
- Gino: oversized, tiny fluttering wings
Cards flip on click for character details.

### 5. The Chakra Thread
Rainbow bar showing 7 colours. Brief intro to how the book weaves chakras into adventure. CTA → /chakras.

### 6. Story Teaser — Page Turn
3-4 "pages" with CSS perspective page-flip effect. Illustrations on facing pages. "Read the rest..." → /buy.

### 7. The People Behind the Magic
Author cards (Jools, Sara, Alejandra). Poppa Stan story as emotional anchor.

### 8. Reviews / Social Proof
Testimonials, star ratings, press mentions.

### 9. Newsletter Signup
"Join the Adventure" — email signup for Book Two updates, activities. Crystal apple illustration.

### 10. Footer
Forest-dark background. Nav, socials, purchase link. "Dedicated to Poppa Stan" in Caveat italic.

---

## The Chakras Page — Scrollytelling

Full-viewport sections for each of the 7 chakras (Root → Crown). Each section:
- Pulsing colour orb
- Child-friendly explanation
- Connection to the story
- "Try this at home" mini-activity
- Progressive rainbow building in a fixed sidebar

This is the shareable feature — parents send to parents, teachers use in classrooms.

---

## Three Signature Features

### 1. Interactive Chakra Explorer
The scrollytelling `/chakras` page described above.

### 2. "Knock on the Tree" Interaction
The golden door that opens on click with light flooding out — encapsulates the entire book premise.

### 3. Character Cards with Personality
Each character's card has a unique animation matching their personality — makes the characters feel alive.

---

## Animations (adapted from aygency-site)

**Reuse & adapt:**
- `Reveal` → scroll-triggered fade-up (softer easing: `[0.25, 0.8, 0.25, 1]`)
- `staggerContainer` / `fadeUp` → character cards, section reveals
- `TypewriterText` → hero tagline (50ms, gold cursor)
- `GlowOrb` → golden orbs and mist effects
- `MagneticButton` → CTA buttons (playful feel)
- `TiltCard` → character cards, book showcase (gold glow)

**New builds:**
- `FloatingParticles` — CSS-only golden sparkle drift
- `ParallaxLayer` + `useParallaxLayers` hook — multi-layer scroll parallax
- `GoldenDoor` — SVG door with open animation + golden light
- `PageTurn` — CSS perspective page-flip
- `ChakraExplorer` — scrollytelling with progress tracking
- `CrystalShimmer` — CSS animated gradient shimmer

---

## Content Needed from Client

1. **Illustration assets** (high-res PNGs, transparent) — tree, characters, landscapes, book cover
2. **Parallax-ready assets** — separated foreground/midground/background layers
3. **Book excerpt** — 2-3 pages for the page-turn teaser
4. **Author bios and photos** — Jools, Sara, Alejandra
5. **Purchase links** — Amazon, Waterstones, independent shops
6. **Reviews/endorsements** — early reader testimonials
7. **Age-appropriate chakra descriptions** — Sara's child-friendly explanations

---

## Build Phases

| Phase | Scope |
|-------|-------|
| 0 | Scaffolding — project init, CLAUDE.md, Tailwind config, fonts, layout, Nav, Footer |
| 1 | Homepage Hero + Core UI — parallax hero, Reveal/Button adapted from aygency-site, FloatingParticles |
| 2 | Homepage Sections — GoldenDoor, CharacterCards, ChakraTeaser, StoryTeaser, Newsletter |
| 3 | Story Page — journey map, character deep dives, synopsis, excerpt |
| 4 | Chakra Explorer — scrollytelling, orbs, progress rainbow, all 7 sections |
| 5 | About + Buy — author bios, Poppa Stan, purchase page, reviews |
| 6 | Polish — responsive (1440/1024/768/375), performance, SEO, OG images, accessibility, Lighthouse 90+ |

---

## Key Files to Adapt from aygency-site

- `src/components/ui/Reveal.tsx` — core scroll animation
- `src/lib/animations.ts` — variants and easing (soften for children's brand)
- `src/components/home/Hero.tsx` — hero architecture reference
- `src/components/effects/GlowOrb.tsx` → adapt to GoldenGlow
- `src/app/layout.tsx` — root layout pattern for fonts/metadata

---

## Architecture

```
projects/magic-tree/
├── CLAUDE.md
├── .claude/commands/
│   ├── verify.md
│   └── design-audit.md
├── docs/build-plan.md
├── public/
│   ├── illustrations/ (hero/, characters/, landscapes/, misc/)
│   ├── book/
│   └── team/
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, globals.css
│   │   ├── story/page.tsx
│   │   ├── chakras/page.tsx
│   │   ├── about/page.tsx
│   │   ├── buy/page.tsx
│   │   ├── robots.ts, sitemap.ts
│   │   └── api/newsletter/route.ts
│   ├── components/
│   │   ├── layout/ (Nav, Footer)
│   │   ├── home/ (Hero, HeroParallax, GoldenDoor, CharacterCards, ChakraTeaser, StoryTeaser, Creators, Reviews, Newsletter)
│   │   ├── story/ (JourneyMap, CharacterDeepDive)
│   │   ├── chakras/ (ChakraExplorer, ChakraOrb, ChakraProgress, ChakraSection)
│   │   ├── effects/ (FloatingParticles, GoldenGlow, CrystalShimmer, ParallaxLayer, PageTurn)
│   │   └── ui/ (Reveal, MagneticButton, TiltCard, Button, SectionContainer, SectionHeading)
│   ├── lib/
│   │   ├── animations.ts, constants.ts, utils.ts
│   │   └── hooks/useParallaxLayers.ts
│   └── types/index.ts
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
└── .gitignore
```

---

## Verification

```bash
pnpm build
```
Visual check at: 1440px, 1024px, 768px, 375px
Run after every significant change. Zero errors = good.
