"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { JOURNEY } from "./engine/scenes";
import { CHAKRAS } from "@/lib/constants";

/**
 * Beat-synced HTML overlays for the immersive journey (Phase 3).
 *
 * The WebGL canvas reads page scroll via Lenis; this layer reads the SAME page
 * scroll, so HTML copy stays locked to the plate it narrates without the engine
 * and React ever talking to each other. Each beat's Fraunces heading + Caveat
 * narration rise and fade as that plate crossfades in; the Crystal-Mountain beat
 * ignites the seven chakra crystals; the Angelica "new friends" beat brings
 * Alina & Gino on as cameos; the final beat carries the buy CTA.
 *
 * Deliberately NOT Framer Motion: these are pure scroll→style mappings, not
 * animations. A single rAF loop writes opacity/transform straight to the
 * elements — no `motion.*` components, so Framer's WAAPI accelerated path (which
 * throws a benign "offsets must be monotonic" error racing the scroll values on
 * first paint) is never invoked. Float/bob use CSS keyframes; the global
 * prefers-reduced-motion rule neutralises those, and the rAF skips the y-rise.
 */

const N = JOURNEY.length;
const CENTER = (i: number) => (N > 1 ? i / (N - 1) : 0);
const HALF = N > 1 ? 1 / (N - 1) / 2 : 0.5;
const ARRIVAL = JOURNEY.findIndex((b) => b.chakraIgnite);

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const invlerp = (a: number, b: number, x: number) => (a === b ? 0 : clamp01((x - a) / (b - a)));
const smooth = (x: number) => x * x * (3 - 2 * x);

/** beat copy opacity — fade in/hold/out across the beat's scroll span */
function beatOpacity(p: number, c: number) {
  const inA = c - HALF;
  const inB = c - HALF * 0.4;
  const outA = c + HALF * 0.4;
  const outB = c + HALF;
  if (p <= inA || p >= outB) return 0;
  if (p < inB) return invlerp(inA, inB, p);
  if (p > outA) return 1 - invlerp(outA, outB, p);
  return 1;
}

export default function JourneyOverlays() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ?p=0..1 freezes the whole composed frame (canvas + copy) for QA + sharing,
    // mirroring the engine's own deep-link contract.
    const raw = new URLSearchParams(window.location.search).get("p");
    const pn = raw === null ? NaN : Number(raw);
    const forced = Number.isFinite(pn) ? clamp01(pn) : null;

    const beatEls = Array.from(root.querySelectorAll<HTMLElement>("[data-beat]"));
    const cardEls = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const orbEls = Array.from(root.querySelectorAll<HTMLElement>("[data-orb]"));
    const labelEls = Array.from(root.querySelectorAll<HTMLElement>("[data-label]"));
    const hintEl = root.querySelector<HTMLElement>("[data-hint]");

    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = forced !== null ? forced : max > 0 ? clamp01(window.scrollY / max) : 0;

      for (const el of beatEls) {
        const i = Number(el.dataset.beat);
        el.style.opacity = String(beatOpacity(p, CENTER(i)));
      }
      if (!reduce) {
        for (const el of cardEls) {
          const i = Number(el.dataset.card);
          const c = CENTER(i);
          const t = clamp01((p - (c - HALF)) / (2 * HALF)); // 0..1 across the beat
          el.style.transform = `translateY(${(1 - t * 2) * 48}px)`; // +48 → 0 → −48
        }
      }

      // chakra ignition over the arrival beat (root → crown, staggered)
      if (ARRIVAL >= 0) {
        const c = CENTER(ARRIVAL);
        const localP = invlerp(c - HALF, c + HALF, p);
        for (const el of orbEls) {
          const t0 = Number(el.dataset.orb);
          const k = smooth(invlerp(t0 - 0.06, t0 + 0.06, localP));
          el.style.opacity = String(0.18 + 0.82 * k);
          el.style.transform = `scale(${0.55 + 0.45 * k})`;
        }
        for (const el of labelEls) {
          const t0 = Number(el.dataset.label);
          el.style.opacity = String(invlerp(t0, t0 + 0.05, localP));
        }
      }

      if (hintEl) hintEl.style.opacity = String(1 - invlerp(0, 0.04, p));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      <ScrollHint />
      {JOURNEY.map((beat, i) => (
        <div key={beat.id} data-beat={i} className="absolute inset-0" style={{ opacity: 0 }}>
          {beat.sprites && <Cameos sprites={beat.sprites} />}
          {beat.chakraIgnite && <ChakraIgnition />}

          <div data-card={i} className="absolute inset-x-0 bottom-[11vh] flex justify-center px-6">
            <div className="glass-warm max-w-2xl rounded-2xl px-8 py-6 text-center shadow-[0_18px_50px_-20px_rgba(61,43,31,0.45)]">
              <p className="font-accent text-xl font-bold text-gold-dark">{beat.overlay.kicker}</p>
              <h2 className="font-heading mt-1 text-4xl font-semibold text-bark md:text-5xl">
                {beat.overlay.title}
              </h2>
              <p className="font-accent mx-auto mt-3 max-w-xl text-xl text-bark-light md:text-2xl">
                {beat.overlay.line}
              </p>

              {beat.cta && (
                <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/buy"
                    className="rounded-full bg-gold px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.1em] text-parchment transition-colors hover:bg-gold-dark"
                  >
                    Get the Book
                  </Link>
                  <Link
                    href="/story"
                    className="rounded-full border-2 border-gold/40 px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.1em] text-gold transition-colors hover:border-gold hover:bg-gold/[0.05]"
                  >
                    Explore the Story
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── character cameos (Alina & Gino on the "new friends" beat) ───────────── */

function Cameos({ sprites }: { sprites: NonNullable<(typeof JOURNEY)[number]["sprites"]> }) {
  // CSS float (globals `float` keyframe); global prefers-reduced-motion neutralises it.
  return (
    <>
      {sprites.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          aria-hidden
          style={{ animation: `float ${4 + i}s ease-in-out infinite` }}
          className={`absolute bottom-[26vh] h-auto w-[clamp(120px,18vw,260px)] drop-shadow-[0_12px_30px_rgba(61,43,31,0.35)] ${
            s.side === "left" ? "left-[5vw]" : "right-[5vw]"
          }`}
        />
      ))}
    </>
  );
}

/* ── the seven chakra crystals igniting over the Crystal Mountain ────────── */

function ChakraIgnition() {
  return (
    <div className="absolute inset-y-0 right-[6vw] flex flex-col-reverse items-center justify-center gap-3 md:right-[9vw] md:gap-4">
      {CHAKRAS.map((c, i) => {
        const t0 = 0.18 + i * 0.1; // ignite root → crown, staggered through the beat
        return (
          <div key={c.name} className="flex items-center gap-2">
            <span
              data-label={t0}
              style={{ opacity: 0 }}
              className="font-accent text-base text-parchment drop-shadow-[0_1px_4px_rgba(61,43,31,0.8)] md:text-lg"
            >
              {c.name}
            </span>
            <span
              data-orb={t0}
              aria-hidden
              style={{
                opacity: 0.18,
                transform: "scale(0.55)",
                backgroundColor: c.colour,
                boxShadow: `0 0 18px 4px ${c.colour}, 0 0 6px 1px ${c.colour}`,
              }}
              className="block h-4 w-4 rounded-full md:h-5 md:w-5"
            />
          </div>
        );
      })}
    </div>
  );
}

/* ── gentle "scroll to begin" hint on the first beat ─────────────────────── */

function ScrollHint() {
  return (
    <div
      data-hint
      className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-bark-light"
    >
      <span className="font-accent text-lg">scroll to begin the journey</span>
      {/* CSS bob (globals `gentle-bob`); global reduced-motion rule neutralises it */}
      <span
        aria-hidden
        style={{ animation: "gentle-bob 1.8s ease-in-out infinite" }}
        className="text-2xl leading-none text-gold"
      >
        ↓
      </span>
    </div>
  );
}
