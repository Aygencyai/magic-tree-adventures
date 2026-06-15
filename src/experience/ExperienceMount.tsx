"use client";

import dynamic from "next/dynamic";

// SSR disabled — the WebGL canvas touches window/document and must be client-only.
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), { ssr: false });

export default function ExperienceMount() {
  return (
    <>
      <ExperienceCanvas />
      {/* Scroll spacer — the fixed canvas reads page scroll progress (Phase 0 spike). */}
      <div style={{ height: "300vh" }} aria-hidden />
    </>
  );
}
