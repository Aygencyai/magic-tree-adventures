import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";
import Experience from "@/experience/Experience";
import PainterlyBand from "@/components/tail/PainterlyBand";
import { BUY_JOURNEY } from "@/experience/engine/scenes";
import { CHAKRAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Buy the Book",
  description:
    "Get your copy of The Magic Tree Adventures: Journey to the Crystal Mountain. Available from Amazon, Waterstones, and your local bookshop.",
};

const FEATURES = [
  {
    label: "Beautiful illustrations",
    description: "Full-colour artwork on every page by Alejandra Barajas",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="3"
          stroke="#C8963E"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="14" r="3" stroke="#C8963E" strokeWidth="1.5" />
        <path
          d="M4 22l6-5 4 3 6-7 8 9"
          stroke="#C8963E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "7 chakras explained",
    description: "Child-friendly introductions to each energy centre",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path
          d="M16 4v24"
          stroke="#C8963E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[6, 10, 14, 18, 22, 26].map((y, i) => (
          <circle
            key={i}
            cx="16"
            cy={y}
            r="2.5"
            stroke="#C8963E"
            strokeWidth="1.2"
            fill={`${["#E05555", "#F0923E", "#F0D03E", "#5DBB63", "#5B8FD4", "#8B5DC8"][i]}30`}
          />
        ))}
      </svg>
    ),
  },
  {
    label: "Teaches mindfulness",
    description: "Woven naturally into the adventure, never preachy",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="10" stroke="#C8963E" strokeWidth="1.5" />
        <path
          d="M16 10c-3 2-3 5 0 6 3-1 3-4 0-6z"
          stroke="#C8963E"
          strokeWidth="1.5"
          fill="#C8963E"
          fillOpacity="0.1"
        />
        <path
          d="M16 22c-3-2-3-5 0-6 3 1 3 4 0 6z"
          stroke="#C8963E"
          strokeWidth="1.5"
          fill="#C8963E"
          fillOpacity="0.1"
        />
      </svg>
    ),
  },
  {
    label: "Ages 4\u201310",
    description: "Perfect for bedtime reading and independent readers",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path
          d="M4 6h10l2 2 2-2h10v20H18l-2 2-2-2H4V6z"
          stroke="#C8963E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M16 8v20" stroke="#C8963E" strokeWidth="1.5" />
        <path
          d="M8 12h4M8 16h4M20 12h4M20 16h4"
          stroke="#C8963E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const GIFT_IDEAS = [
  {
    title: "Birthdays & holidays",
    description:
      "A meaningful gift that children return to again and again. Beautiful enough for any bookshelf.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold">
        <rect
          x="3"
          y="10"
          width="18"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 10V3M12 3c-2 0-4 2-4 4h4M12 3c2 0 4 2 4 4h-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 10v11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Mindful families",
    description:
      "For parents who want their children to understand emotions, confidence, and inner strength.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    title: "Schools & libraries",
    description:
      "A gentle way to introduce mindfulness, self-expression, and emotional awareness in the classroom.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold">
        <path
          d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/**
 * The Buy experience (Phase 6.3) — the immersive scroll journey frames the book
 * (hero → what's inside → review → "get your copy"), then releases into the
 * crawlable conversion tail. Per §6.3 the purchase action stays front-and-centre
 * and crawlable: the journey's close CTA jumps to `#buy`, and the buy panel
 * (cover, format, retailer links) is real SSR'd DOM — the experience frames the
 * buy action, it never buries it. Same engine as /, /chakras, /about.
 */
export default function BuyPage() {
  return (
    <>
      <Experience journey={BUY_JOURNEY} />

      {/* Grounded conversion tail — opaque, above the released sticky canvas.
          Real, prominent, crawlable purchase surface (SEO + reduced-motion). */}
      <div id="conversion-tail" className="relative z-20 bg-parchment">
        {/* Buy panel — the actual purchase action, anchored for the journey CTA */}
        <PainterlyBand
          id="buy"
          image="/scenes/web/beat7-crystal-mountain-arrival-16x9.webp"
          particles
          className="scroll-mt-24"
          innerClassName="max-w-5xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 glass-warm rounded-3xl p-8 md:p-10 shadow-[0_34px_80px_-34px_rgba(61,43,31,0.6)]">
            {/* Designed cover title-treatment (a stylised mark — not the real cover) */}
            <Reveal className="shrink-0">
              <div className="relative">
                <div className="relative w-60 h-80 md:w-72 md:h-[24rem] rounded-2xl overflow-hidden shadow-[0_24px_60px_-22px_rgba(61,43,31,0.6)] ring-1 ring-gold/30">
                  {/* warm painterly cover field */}
                  <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest-dark to-[#14301f]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(232,199,120,0.45),transparent_60%)]" />
                  {/* crystal-mountain motif */}
                  <svg
                    viewBox="0 0 120 90"
                    aria-hidden
                    className="absolute left-1/2 top-[34%] w-36 -translate-x-1/2 -translate-y-1/2 text-gold-light/90"
                  >
                    <path
                      d="M10 78 L38 30 L52 50 L60 18 L74 46 L86 26 L110 78 Z"
                      fill="currentColor"
                      fillOpacity="0.9"
                    />
                    <path d="M60 18 L74 46 L52 50 Z" fill="#fff" fillOpacity="0.5" />
                  </svg>
                  {/* inner gold frame */}
                  <div className="absolute inset-3 rounded-xl border border-gold/35" />
                  {/* type */}
                  <div className="absolute inset-x-0 top-7 text-center px-6">
                    <p className="font-accent text-gold-light text-sm">
                      The Magic Tree Adventures
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-9 text-center px-6">
                    <p className="font-heading text-xl md:text-2xl font-bold text-parchment leading-tight drop-shadow-[0_2px_8px_rgba(20,48,31,0.8)]">
                      Journey to the Crystal Mountain
                    </p>
                    <div className="flex justify-center gap-1.5 mt-3">
                      {CHAKRAS.map((c) => (
                        <div
                          key={c.name}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: c.colour,
                            boxShadow: `0 0 6px 1px ${c.colour}`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="absolute inset-x-0 bottom-3.5 text-center font-sans text-[0.6rem] uppercase tracking-[0.2em] text-parchment/60">
                    Book One
                  </p>
                </div>
                {/* Shadow underneath */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-bark/15 rounded-full blur-xl" />
              </div>
            </Reveal>

            {/* Book info */}
            <div className="flex-1">
              <Reveal>
                <p className="font-accent text-lg text-gold mb-2">
                  Book One of The Magic Tree Adventures
                </p>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-bark leading-[1.05]">
                  Journey to the Crystal Mountain
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-bark-light leading-relaxed">
                  A magical story about finding your voice, discovering your
                  inner light, and the adventure of a lifetime. Three siblings
                  step through a golden door into Angelica — and nothing will
                  ever be the same.
                </p>
                <p className="mt-3 text-sm text-bark-muted">
                  Written by Sara Oberman Babai &bull; Illustrated by Alejandra
                  Barajas
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <span className="text-xs font-semibold text-bark bg-parchment-dark rounded-full px-3 py-1">
                    Ages 4&ndash;10
                  </span>
                  <span className="text-xs font-semibold text-bark bg-parchment-dark rounded-full px-3 py-1">
                    48 pages
                  </span>
                  <span className="text-xs font-semibold text-bark bg-parchment-dark rounded-full px-3 py-1">
                    Full colour
                  </span>
                  <span className="text-xs font-semibold text-bark bg-parchment-dark rounded-full px-3 py-1">
                    Hardcover
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href="#">Buy on Amazon</Button>
                  <Button href="#" variant="secondary">
                    Buy on Waterstones
                  </Button>
                </div>
                <p className="mt-3 text-sm text-bark-muted">
                  Also available at your local independent bookshop.
                </p>
              </Reveal>
            </div>
          </div>
        </PainterlyBand>

        {/* What's Inside */}
        <PainterlyBand image="/scenes/web/beat4-angelica-reveal-16x9.webp">
          <SectionHeading title="What&rsquo;s Inside" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {FEATURES.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="glass-warm rounded-2xl p-6 text-center shadow-[0_18px_44px_-26px_rgba(61,43,31,0.5)] transition-transform duration-300 hover:-translate-y-1 h-full">
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <p className="text-sm text-bark font-semibold">
                    {item.label}
                  </p>
                  <p className="text-xs text-bark-muted mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </PainterlyBand>

        {/* Reviews */}
        <Reviews />

        {/* Perfect Gift */}
        <PainterlyBand image="/scenes/web/beat1-garden-16x9.webp" particles>
          <SectionHeading
            title="The Perfect Gift"
            subtitle="For every child who deserves to feel heard"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {GIFT_IDEAS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="glass-warm rounded-2xl p-6 shadow-[0_18px_44px_-26px_rgba(61,43,31,0.5)] transition-transform duration-300 hover:-translate-y-1 h-full">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-bark">
                    {item.title}
                  </h3>
                  <p className="text-bark-light text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </PainterlyBand>

        {/* Quote */}
        <PainterlyBand
          image="/scenes/web/beat2-glowing-tree-16x9.webp"
          innerClassName="max-w-3xl text-center"
        >
          <Reveal>
            <blockquote className="font-accent text-2xl md:text-3xl text-gold-dark leading-relaxed">
              &ldquo;Every child has a voice. Some voices are loud, like a
              lion&rsquo;s roar. Some are quiet, like a whisper on the wind. But
              every single one matters.&rdquo;
            </blockquote>
            <p className="text-bark-muted text-sm mt-4">&mdash; Poppa Stan</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Read the Full Story
              </Button>
            </div>
          </Reveal>
        </PainterlyBand>

        {/* Newsletter */}
        <Newsletter />
      </div>
    </>
  );
}
