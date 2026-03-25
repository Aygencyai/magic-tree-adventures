# The Magic Tree Adventures — Children's Book Website

A magical, immersive website for "The Magic Tree Adventures: Journey to the Crystal Mountain" — a children's book series about three siblings who discover a magic apple tree that opens a portal to Angelica, a land of angels and chakras.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 + CSS custom properties in globals.css
- **Animations:** Framer Motion — do not introduce GSAP or any other animation library
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
│   ├── effects/             # Visual effects (FloatingParticles, GoldenGlow, CrystalShimmer, ParallaxLayer, PageTurn)
│   └── ui/                  # Reusable primitives (Reveal, Button, SectionContainer, SectionHeading, MagneticButton, TiltCard)
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
- No Three.js in this project. All visual effects are Framer Motion + CSS.
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
