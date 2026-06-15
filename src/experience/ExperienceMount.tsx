"use client";

import dynamic from "next/dynamic";
import { JOURNEY } from "./engine/scenes";

// Both layers are client-only: the canvas touches window/document, and the
// overlay's scroll-driven rAF reads window scroll — neither has SSR/SEO value
// (it's a scroll-driven WebGL experience).
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), { ssr: false });
const JourneyOverlays = dynamic(() => import("./JourneyOverlays"), { ssr: false });

// ~135vh of scroll per beat — enough to read each beat's copy before it crossfades.
const SPACER_VH = JOURNEY.length * 135;

export default function ExperienceMount() {
  return (
    <>
      <ExperienceCanvas />
      {/* Beat-synced Fraunces/Caveat copy, chakra ignition, cameos + CTA over the canvas */}
      <JourneyOverlays />
      {/* Scroll spacer — the fixed canvas + overlays read page scroll progress and
          crossfade across the full journey. Grows with the number of beats. */}
      <div style={{ height: `${SPACER_VH}vh` }} aria-hidden />
    </>
  );
}
