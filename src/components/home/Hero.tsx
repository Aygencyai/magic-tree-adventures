"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingParticles from "@/components/effects/FloatingParticles";
import GoldenGlow from "@/components/effects/GoldenGlow";
import HeroScene from "@/components/home/HeroScene";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import { smoothEase } from "@/lib/animations";

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.12, ease: smoothEase },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -60]);

  const titleWords = "The Magic Tree Adventures".split(" ");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax illustrated scene */}
      <HeroScene />

      {/* Golden glow accents */}
      <GoldenGlow
        size={500}
        opacity={0.08}
        className="absolute top-[10%] left-[-10%] pointer-events-none"
      />
      <GoldenGlow
        size={400}
        opacity={0.06}
        className="absolute bottom-[5%] right-[-5%] pointer-events-none"
      />

      {/* Floating golden particles */}
      <FloatingParticles count={20} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24"
      >
        {/* Title — word-by-word reveal */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-[64px] font-bold text-bark leading-[1.05]">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="inline-block mr-[0.3em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle — Caveat typewriter feel */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: smoothEase }}
          className="mt-6 font-accent text-xl md:text-2xl text-gold"
        >
          Journey to the Crystal Mountain
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: smoothEase }}
          className="mt-6 text-lg md:text-xl text-bark-light max-w-2xl mx-auto leading-relaxed"
        >
          A magical story about finding your voice, discovering your inner
          light, and the adventure of a lifetime.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8, ease: smoothEase }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton>
            <Button href="/story">Explore the Story</Button>
          </MagneticButton>
          <MagneticButton>
            <Button href="/buy" variant="secondary">
              Buy the Book
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-bark-muted tracking-widest uppercase">
              Scroll to explore
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gold"
            >
              <path
                d="M10 4 L10 14 M5 10 L10 15 L15 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
