import type { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";
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

export default function BuyPage() {
  return (
    <>
      {/* Book Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gold/[0.06] to-parchment">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Book cover placeholder */}
            <Reveal className="shrink-0">
              <div className="relative">
                <div className="w-64 h-80 md:w-80 md:h-[26rem] rounded-2xl bg-parchment-dark shadow-card-hover flex flex-col items-center justify-center overflow-hidden">
                  {/* Decorative cover elements */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.06] to-transparent" />
                  <div className="relative text-center px-6">
                    <p className="font-accent text-gold text-sm mb-2">
                      The Magic Tree Adventures
                    </p>
                    <p className="font-heading text-xl md:text-2xl font-bold text-bark leading-tight">
                      Journey to the Crystal Mountain
                    </p>
                    <div className="flex justify-center gap-1 mt-4">
                      {CHAKRAS.map((c) => (
                        <div
                          key={c.name}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: c.colour }}
                        />
                      ))}
                    </div>
                    <p className="text-bark-muted text-xs mt-6">
                      Book cover image
                    </p>
                  </div>
                </div>
                {/* Shadow underneath */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-bark/[0.06] rounded-full blur-xl" />
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
        </div>
      </section>

      {/* What's Inside */}
      <SectionContainer className="bg-parchment-dark">
        <SectionHeading title="What&rsquo;s Inside" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {FEATURES.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="bg-parchment rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full">
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
      </SectionContainer>

      {/* Reviews */}
      <Reviews />

      {/* Perfect Gift */}
      <SectionContainer className="bg-parchment-dark">
        <SectionHeading
          title="The Perfect Gift"
          subtitle="For every child who deserves to feel heard"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {GIFT_IDEAS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="bg-parchment rounded-2xl p-6 shadow-card h-full">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
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
      </SectionContainer>

      {/* Quote */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <blockquote className="font-accent text-2xl md:text-3xl text-gold leading-relaxed">
              &ldquo;Every child has a voice. Some voices are loud, like a
              lion&rsquo;s roar. Some are quiet, like a whisper on the wind. But
              every single one matters.&rdquo;
            </blockquote>
            <p className="text-bark-muted text-sm mt-4">
              &mdash; Poppa Stan
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Read the Full Story
              </Button>
            </div>
          </Reveal>
        </div>
      </SectionContainer>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
