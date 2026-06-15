"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import StaticJourney from "./StaticJourney";
import { detectIsMobileStory } from "./engine/quality";
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
 * Phones (see `detectIsMobileStory`) get the same storybook with gentle
 * scroll-reveal motion — no WebGL — so the 16:9 plates show un-cropped and the
 * sticky pinned canvas never fights mobile browser-chrome resizing.
 */
export default function Experience({
  journey,
  intro,
}: {
  journey: SceneDef[];
  intro?: ExperienceIntro;
}) {
  // Resolve device signals in an effect only (no window/navigator during render)
  // so server and first client render match → no hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(detectIsMobileStory());
    setMounted(true);
  }, []);

  // Pre-mount: a neutral parchment spacer identical on server + first client
  // render — avoids a desktop flash-of-static-story and a mobile WebGL flash.
  if (!mounted) return <div className="min-h-[100dvh] bg-parchment" />;

  if (reduced) return <StaticJourney journey={journey} />;
  if (isMobile) return <StaticJourney journey={journey} animated intro={intro} />;

  const trackVh = journey.length * TRACK_VH_PER_BEAT;

  return (
    <section data-journey-track className="relative" style={{ height: `${trackVh}dvh` }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-parchment">
        <ExperienceCanvas journey={journey} />
        {/* Beat-synced Fraunces/Caveat copy, chakra ignition, cameos, CTA, progress bar */}
        <JourneyOverlays journey={journey} intro={intro} />
      </div>
    </section>
  );
}
