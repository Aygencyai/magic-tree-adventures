"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import Reveal from "@/components/ui/Reveal";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

const REVIEWS = [
  {
    quote:
      "My daughter asked me to read it three times in a row. She wants to find the Crystal Mountain herself now.",
    author: "Sarah M.",
    role: "Parent of Lily, age 6",
    stars: 5,
  },
  {
    quote:
      "A beautiful, gentle story that introduces mindfulness to children without them even realising. The chakra thread is so cleverly woven in.",
    author: "James T.",
    role: "Primary school teacher",
    stars: 5,
  },
  {
    quote:
      "The illustrations are stunning and the story had my boys completely captivated. We talk about our chakras at bedtime now.",
    author: "Emma R.",
    role: "Parent of twin boys, age 7",
    stars: 5,
  },
  {
    quote:
      "I cried at the dedication. This book is clearly made with so much love. A new family favourite.",
    author: "Priya K.",
    role: "Parent and yoga instructor",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < count ? "#C8963E" : "none"}
          className={i < count ? "text-gold" : "text-bark-muted/20"}
        >
          <path
            d="M8 1.5L9.85 5.25L14 5.87L11 8.8L11.7 13L8 11.05L4.3 13L5 8.8L2 5.87L6.15 5.25L8 1.5Z"
            stroke={i < count ? "#C8963E" : "currentColor"}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <SectionContainer>
      <SectionHeading
        title="What Families Are Saying"
        subtitle="Stories from readers who stepped through the golden door"
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {REVIEWS.map((review, i) => (
          <Reveal key={review.author} delay={i * 0.1}>
            <div className="bg-parchment-dark rounded-2xl p-6 md:p-8 h-full flex flex-col">
              <StarRating count={review.stars} />
              <blockquote className="mt-4 text-bark-light text-sm md:text-base leading-relaxed flex-1 italic">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="mt-4 pt-4 border-t border-gold/[0.08]">
                <p className="font-heading text-sm font-semibold text-bark">
                  {review.author}
                </p>
                <p className="text-xs text-bark-muted mt-0.5">
                  {review.role}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
