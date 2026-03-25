"use client";

import { motion } from "framer-motion";
import { CHAKRAS } from "@/lib/constants";

interface ChakraProgressProps {
  activeIndex: number;
}

export default function ChakraProgress({ activeIndex }: ChakraProgressProps) {
  return (
    <nav
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1"
      aria-label="Chakra navigation"
    >
      {CHAKRAS.map((chakra, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <a
            key={chakra.name}
            href={`#chakra-${chakra.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative flex items-center"
            aria-label={`${chakra.name} Chakra`}
            aria-current={isActive ? "step" : undefined}
          >
            {/* Tooltip */}
            <motion.span
              className="absolute right-full mr-3 whitespace-nowrap text-xs font-sans font-semibold rounded-full px-2.5 py-1 pointer-events-none"
              style={{
                backgroundColor: `${chakra.colour}20`,
                color: chakra.colour,
              }}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 5 }}
              transition={{ duration: 0.2 }}
            >
              {chakra.name}
            </motion.span>

            {/* Dot */}
            <motion.div
              className="rounded-full"
              style={{
                backgroundColor: isActive || isPast ? chakra.colour : `${chakra.colour}30`,
              }}
              animate={{
                width: isActive ? 14 : 8,
                height: isActive ? 14 : 8,
                boxShadow: isActive
                  ? `0 0 12px ${chakra.colour}60`
                  : "0 0 0px transparent",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            />

            {/* Connecting line to next dot */}
            {i < CHAKRAS.length - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-1">
                <motion.div
                  className="w-full h-full"
                  style={{
                    backgroundColor: isPast ? chakra.colour : `${chakra.colour}20`,
                  }}
                />
              </div>
            )}
          </a>
        );
      })}

      {/* Rainbow bar below dots — shows overall progress */}
      <div className="mt-3 w-1.5 rounded-full overflow-hidden bg-bark/5" style={{ height: 56 }}>
        <motion.div
          className="w-full rounded-full origin-top"
          style={{
            background: "linear-gradient(to bottom, #E05555, #F0923E, #F0D03E, #5DBB63, #5B8FD4, #8B5DC8, #D4B8F0)",
          }}
          animate={{
            height: `${((activeIndex + 1) / CHAKRAS.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
        />
      </div>
    </nav>
  );
}
