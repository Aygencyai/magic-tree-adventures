/**
 * Single source of truth for journey scroll progress (0→1).
 *
 * The journey lives inside a tall "track" section (`[data-journey-track]`) whose
 * sticky child pins the canvas while you scroll it, then releases to reveal the
 * conversion tail below. Progress must map to *that track*, not the whole
 * document — once a tail follows the journey, `scrollHeight` includes it, so the
 * naïve `scrollY / (scrollHeight - innerHeight)` would stretch the journey
 * across the tail too. Both the WebGL engine and the HTML overlays read this so
 * they stay locked together without talking to each other.
 *
 * `?p=0..1` (parsed by each caller) overrides everything for QA + sharing.
 */

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function journeyProgress(forced: number | null): number {
  if (forced !== null) return forced;
  if (typeof window === "undefined") return 0;

  const track = document.querySelector<HTMLElement>("[data-journey-track]");
  if (track) {
    const len = track.offsetHeight - window.innerHeight;
    return len > 0 ? clamp01((window.scrollY - track.offsetTop) / len) : 0;
  }

  // fallback: no track on the page → map against the whole document
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? clamp01(window.scrollY / max) : 0;
}
