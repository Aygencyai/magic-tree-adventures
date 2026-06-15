"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import StaticJourney from "./StaticJourney";
import { JOURNEY } from "./engine/scenes";

// Both layers are client-only: the canvas touches window/document and the
// overlay's rAF reads window scroll — neither has SSR/SEO value (it's a
// scroll-driven WebGL experience; the story copy is real DOM either way).
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), { ssr: false });
const JourneyOverlays = dynamic(() => import("./JourneyOverlays"), { ssr: false });

// ~135vh of scroll per beat — enough to read each beat's copy before it crossfades.
const TRACK_VH = JOURNEY.length * 135;

/**
 * The immersive journey block. A tall `[data-journey-track]` section whose
 * sticky child pins the canvas + overlays while you scroll the journey, then
 * releases — so anything rendered after this component (the homepage conversion
 * tail) scrolls up naturally over the released canvas. Journey progress maps to
 * this track (see engine/progress), not the whole document.
 *
 * `prefers-reduced-motion` swaps the whole thing for a calm static storybook.
 */
export default function ExperienceMount() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return <StaticJourney />;

  return (
    <section data-journey-track className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-parchment">
        <ExperienceCanvas />
        {/* Beat-synced Fraunces/Caveat copy, chakra ignition, cameos, CTA, progress bar */}
        <JourneyOverlays />
      </div>
    </section>
  );
}
