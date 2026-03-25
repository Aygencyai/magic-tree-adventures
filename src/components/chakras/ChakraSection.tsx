"use client";

import { motion } from "framer-motion";
import ChakraOrb from "./ChakraOrb";

interface ChakraSectionProps {
  chakra: {
    name: string;
    sanskrit: string;
    colour: string;
    location: string;
    meaning: string;
    childFriendly: string;
    storyConnection: string;
    tryThis: string;
    featured?: boolean;
  };
  index: number;
  isActive: boolean;
}

export default function ChakraSection({
  chakra,
  index,
  isActive,
}: ChakraSectionProps) {
  const slug = chakra.name.toLowerCase().replace(/\s+/g, "-");
  const isEven = index % 2 === 0;

  return (
    <section
      id={`chakra-${slug}`}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        background: isEven
          ? `linear-gradient(135deg, #FDF6EC 0%, ${chakra.colour}08 50%, #FDF6EC 100%)`
          : `linear-gradient(135deg, #F5E6CC 0%, ${chakra.colour}08 50%, #F5E6CC 100%)`,
      }}
    >
      {/* Background decorative orb — very subtle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 600,
          maxHeight: 600,
          right: isEven ? "-10%" : "auto",
          left: isEven ? "auto" : "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          background: `radial-gradient(circle, ${chakra.colour}06 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 md:py-24 w-full">
        <div
          className={`flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-12 md:gap-16`}
        >
          {/* Orb side */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <ChakraOrb
              colour={chakra.colour}
              isActive={isActive}
              name={chakra.name}
            />
          </motion.div>

          {/* Content side */}
          <div className="flex-1 max-w-xl">
            {/* Number badge */}
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-parchment"
                style={{ backgroundColor: chakra.colour }}
              >
                {index + 1}
              </span>
              <span className="text-sm text-bark-muted tracking-wide uppercase font-sans">
                {chakra.sanskrit}
              </span>
              {chakra.featured && (
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${chakra.colour}15`,
                    color: chakra.colour,
                  }}
                >
                  Rory&apos;s Chakra
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-bark mb-2 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              {chakra.name}{" "}
              <span style={{ color: chakra.colour }}>Chakra</span>
            </motion.h2>

            {/* Location & meaning */}
            <motion.p
              className="font-accent text-lg mb-6"
              style={{ color: chakra.colour }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              {chakra.location} &mdash; &ldquo;{chakra.meaning}&rdquo;
            </motion.p>

            {/* Child-friendly explanation */}
            <motion.p
              className="text-bark-light text-base md:text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              {chakra.childFriendly}
            </motion.p>

            {/* Story connection card */}
            <motion.div
              className="rounded-xl p-5 mb-4 border"
              style={{
                backgroundColor: `${chakra.colour}08`,
                borderColor: `${chakra.colour}18`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              <p className="text-sm font-semibold text-bark mb-1.5 flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4"
                  style={{ color: chakra.colour }}
                >
                  <path
                    d="M2 3h5l1 1 1-1h5v11h-5l-1 1-1-1H2V3z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 4v11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                In the story...
              </p>
              <p className="text-sm text-bark-light leading-relaxed">
                {chakra.storyConnection}
              </p>
            </motion.div>

            {/* Try this at home card */}
            <motion.div
              className="rounded-xl p-5 border"
              style={{
                backgroundColor: `${chakra.colour}0C`,
                borderColor: `${chakra.colour}20`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              <p
                className="text-sm font-semibold mb-1.5 flex items-center gap-2"
                style={{ color: chakra.colour }}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 5v3.5l2.5 1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Try this at home
              </p>
              <p className="text-sm text-bark-light leading-relaxed">
                {chakra.tryThis}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
