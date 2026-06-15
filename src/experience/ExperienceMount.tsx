"use client";

import dynamic from "next/dynamic";

// SSR disabled — the WebGL canvas touches window/document and must be client-only.
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), { ssr: false });

export default function ExperienceMount() {
  return (
    <>
      <ExperienceCanvas />
      {/* Scroll spacer — the fixed canvas reads page scroll progress and
          crossfades across the 3-beat arc. ~140vh per scene. Phase 3 grows
          this with the full journey + beat-synced HTML overlays. */}
      <div style={{ height: "420vh" }} aria-hidden />
    </>
  );
}
