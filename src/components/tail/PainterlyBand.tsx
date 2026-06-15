"use client";

import { cn } from "@/lib/utils";
import FloatingParticles from "@/components/effects/FloatingParticles";
import ParallaxLayer from "@/components/effects/ParallaxLayer";

/**
 * A tail section that lives in the painterly world (Phase 7).
 *
 * After the immersive journey releases, the crawlable tails used to drop into
 * flat cream sections. PainterlyBand sets each section over a softly-scrimmed
 * painterly plate with a gentle scroll parallax + optional drifting motes, so
 * the grounded content (kept as real DOM for SEO) still feels like the same
 * storybook world. Content sits in `glass-warm` cards over the band for
 * legibility. `tone="dark"` is for forest-dark sections (e.g. the dedication).
 *
 * The plate is decorative (`aria-hidden`); the parchment/forest scrim + top/
 * bottom blend keep text legible and dissolve the section's image edges into
 * the surrounding background so bands flow into one another.
 */
interface PainterlyBandProps {
  /** background plate (a /scenes/web/*.webp); omit for a plain band */
  image?: string;
  tone?: "warm" | "dark";
  /** ambient drifting motes for extra life */
  particles?: boolean;
  /** anchor id on the section (e.g. "buy" for the Buy panel) */
  id?: string;
  className?: string;
  /** classes for the inner content container (defaults to centred max-w-5xl) */
  innerClassName?: string;
  children: React.ReactNode;
}

export default function PainterlyBand({
  image,
  tone = "warm",
  particles = false,
  id,
  className,
  innerClassName,
  children,
}: PainterlyBandProps) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden section-padding", className)}
    >
      {image && (
        <div aria-hidden className="absolute inset-0">
          {/* plate is over-sized so the slow parallax never reveals an edge */}
          <ParallaxLayer speed={0.22} className="absolute inset-x-0 -top-[12%] h-[124%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="h-full w-full object-cover" />
          </ParallaxLayer>
          {/* legibility scrim */}
          <div
            className={cn(
              "absolute inset-0",
              dark ? "bg-forest-dark/[0.78]" : "bg-parchment/[0.72]"
            )}
          />
          {/* blend the band's top + bottom edges into the page background */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b",
              dark
                ? "from-forest-dark via-transparent to-forest-dark"
                : "from-parchment via-transparent to-parchment"
            )}
          />
        </div>
      )}
      {particles && (
        <FloatingParticles count={16} className="absolute inset-0" />
      )}
      <div
        className={cn(
          "relative z-10 mx-auto max-w-5xl px-6 lg:px-12",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
