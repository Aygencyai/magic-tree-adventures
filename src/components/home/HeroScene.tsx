"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const cloudsY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const hillsY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const treeY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Sky gradient - slowest layer */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-lavender/40 via-cloud-pink/15 via-50% to-parchment" />
      </motion.div>

      {/* Stars / sparkles in the sky */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${8 + i * 7.5}%`,
              top: `${5 + (i % 5) * 6}%`,
              background: `rgba(200, 150, 62, ${0.15 + (i % 4) * 0.08})`,
              boxShadow: `0 0 ${4 + (i % 3) * 2}px rgba(200, 150, 62, 0.2)`,
              animation: `gentle-bob ${3 + (i % 3)}s ${i * 0.4}s ease-in-out infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Clouds - slow layer */}
      <motion.div
        style={{ y: cloudsY }}
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
        aria-hidden="true"
      >
        {/* Cloud 1 */}
        <div className="absolute top-[12%] left-[8%] w-48 h-20 md:w-72 md:h-28">
          <div className="w-full h-full bg-parchment/40 rounded-[50%] blur-xl" />
        </div>
        {/* Cloud 2 */}
        <div className="absolute top-[8%] right-[12%] w-56 h-24 md:w-80 md:h-32">
          <div className="w-full h-full bg-cloud-pink/25 rounded-[50%] blur-xl" />
        </div>
        {/* Cloud 3 */}
        <div className="absolute top-[22%] left-[35%] w-40 h-16 md:w-64 md:h-24">
          <div className="w-full h-full bg-parchment/30 rounded-[50%] blur-xl" />
        </div>
        {/* Cloud 4 - smaller accent */}
        <div className="absolute top-[18%] right-[30%] w-32 h-14 md:w-48 md:h-20">
          <div className="w-full h-full bg-sky-lavender/20 rounded-[50%] blur-xl" />
        </div>
      </motion.div>

      {/* Distant mountains / Crystal Mountain hint */}
      <motion.div
        style={{ y: hillsY }}
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        aria-hidden="true"
      >
        {/* Far mountain range */}
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          className="absolute bottom-[15%] w-full h-auto opacity-30"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400 L0 280 Q120 200 240 250 Q360 180 480 220 Q580 160 680 200 Q780 140 880 180 Q1000 120 1100 170 Q1200 130 1300 180 Q1380 150 1440 200 L1440 400Z"
            fill="#C8B8E8"
            fillOpacity="0.3"
          />
        </svg>

        {/* Crystal Mountain - centre, glowing */}
        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 opacity-40"
        >
          <defs>
            <linearGradient
              id="crystal-grad"
              x1="100"
              y1="0"
              x2="100"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#B8D4F0" />
              <stop offset="40%" stopColor="#5B8FD4" />
              <stop offset="100%" stopColor="#C8B8E8" />
            </linearGradient>
          </defs>
          <path
            d="M100 10 L160 90 L180 200 L20 200 L40 90Z"
            fill="url(#crystal-grad)"
            fillOpacity="0.6"
          />
          <path
            d="M100 10 L160 90 L180 200 L20 200 L40 90Z"
            fill="none"
            stroke="#B8D4F0"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Rolling golden hills */}
        <svg
          viewBox="0 0 1440 300"
          fill="none"
          className="absolute bottom-0 w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Back hill - green valley */}
          <path
            d="M0 300 L0 180 Q200 100 400 150 Q600 80 800 130 Q1000 70 1200 120 Q1350 90 1440 130 L1440 300Z"
            fill="#2D5A3D"
            fillOpacity="0.15"
          />
          {/* Mid hill - golden */}
          <path
            d="M0 300 L0 220 Q180 160 360 200 Q540 140 720 180 Q900 130 1080 170 Q1260 140 1440 180 L1440 300Z"
            fill="#C8963E"
            fillOpacity="0.12"
          />
          {/* Front hill - warm */}
          <path
            d="M0 300 L0 250 Q160 210 360 235 Q560 200 760 225 Q960 195 1160 220 Q1320 205 1440 230 L1440 300Z"
            fill="#E8C778"
            fillOpacity="0.15"
          />
        </svg>
      </motion.div>

      {/* Tree silhouette - fastest parallax */}
      <motion.div
        style={{ y: treeY }}
        className="absolute bottom-0 right-[8%] md:right-[12%] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 180 320"
          fill="none"
          className="w-28 h-48 md:w-40 md:h-64 lg:w-48 lg:h-80 opacity-20"
        >
          {/* Trunk */}
          <path
            d="M80 320 Q75 280 70 250 Q60 220 65 190 Q55 160 70 140 Q65 120 75 100 Q80 90 85 100 Q95 80 100 100 Q110 120 105 140 Q115 155 110 180 Q120 210 115 240 Q110 270 105 300 Q100 320 95 320Z"
            fill="#3D2B1F"
            fillOpacity="0.7"
          />
          {/* Canopy */}
          <path
            d="M30 150 Q20 120 40 90 Q50 60 80 40 Q100 20 120 40 Q145 55 155 85 Q170 110 160 140 Q150 165 130 170 Q110 180 90 175 Q60 180 40 165Z"
            fill="#2D5A3D"
            fillOpacity="0.3"
          />
          {/* Golden door glow */}
          <ellipse
            cx="88"
            cy="230"
            rx="12"
            ry="22"
            fill="#C8963E"
            fillOpacity="0.4"
          >
            <animate
              attributeName="fillOpacity"
              values="0.3;0.5;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          {/* Door outline */}
          <path
            d="M78 252 Q78 220 82 210 Q86 202 90 202 Q94 202 98 210 Q102 220 102 252"
            fill="none"
            stroke="#E8C778"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Left tree / foliage accent */}
      <motion.div
        style={{ y: treeY }}
        className="absolute bottom-0 left-[3%] md:left-[8%] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="w-16 h-28 md:w-24 md:h-40 opacity-15"
        >
          <path
            d="M50 200 Q45 170 40 150 Q35 130 42 110 Q38 90 50 70 Q55 55 60 70 Q70 55 68 80 Q75 100 72 120 Q80 140 75 160 Q70 180 65 200Z"
            fill="#3D2B1F"
            fillOpacity="0.6"
          />
          <path
            d="M10 120 Q5 90 25 60 Q40 30 60 35 Q80 30 95 55 Q115 85 105 115 Q95 135 75 130 Q50 140 30 130Z"
            fill="#2D5A3D"
            fillOpacity="0.25"
          />
        </svg>
      </motion.div>

    </div>
  );
}
