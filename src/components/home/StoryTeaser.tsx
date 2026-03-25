"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const pageVariants: Variants = {
  enter: (d: number) => ({
    rotateY: d > 0 ? 45 : -45,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
  },
  exit: (d: number) => ({
    rotateY: d > 0 ? -45 : 45,
    opacity: 0,
  }),
};

const PAGES = [
  {
    left: {
      type: "illustration" as const,
      caption: "The old apple tree at the bottom of the garden",
      gradient: "from-forest/10 via-gold/5 to-parchment-dark",
    },
    right: {
      text: `"Every child has a voice," Poppa Stan would say, settling into his old chair beneath the apple tree. "Some voices are loud, like a lion's roar. Some are quiet, like a whisper on the wind. But every single one matters."`,
      page: 1,
    },
  },
  {
    left: {
      type: "illustration" as const,
      caption: "Rory places his hand on the knobbly trunk",
      gradient: "from-gold/15 via-gold-light/5 to-parchment-dark",
    },
    right: {
      text: `Rory pressed his small hand against the knobbly bark and felt something warm, like a heartbeat. The golden door began to glow — softly at first, then brighter and brighter, until the whole garden was bathed in light.`,
      page: 7,
    },
  },
  {
    left: {
      type: "illustration" as const,
      caption: "The golden hills of Angelica stretch to the horizon",
      gradient: "from-sky-lavender/15 via-gold/5 to-parchment-dark",
    },
    right: {
      text: `Beyond the door, golden hills rolled endlessly under a lavender sky. Rory, Riley, and Tilly stood at the edge of a world that smelled of honey and starlight. "Welcome to Angelica," said a voice as soft as feathers.`,
      page: 12,
    },
  },
  {
    left: {
      type: "illustration" as const,
      caption: "Angel Alina reaches out her hand",
      gradient: "from-mist-blue/15 via-crystal/5 to-parchment-dark",
    },
    right: {
      text: `Alina's wings shimmered with every colour of the sunrise. She knelt before Rory and placed her hand over his heart. "Your voice is not lost," she whispered. "It is here, waiting for you to be brave enough to use it."`,
      page: 18,
    },
  },
];

export default function StoryTeaser() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToPage = (index: number) => {
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  };

  const nextPage = () => {
    if (currentPage < PAGES.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const page = PAGES[currentPage];

  return (
    <SectionContainer>
      <SectionHeading
        title="A Peek Inside"
        subtitle="Turn the pages and begin the journey"
      />
      <Reveal>
        <div className="max-w-4xl mx-auto">
          {/* Book container */}
          <div
            className="relative bg-parchment-dark rounded-2xl shadow-card overflow-hidden"
            style={{ perspective: "1200px" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.8, 0.25, 1],
                }}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                {/* Left page — illustration placeholder */}
                <div
                  className={`relative aspect-[4/5] md:aspect-auto md:min-h-[400px] bg-gradient-to-br ${page.left.gradient} flex items-center justify-center p-8`}
                >
                  {/* Decorative frame */}
                  <div className="absolute inset-4 border border-gold/10 rounded-lg" />
                  <div className="text-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded-xl bg-parchment/40 border border-gold/10 flex items-center justify-center">
                      <svg
                        viewBox="0 0 48 48"
                        className="w-12 h-12 text-gold/30"
                        fill="none"
                      >
                        <rect
                          x="6"
                          y="10"
                          width="36"
                          height="28"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="18"
                          cy="22"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 32 L16 24 L24 30 L34 20 L42 28"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="font-accent text-bark-muted text-sm italic">
                      {page.left.caption}
                    </p>
                  </div>
                </div>

                {/* Right page — text */}
                <div className="relative p-8 md:p-12 flex flex-col justify-center bg-parchment">
                  {/* Page number */}
                  <span className="absolute top-4 right-6 text-xs text-bark-muted font-accent">
                    Page {page.right.page}
                  </span>

                  {/* Text */}
                  <blockquote className="text-bark-light text-base md:text-lg leading-relaxed font-serif italic">
                    {page.right.text}
                  </blockquote>

                  {/* Book spine shadow */}
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-bark/[0.04] to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-sm text-bark-muted hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <span className="flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10 3L5 8L10 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </span>
            </button>

            {/* Page dots */}
            <div className="flex gap-2">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "bg-gold w-6"
                      : "bg-bark-muted/30 hover:bg-bark-muted/50"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === PAGES.length - 1}
              className="text-sm text-bark-muted hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <span className="flex items-center gap-1.5">
                Next
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button href="/buy" variant="secondary">
              Read the Full Story
            </Button>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
