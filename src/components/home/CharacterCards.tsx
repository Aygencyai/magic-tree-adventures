"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS } from "@/lib/constants";
import { staggerContainer } from "@/lib/animations";
import Reveal from "@/components/ui/Reveal";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

type AnimationType = "vibrate" | "bounce" | "glow" | "mist" | "flutter";

/** Maps each character animation type to a unique Framer Motion config */
function getPersonalityAnimation(type: AnimationType) {
  switch (type) {
    case "vibrate":
      return {
        animate: { x: [0, -1.5, 1.5, -1, 1, 0] },
        transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3 },
      };
    case "bounce":
      return {
        animate: { y: [0, -8, 0, -4, 0] },
        transition: {
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut" as const,
        },
      };
    case "glow":
      return {
        animate: {
          boxShadow: [
            "0 0 0px rgba(200, 150, 62, 0)",
            "0 0 20px rgba(200, 150, 62, 0.3)",
            "0 0 0px rgba(200, 150, 62, 0)",
          ],
        },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "mist":
      return {
        animate: { y: [0, -4, 0], opacity: [1, 0.85, 1] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "flutter":
      return {
        animate: { rotate: [0, -2, 2, -1, 1, 0] },
        transition: {
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeInOut" as const,
        },
      };
    default:
      return { animate: {}, transition: {} };
  }
}

/** Returns the avatar gradient based on character */
function getAvatarStyle(name: string) {
  switch (name) {
    case "Rory":
      return "from-crystal/30 to-crystal/10";
    case "Riley":
      return "from-gold/30 to-gold/10";
    case "Tilly":
      return "from-cloud-pink/40 to-cloud-pink/15";
    case "Alina":
      return "from-mist-blue/40 to-mist-blue/15";
    case "Gino":
      return "from-gold/20 to-bark/10";
    case "Ari":
      return "from-sky-lavender/40 to-sky-lavender/15";
    default:
      return "from-parchment-dark to-parchment";
  }
}

interface CharacterCardProps {
  character: (typeof CHARACTERS)[number];
  index: number;
}

function CharacterCard({ character, index }: CharacterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animation = getPersonalityAnimation(character.animation);
  const avatarGradient = getAvatarStyle(character.name);

  return (
    <Reveal delay={index * 0.1}>
      <div
        className="relative h-72 cursor-pointer perspective-[800px]"
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        tabIndex={0}
        aria-label={`${character.name} — ${isFlipped ? "click to see avatar" : "click for details"}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isFlipped ? (
            /* Front — Avatar + name */
            <motion.div
              key="front"
              className="absolute inset-0 rounded-2xl bg-parchment shadow-card overflow-hidden backface-hidden"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -180 }}
              transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <motion.div
                className="h-full flex flex-col items-center justify-center p-6"
                {...animation}
              >
                {/* Mist effect for Alina */}
                {character.animation === "mist" && (
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-mist-blue/15 blur-2xl"
                      animate={{ x: [0, 15, -10, 0], y: [0, -10, 5, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-mist-blue/10 blur-2xl"
                      animate={{ x: [0, -12, 8, 0], y: [0, 8, -12, 0] }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                )}

                {/* Avatar circle */}
                <div
                  className={`relative w-20 h-20 rounded-full bg-gradient-to-b ${avatarGradient} mb-4 flex items-center justify-center`}
                >
                  <span className="font-heading text-2xl font-semibold text-bark">
                    {character.name[0]}
                  </span>

                  {/* Flutter wings for Gino */}
                  {character.animation === "flutter" && (
                    <>
                      <motion.div
                        className="absolute -left-3 top-1/4 w-5 h-3 rounded-full bg-gold-light/40"
                        animate={{ rotate: [0, -20, 0, 20, 0] }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        style={{ transformOrigin: "right center" }}
                      />
                      <motion.div
                        className="absolute -right-3 top-1/4 w-5 h-3 rounded-full bg-gold-light/40"
                        animate={{ rotate: [0, 20, 0, -20, 0] }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        style={{ transformOrigin: "left center" }}
                      />
                    </>
                  )}
                </div>

                <h3 className="font-heading text-xl font-semibold text-bark">
                  {character.name}
                </h3>
                <p className="font-accent text-gold mt-1">{character.role}</p>
                <p className="text-bark-muted text-xs mt-3">
                  Tap to read more
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* Back — Details */
            <motion.div
              key="back"
              className="absolute inset-0 rounded-2xl bg-parchment shadow-card overflow-hidden backface-hidden"
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 180 }}
              transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className="h-full flex flex-col justify-center p-6">
                <h3 className="font-heading text-xl font-semibold text-bark mb-1">
                  {character.name}
                </h3>
                <p className="font-accent text-gold text-sm mb-4">
                  {character.role}
                </p>
                <p className="text-bark-light text-sm leading-relaxed">
                  {character.description}
                </p>
                {"chakra" in character && character.chakra && (
                  <p className="mt-3 text-xs text-bark-muted">
                    Chakra:{" "}
                    <span className="capitalize text-crystal font-semibold">
                      {character.chakra}
                    </span>
                  </p>
                )}
                <p className="text-bark-muted text-xs mt-3">
                  Tap to go back
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function CharacterCards() {
  return (
    <SectionContainer className="bg-parchment-dark">
      <SectionHeading title="Meet the Adventurers" />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {CHARACTERS.map((character, i) => (
          <CharacterCard key={character.name} character={character} index={i} />
        ))}
      </motion.div>
    </SectionContainer>
  );
}
