import Link from "next/link";
import type { SceneDef } from "./engine/scenes";
import { DEFAULT_CTA_BUTTONS } from "./engine/scenes";

/**
 * prefers-reduced-motion fallback for the immersive journey.
 *
 * No WebGL, no scroll-scrubbing, no autonomous motion — just the same beats as a
 * calm vertical storybook: each painterly plate with its Fraunces heading +
 * Caveat narration beneath, and the buy CTA on the closing beat. Same copy and
 * art as the canvas journey, so reduced-motion users get the full story without
 * the parallax/particles/portal. Phase 6 — takes any page's `journey`.
 */
export default function StaticJourney({ journey }: { journey: SceneDef[] }) {
  return (
    <div className="bg-parchment">
      {journey.map((beat) => (
        <section
          key={beat.id}
          className="mx-auto max-w-5xl px-6 py-12 lg:py-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beat.image}
            alt={beat.overlay.title}
            className="w-full rounded-2xl shadow-[0_18px_50px_-24px_rgba(61,43,31,0.45)]"
          />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <p className="font-accent text-xl font-bold text-gold-dark">{beat.overlay.kicker}</p>
            <h2 className="font-heading mt-1 text-3xl font-semibold text-bark md:text-4xl">
              {beat.overlay.title}
            </h2>
            <p className="font-accent mx-auto mt-3 max-w-xl text-xl text-bark-light md:text-2xl">
              {beat.overlay.line}
            </p>
            {beat.cta && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {(beat.ctaButtons ?? DEFAULT_CTA_BUTTONS).map((b) => (
                  <Link
                    key={b.label}
                    href={b.href}
                    className={
                      b.variant === "primary"
                        ? "rounded-full bg-gold px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.1em] text-parchment transition-colors hover:bg-gold-dark"
                        : "rounded-full border-2 border-gold/40 px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.1em] text-gold transition-colors hover:border-gold hover:bg-gold/[0.05]"
                    }
                  >
                    {b.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
