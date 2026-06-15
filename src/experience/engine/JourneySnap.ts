import type Lenis from "lenis";

/**
 * Phase 5A — snap-to-beat scroll.
 *
 * Keeps analog scrubbing (the engine + overlays still read `journeyProgress()`
 * every frame; this only nudges the scroll position they read). When the scroll
 * goes idle — debounced after the last wheel/touch gesture *and* once Lenis's
 * own velocity has settled (covers trackpad + touch momentum) — it eases the
 * page to the nearest beat with a **direction bias**: a single flick in one
 * direction advances ≈ one beat (snap forward once you've moved >25% of the way
 * toward the next beat; symmetric going back).
 *
 * It never fights active input: a fresh gesture cancels any in-flight snap
 * (Lenis `lock:false` lets the user interrupt) and re-arms the idle timer. It
 * only snaps while the scroll sits *inside* the journey track — never when the
 * user has scrolled up into the nav area or down into the conversion tail.
 *
 * Disabled entirely when `?p=` forces the journey (QA/sharing) or under
 * reduced motion (that path renders the static storybook, no canvas) — both via
 * the `disabled()` predicate passed by the engine.
 */

const IDLE_MS = 140;
/** Lenis velocity (px/frame-ish) below which the scroll is "at rest". */
const VELOCITY_EPS = 0.06;
const SNAP_DURATION = 0.7;
/** advance to the next beat once a flick has carried >25% of the way there */
const FORWARD_BIAS = 0.25;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export class JourneySnap {
  private timer: ReturnType<typeof setTimeout> | null = null;
  /** true while OUR programmatic snap tween is running (so it doesn't re-arm itself) */
  private snapping = false;
  /** last observed scroll direction (+1 down / -1 up) for the bias */
  private dir = 0;
  private disposed = false;
  private readonly unsubscribe: () => void;

  constructor(
    private readonly lenis: Lenis,
    private readonly beatCount: number,
    /** snap is suppressed while this returns true (?p= forced, reduced motion) */
    private readonly disabled: () => boolean,
  ) {
    this.onScroll = this.onScroll.bind(this);
    this.onUserInput = this.onUserInput.bind(this);

    if (beatCount < 2) {
      // single-beat journey — nothing to snap to
      this.unsubscribe = () => {};
      return;
    }

    this.unsubscribe = lenis.on("scroll", this.onScroll);
    window.addEventListener("wheel", this.onUserInput, { passive: true });
    window.addEventListener("touchstart", this.onUserInput, { passive: true });
  }

  /** a fresh user gesture cancels any in-flight snap so it can re-arm cleanly */
  private onUserInput() {
    this.snapping = false;
    this.schedule();
  }

  private onScroll() {
    if (this.disposed || this.snapping) return; // ignore our own programmatic scroll
    const v = this.lenis.velocity;
    if (v > 0.01) this.dir = 1;
    else if (v < -0.01) this.dir = -1;
    this.schedule();
  }

  private schedule() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.snap(), IDLE_MS);
  }

  private snap() {
    this.timer = null;
    if (this.disposed || this.disabled()) return;
    // still gliding (touch/trackpad momentum) — wait for it to settle
    if (Math.abs(this.lenis.velocity) > VELOCITY_EPS) {
      this.schedule();
      return;
    }

    const track = document.querySelector<HTMLElement>("[data-journey-track]");
    if (!track) return;
    const len = track.offsetHeight - window.innerHeight;
    if (len <= 0) return;

    const top = track.offsetTop;
    const cur = (window.scrollY - top) / len; // journey progress 0→1
    if (cur < 0 || cur > 1) return; // outside the journey (nav / tail) — don't fight

    const N = this.beatCount;
    const f = cur * (N - 1); // fractional beat position
    const base = Math.floor(f);
    const frac = f - base;

    let target: number;
    if (this.dir > 0) target = frac > FORWARD_BIAS ? base + 1 : base;
    else if (this.dir < 0) target = frac < 1 - FORWARD_BIAS ? base : base + 1;
    else target = Math.round(f);
    target = Math.min(N - 1, Math.max(0, target));

    const targetPx = top + (target / (N - 1)) * len;
    if (Math.abs(targetPx - window.scrollY) < 1) return; // already settled

    this.snapping = true;
    this.lenis.scrollTo(targetPx, {
      duration: SNAP_DURATION,
      easing: easeInOutCubic,
      lock: false, // a user gesture can still interrupt the snap
      onComplete: () => {
        this.snapping = false;
      },
    });
  }

  dispose() {
    this.disposed = true;
    if (this.timer) clearTimeout(this.timer);
    this.unsubscribe();
    window.removeEventListener("wheel", this.onUserInput);
    window.removeEventListener("touchstart", this.onUserInput);
  }
}
