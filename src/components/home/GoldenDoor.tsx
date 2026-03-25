"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function GoldenDoor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDoorClick = useCallback(() => {
    if (!isOpen) setIsOpen(true);
  }, [isOpen]);

  const handleReset = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <SectionContainer>
      <SectionHeading
        title="The World Awaits"
        subtitle="Knock on the tree and step through the golden door"
      />
      <Reveal>
        <div className="flex flex-col items-center">
          {/* The interactive tree + door */}
          <div
            className="relative w-72 h-96 md:w-80 md:h-[440px] cursor-pointer select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleDoorClick}
            role="button"
            tabIndex={0}
            aria-label="Open the golden door"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDoorClick();
              }
            }}
          >
            {/* Tree SVG */}
            <svg
              viewBox="0 0 320 440"
              fill="none"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              {/* Roots */}
              <path
                d="M100 420 Q80 400 60 410 Q40 395 30 420 L30 440 L290 440 L290 420 Q280 395 260 410 Q240 400 220 420"
                fill="#3D2B1F"
                fillOpacity="0.3"
              />
              <path
                d="M120 420 Q110 400 95 415 Q85 405 75 420"
                fill="none"
                stroke="#5C4033"
                strokeWidth="3"
                strokeOpacity="0.4"
              />
              <path
                d="M200 420 Q210 400 225 415 Q235 405 245 420"
                fill="none"
                stroke="#5C4033"
                strokeWidth="3"
                strokeOpacity="0.4"
              />

              {/* Trunk */}
              <path
                d="M130 420 Q120 380 115 340 Q108 300 112 260 Q108 230 115 200 Q120 180 130 170 Q140 160 150 155 Q155 150 160 155 Q170 160 180 170 Q190 180 195 200 Q202 230 198 260 Q202 300 195 340 Q190 380 180 420Z"
                fill="#5C4033"
                fillOpacity="0.85"
              />
              {/* Bark texture lines */}
              <path
                d="M140 380 Q142 350 138 320 Q136 290 140 260"
                fill="none"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />
              <path
                d="M170 380 Q168 345 172 310 Q174 280 170 250"
                fill="none"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />
              <path
                d="M155 390 Q154 360 156 330"
                fill="none"
                stroke="#3D2B1F"
                strokeWidth="1"
                strokeOpacity="0.2"
              />

              {/* Main canopy */}
              <path
                d="M40 180 Q20 140 35 100 Q45 65 80 45 Q110 20 155 15 Q200 10 235 35 Q270 55 285 90 Q300 130 280 170 Q265 200 240 210 Q210 225 160 220 Q110 225 80 210 Q55 200 40 180Z"
                fill="#2D5A3D"
                fillOpacity="0.7"
              />
              {/* Canopy highlights */}
              <path
                d="M70 140 Q60 110 75 80 Q90 55 120 42 Q145 32 155 35"
                fill="none"
                stroke="#5DBB63"
                strokeWidth="2"
                strokeOpacity="0.15"
              />
              <path
                d="M250 140 Q260 115 250 85 Q235 58 210 45"
                fill="none"
                stroke="#5DBB63"
                strokeWidth="2"
                strokeOpacity="0.15"
              />

              {/* Small branches poking out */}
              <path
                d="M115 200 Q90 185 70 195"
                fill="none"
                stroke="#5C4033"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
              <path
                d="M195 195 Q215 180 240 190"
                fill="none"
                stroke="#5C4033"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />

              {/* Golden apples in the canopy */}
              {[
                { cx: 90, cy: 90 },
                { cx: 140, cy: 50 },
                { cx: 200, cy: 60 },
                { cx: 250, cy: 100 },
                { cx: 120, cy: 130 },
                { cx: 220, cy: 140 },
                { cx: 170, cy: 85 },
              ].map((apple, i) => (
                <g key={i}>
                  <circle
                    cx={apple.cx}
                    cy={apple.cy}
                    r={6 + (i % 3)}
                    fill="#C8963E"
                    fillOpacity={0.6 + (i % 3) * 0.1}
                  />
                  <circle
                    cx={apple.cx - 2}
                    cy={apple.cy - 2}
                    r={2}
                    fill="#E8C778"
                    fillOpacity="0.5"
                  />
                </g>
              ))}

              {/* Door arch carved into trunk */}
              <path
                d="M137 420 L137 300 Q137 270 160 265 Q183 270 183 300 L183 420"
                fill="none"
                stroke="#C8963E"
                strokeWidth="2.5"
                strokeOpacity={isHovering && !isOpen ? 1 : 0.6}
              />

              {/* Door surface */}
              <motion.path
                d="M139 418 L139 302 Q139 274 160 268 Q181 274 181 302 L181 418"
                fill="#A07830"
                fillOpacity={0.8}
                animate={{
                  fillOpacity: isOpen ? 0 : isHovering ? 0.9 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Door details - panels */}
              {!isOpen && (
                <>
                  <rect
                    x="145"
                    y="290"
                    width="13"
                    height="50"
                    rx="2"
                    fill="#C8963E"
                    fillOpacity="0.2"
                  />
                  <rect
                    x="162"
                    y="290"
                    width="13"
                    height="50"
                    rx="2"
                    fill="#C8963E"
                    fillOpacity="0.2"
                  />
                  <rect
                    x="145"
                    y="350"
                    width="13"
                    height="50"
                    rx="2"
                    fill="#C8963E"
                    fillOpacity="0.2"
                  />
                  <rect
                    x="162"
                    y="350"
                    width="13"
                    height="50"
                    rx="2"
                    fill="#C8963E"
                    fillOpacity="0.2"
                  />
                  {/* Door handle */}
                  <circle
                    cx="172"
                    cy="345"
                    r="3"
                    fill="#E8C778"
                    fillOpacity="0.8"
                  />
                </>
              )}
            </svg>

            {/* Door glow — intensifies on hover */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: "38%",
                bottom: "5%",
                width: "24%",
                height: "38%",
              }}
              animate={{
                opacity: isOpen ? 0 : isHovering ? 0.7 : 0.25,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full h-full bg-gold-light rounded-t-[50%] blur-xl" />
            </motion.div>

            {/* Golden light flood on open */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Light rays from the door */}
                  <motion.div
                    className="absolute"
                    style={{
                      left: "38%",
                      bottom: "5%",
                      width: "24%",
                      height: "38%",
                      transformOrigin: "center bottom",
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-gold via-gold-light to-transparent rounded-t-[50%] blur-md opacity-80" />
                  </motion.div>

                  {/* Expanding golden orb */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ bottom: "30%" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 3.5, opacity: [0, 0.9, 0.6, 0] }}
                    transition={{
                      duration: 2.5,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                  >
                    <div className="w-24 h-24 rounded-full bg-gold/60 blur-2xl" />
                  </motion.div>

                  {/* Sparkles bursting from door */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI - Math.PI / 2;
                    const distance = 80 + (i % 3) * 30;
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gold-light"
                        style={{
                          left: "50%",
                          bottom: "35%",
                        }}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance - 40,
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.3 + i * 0.08,
                          ease: [0.25, 0.8, 0.25, 1],
                        }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover hint text */}
            <AnimatePresence>
              {!isOpen && isHovering && (
                <motion.p
                  className="absolute bottom-0 left-0 right-0 text-center font-accent text-gold text-lg"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                >
                  Knock, knock...
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message after door opens */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                  ease: [0.25, 0.8, 0.25, 1],
                }}
              >
                <p className="font-accent text-2xl text-gold mb-2">
                  Welcome to Angelica
                </p>
                <p className="text-bark-light text-sm max-w-md mx-auto leading-relaxed">
                  Beyond the golden door lies a world of angels, crystal
                  mountains, and magic that lives inside every child.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs text-bark-muted hover:text-gold transition-colors"
                >
                  Close the door
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
