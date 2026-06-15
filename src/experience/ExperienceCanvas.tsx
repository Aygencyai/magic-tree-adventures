"use client";

import { useEffect, useRef } from "react";
import { SceneEngine } from "./engine/SceneEngine";
import type { SceneDef } from "./engine/scenes";

/**
 * Phase 2 — boots the vanilla-Three SceneEngine (depth-parallax plates +
 * particle field + atmosphere + Lenis scroll rig). Kept thin: all WebGL lives
 * in ./engine. SSR-disabled via Experience (the engine touches window).
 *
 * Phase 6 — takes the page's `journey` so one engine serves every route
 * (home / chakras / about / buy); the array drives the whole scene stack.
 *
 * Vanilla Three.js, not R3F — see CLAUDE.md Gotchas / immersive-build-plan.md
 * (R3F v9 is incompatible with Next 14.2's App Router runtime).
 */
export default function ExperienceCanvas({ journey }: { journey: SceneDef[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new SceneEngine(canvas, journey);
    return () => engine.dispose();
  }, [journey]);

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
