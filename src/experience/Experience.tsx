"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import StaticJourney from "./StaticJourney";
import type { SceneDef } from "./engine/scenes";

/** Optional playful "how to begin" coachmark on the first beat (homepage). */
export interface ExperienceIntro {
  /** big Caveat invitation; defaults to "scroll to explore" */
  label?: string;
  /** a character sprite that peeks + bobs at the bottom edge to invite scrolling */
  character?: { src: string; alt: string };
}

// Both layers are client-only: the canvas touches window/document and the
// overlay's rAF reads window scroll — neither has SSR/SEO value (it's a
// scroll-driven WebGL experience; the story copy is real DOM either way).
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), { ssr: false });
const JourneyOverlays = dynamic(() => import("./JourneyOverlays"), { ssr: false });

// ~135vh of scroll per beat — enough to read each beat's copy before it crossfades.
const TRACK_VH_PER_BEAT = 135;

/**
 * The reusable immersive experience (Phase 6) — one engine, any page.
 *
 * A tall `[data-journey-track]` section whose sticky child pins the canvas +
 * overlays while you scroll the journey, then releases — so anything rendered
 * after this component scrolls up naturally over the released canvas. Journey
 * progress maps to this track (see engine/progress), not the whole document.
 * Pass the page's `journey`: snap-to-beat, `?p=`, the progress bar, and the
 * reduced-motion static fallback all work unchanged for every route.
 *
 * `prefers-reduced-motion` swaps the whole thing for a calm static storybook.
 */
export default function Experience({
  journey,
  intro,
}: {
  journey: SceneDef[];
  intro?: ExperienceIntro;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return <StaticJourney journey={journey} />;

  const trackVh = journey.length * TRACK_VH_PER_BEAT;

  return (
    <section data-journey-track className="relative" style={{ height: `${trackVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-parchment">
        <ExperienceCanvas journey={journey} />
        {/* Beat-synced Fraunces/Caveat copy, chakra ignition, cameos, CTA, progress bar */}
        <JourneyOverlays journey={journey} intro={intro} />
      </div>
    </section>
  );
}
