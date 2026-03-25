"use client";

import { motion } from "framer-motion";

interface ChakraOrbProps {
  colour: string;
  isActive: boolean;
  name: string;
}

export default function ChakraOrb({ colour, isActive, name }: ChakraOrbProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "180%",
          height: "180%",
          background: `radial-gradient(circle, ${colour}15 0%, transparent 70%)`,
        }}
        animate={
          isActive
            ? { scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }
            : { scale: 1, opacity: 0.2 }
        }
        transition={{
          duration: 3,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Middle pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "140%",
          height: "140%",
          border: `2px solid ${colour}`,
        }}
        animate={
          isActive
            ? { scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }
            : { scale: 1, opacity: 0.08 }
        }
        transition={{
          duration: 2.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Core orb */}
      <motion.div
        className="w-28 h-28 md:w-36 md:h-36 rounded-full relative"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${colour}CC, ${colour})`,
          boxShadow: `0 0 40px ${colour}30, 0 0 80px ${colour}15`,
        }}
        animate={
          isActive
            ? {
                boxShadow: [
                  `0 0 40px ${colour}30, 0 0 80px ${colour}15`,
                  `0 0 60px ${colour}50, 0 0 120px ${colour}25`,
                  `0 0 40px ${colour}30, 0 0 80px ${colour}15`,
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
        aria-label={`${name} chakra orb`}
      >
        {/* Inner highlight */}
        <div
          className="absolute top-3 left-4 w-8 h-6 rounded-full blur-md"
          style={{ background: `${colour}40` }}
        />
      </motion.div>
    </div>
  );
}
