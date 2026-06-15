/**
 * Device/quality detection + reduced-motion for the experience engine.
 * Phase 2: drives particle counts, pixel ratio, bloom on/off, and the
 * static (reduced-motion) fallback path.
 */

export type QualityTier = "high" | "low";

export interface QualitySettings {
  tier: QualityTier;
  pixelRatio: number;
  particleCount: number;
  bloom: boolean;
  /** prefers-reduced-motion → no autonomous/pointer motion, static crossfades only */
  reducedMotion: boolean;
}

export function detectQuality(): QualitySettings {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 820px)").matches;
  const mobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  const tier: QualityTier =
    narrow || mobileUA || (coarse && lowCores) ? "low" : "high";

  return {
    tier,
    pixelRatio: Math.min(window.devicePixelRatio || 1, tier === "low" ? 1.5 : 2),
    particleCount: tier === "low" ? 70 : 190,
    bloom: tier === "high",
    reducedMotion,
  };
}

/**
 * Phones get the smooth native-scroll storybook instead of the WebGL journey:
 * the 16:9 plates cover-crop badly in portrait (only the centre shows) and the
 * sticky pinned canvas fights mobile browser-chrome resizing. Wide tablets /
 * landscape iPad (>820px) intentionally keep WebGL; a small or portrait tablet
 * (≤820px) gets the story. iPad is omitted from the UA test on purpose.
 */
export function detectIsMobileStory(): boolean {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 820px)").matches;
  const mobileUA = /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent);
  return (narrow && coarse) || (mobileUA && narrow);
}
