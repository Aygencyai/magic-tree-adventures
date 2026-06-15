# The Magic Tree Adventures — Children's Book Website

A magical, immersive website for "The Magic Tree Adventures: Journey to the Crystal Mountain" — a children's book series about three siblings who discover a magic apple tree that opens a portal to Angelica, a land of angels and chakras.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 + CSS custom properties in globals.css
- **Animations:** Framer Motion for UI/overlay motion. **WebGL via vanilla Three.js (NOT React Three Fiber) is permitted for the immersive experience layer** — see `src/experience/`. Postprocessing from `three/examples/jsm`. Smooth scroll via Lenis. Do not introduce GSAP or R3F (see Gotchas for why R3F is out).
- **Fonts:** Fraunces (headings), Nunito (body/UI), Caveat (handwritten accents) — loaded via next/font/google
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend (newsletter signups)
- **Icons:** Lucide React (minimal usage — mostly custom illustration)
- **Package manager:** pnpm
- **Deployment:** Vercel

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (run after every significant change)
- `pnpm lint` — run linter

## Design System

### Colour Palette

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| parchment | #FDF6EC | bg-parchment | Primary background (60%+) — warm storybook paper |
| parchment-dark | #F5E6CC | bg-parchment-dark | Section alternates, card backgrounds |
| bark | #3D2B1F | text-bark | Primary text — deep warm brown |
| bark-light | #5C4033 | text-bark-light | Secondary/body text |
| bark-muted | #8B7355 | text-bark-muted | Tertiary/caption text |
| gold | #C8963E | bg-gold, text-gold | Primary accent — CTAs, borders, the golden door |
| gold-light | #E8C778 | text-gold-light | Glows and highlights |
| gold-dark | #A07830 | bg-gold-dark | Hover states on gold elements |
| sky-lavender | #C8B8E8 | bg-sky-lavender | Atmospheric gradients |
| cloud-pink | #F4C2D0 | bg-cloud-pink | Warmth accents (sparingly) |
| forest | #2D5A3D | bg-forest | Dark sections |
| forest-dark | #1A3A28 | bg-forest-dark | Footer, darkest backgrounds |
| crystal | #5B8FD4 | text-crystal | Crystal apples, Rory's journey |
| mist-blue | #B8D4F0 | bg-mist-blue | Alina's blue mist |

**Chakra accents** (Chakra Explorer + decorative rainbow only):
Root #E05555, Sacral #F0923E, Solar Plexus #F0D03E, Heart #5DBB63, Throat #5B8FD4, Third Eye #8B5DC8, Crown #D4B8F0

**Critical rules:**
- Parchment (#FDF6EC) is the dominant background — warm storybook feel
- Gold (#C8963E) is the primary accent — buttons, highlights, the golden door motif
- Bark (#3D2B1F) for headings, bark-light (#5C4033) for body text
- Forest-dark (#1A3A28) for contrast sections and footer
- Chakra colours appear only in the Chakra Explorer and as rainbow accents
- Never use pure white (#FFFFFF) or pure black (#000000)

### Typography

| Element | Font | Size | Weight | Transform |
|---------|------|------|--------|-----------|
| Hero heading | Fraunces | 64px (lg) / 44px (md) / 32px (sm) | 700 | — |
| Section heading | Fraunces | 44px (2.75rem) | 600 | — |
| Subheading | Fraunces | 24px | 500 | — |
| Body | Nunito | 17px | 400 | — |
| Body large | Nunito | 20px | 400 | — |
| Handwritten accent | Caveat | 22px | 700 | — |
| Character dialogue | Caveat | 20px | 400 | — |
| Nav links | Nunito | 14px | 600 | uppercase, tracking 0.08em |
| Button text | Nunito | 14px | 700 | uppercase, tracking 0.1em |

### Buttons

- **Primary:** bg-gold, text-parchment, rounded-full, px-8 py-3.5, uppercase, tracked, font-sans font-bold. Hover: bg-gold-dark, shadow-glow-gold-sm
- **Secondary:** border-2 border-gold/40, bg-transparent, text-gold, rounded-full. Hover: border-gold, bg-gold/[0.05]

### Animation Conventions

- All scroll animations: Framer Motion `whileInView` with `once: true`, viewport margin `"-80px"`
- Easing: `[0.25, 0.8, 0.25, 1]` (softer than aygency-site for a children's brand)
- Stagger: 100-120ms between sibling elements
- Standard entrance: `y: 40, opacity: 0` → `y: 0, opacity: 1`, duration 0.7s
- Spring config: stiffness 260, damping 28
- Character float: `y: [0, -8, 0]` infinite at 3-5s duration

### Spacing

- Section padding: `py-16 md:py-24 lg:py-32` (via `.section-padding`)
- Container: `max-w-7xl mx-auto px-6 lg:px-12`
- Card padding: `p-6` or `p-8`
- Card border-radius: `rounded-2xl`

## Architecture

```
src/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx           # Root layout — fonts, metadata, Nav, Footer, MotionProvider
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Tailwind + CSS custom properties (warm palette)
│   ├── story/page.tsx       # The Story — synopsis, characters, journey
│   ├── chakras/page.tsx     # Interactive Chakra Explorer
│   ├── about/page.tsx       # About — Poppa Stan, creative team
│   ├── buy/page.tsx         # Purchase page
│   ├── robots.ts, sitemap.ts
│   └── api/newsletter/      # Resend newsletter signup
├── components/
│   ├── layout/              # Nav, Footer
│   ├── home/                # Homepage sections (Hero, GoldenDoor, CharacterCards, etc.)
│   ├── story/               # Story page components (JourneyMap, CharacterDeepDive)
│   ├── chakras/             # Chakra Explorer components (ChakraOrb, ChakraProgress, etc.)
│   ├── effects/             # CSS/Framer visual effects (FloatingParticles, GoldenGlow, CrystalShimmer, ParallaxLayer, PageTurn)
│   └── ui/                  # Reusable primitives (Reveal, Button, SectionContainer, SectionHeading, MagneticButton, TiltCard)
├── experience/             # WebGL immersive layer (Three.js/R3F) — reusable 3D module, dynamically imported per page (SSR-disabled). Any page may opt in; pages that don't use it load zero 3D.
├── lib/
│   ├── animations.ts        # Shared animation variants (softer easing)
│   ├── constants.ts         # Characters, chakras, creators, nav links — DO NOT MODIFY without asking
│   ├── utils.ts             # cn helper
│   └── hooks/               # Custom hooks (useParallaxLayers)
└── types/                   # TypeScript interfaces — DO NOT MODIFY without asking
```

## Protected Files (Don't Touch)

DO NOT MODIFY these files unless explicitly instructed:
- `src/lib/constants.ts` — all content data (characters, chakras, creators)
- `src/types/index.ts` — TypeScript type definitions
- `src/app/api/newsletter/route.ts` — API route

## Gotchas

- This project uses `Fraunces` as the heading font (not Space Grotesk like aygency-site). It is a wonky old-style serif — do not replace it.
- `Caveat` is used only for handwritten accents and character dialogue. Do not use it for body text or navigation.
- The animation easing is `[0.25, 0.8, 0.25, 1]` — softer than aygency-site's `[0.16, 1, 0.3, 1]`. Do not use the aygency easing.
- Buttons are `rounded-full` (pill shape), not `rounded-lg` like aygency-site. This is deliberate for the whimsical feel.
- The `glass-warm` and `glass-warm-strong` utilities use parchment-tinted blur, not the dark blur from aygency-site.
- WebGL/Three.js lives **only** in `src/experience/` (a reusable, opt-in 3D module, dynamically imported with SSR disabled). It powers the immersive homepage journey and is the *delivery* layer for warm painterly art — never the look itself. Inner content pages stay Framer Motion + CSS so they load light and stay SEO-clean; they can opt into the 3D module if a specific moment needs it (e.g. a 3D chakra crystal), but never load it by default.
- **Do NOT use React Three Fiber (R3F) here.** R3F v9 (the only version supporting React 19) is incompatible with this project's Next 14.2 App Router runtime: its reconciler reads React client internals Next 14 doesn't expose, crashing the canvas at module-eval with `Cannot read properties of undefined (reading 'S')`. Pinning React 19.1 and `transpilePackages` both failed to fix it. The experience layer uses **vanilla Three.js** (imperative `useEffect` + `requestAnimationFrame`), which has no react-reconciler and sidesteps the issue entirely. Revisit R3F only if the project moves to Next 15.
- The Three.js render loop drives the camera from Lenis scroll progress + pointer; scenes are 2.5D displaced planes (illustration + depth map). The `/experience` route hosts the full 9-beat immersive journey (Phase 3); it replaces the homepage in Phase 4 (see `docs/immersive-build-plan.md`).
- **The `/experience` overlay layer (`src/experience/JourneyOverlays.tsx`) is deliberately NOT Framer Motion.** `motion.*` components invoke Framer's WAAPI accelerated path, which throws a benign-but-noisy `"Failed to execute 'animate' … Offsets must be monotonically non-decreasing"` TypeError on first paint when its scroll-linked values race the unmeasured scroll range (every load; not fixed by `times`/yoyo/CSS-converting the floats/deferred-mount/`ssr:false`). The beat-synced overlays are pure scroll→style mappings, so they use a single rAF loop writing `opacity`/`transform` straight to plain elements via `data-*` hooks — no WAAPI, zero console errors, and ~58 kB lighter (framer-motion out of the route chunk). Autonomous floats (cameos, scroll-hint) use the globals `float`/`gentle-bob` CSS keyframes (auto-neutralised by the global `prefers-reduced-motion` rule). Framer Motion is still fine on the inner content pages.
- **Tailwind `content` globs must include `./src/experience/**`.** It's a separate top-level dir from `app`/`components`; if omitted, every class used *only* in the experience layer (`bottom-[11vh]`, `right-[6vw]`, `glass-warm`, arbitrary shadows…) is purged and overlays mis-render (copy stuck top-left, no card). Already wired in `tailwind.config.ts` — keep it when editing the config.
- The site uses `next/font/google` for font loading — do NOT use `<link>` tags or `@import`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| RESEND_API_KEY | Resend API for newsletter signups |
| NEWSLETTER_FROM_EMAIL | Sender email for newsletter |

## Verification

```bash
pnpm build
```
Visual check at: 1440px, 1024px, 768px, 375px
Run after every significant change. Zero errors = good. If the build fails, fix before moving on.
