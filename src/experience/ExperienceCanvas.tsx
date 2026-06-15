"use client";

import { useEffect, useRef } from "react";
import { SceneEngine } from "./engine/SceneEngine";

/**
 * Phase 2 — boots the vanilla-Three SceneEngine (depth-parallax plates +
 * particle field + atmosphere + Lenis scroll rig). Kept thin: all WebGL lives
 * in ./engine. SSR-disabled via ExperienceMount (the engine touches window).
 *
 * Vanilla Three.js, not R3F — see CLAUDE.md Gotchas / immersive-build-plan.md
 * (R3F v9 is incompatible with Next 14.2's App Router runtime).
 */
export default function ExperienceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new SceneEngine(canvas);
    return () => engine.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
