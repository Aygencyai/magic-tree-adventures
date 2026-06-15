import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { SceneDef } from "./engine/scenes";
import { DEFAULT_CTA_BUTTONS } from "./engine/scenes";
import type { ExperienceIntro } from "./Experience";

/**
 * Calm vertical storybook fallback for the immersive journey.
 *
 * No WebGL, no scroll-scrubbing — just the same beats as a vertical storybook:
 * each painterly plate (contained, so the whole 16:9 picture is always visible)
 * with its Fraunces heading + Caveat narration beneath, and the buy CTA on the
 * closing beat. Same copy and art as the canvas journey. Phase 6 — takes any
 * page's `journey`.
 *
 * Two callers (see `Experience`):
 * - `prefers-reduced-motion` → `<StaticJourney journey={...} />` — byte-for-byte
 *   static, no autonomous motion.
 * - phones → `<StaticJourney journey={...} animated intro={...} />` — adds gentle
 *   scroll-reveal motion + a beat-1 scroll cue (the native-scroll mobile path).
 */
export default function StaticJourney({
  journey,
  animated = false,
  intro,
}: {
  journey: SceneDef[];
  animated?: boolean;
  intro?: ExperienceIntro;
}) {
  return (
    <div className="bg-parchment">
      {journey.map((beat, i) => {
        // eslint-disable-next-line @next/next/no-img-element
        const image = (
          <img
            src={beat.image}
            alt={beat.overlay.title}
            className="w-full rounded-2xl shadow-[0_18px_50px_-24px_rgba(61,43,31,0.45)]"
          />
        );

        const caption = (
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <p className="font-accent text-xl font-bold text-gold-dark">{beat.overlay.kicker}</p>
            <h2 className="font-heading mt-1 text-3xl font-semibold text-bark md:text-4xl">
              {beat.overlay.title}
            </h2>
            <p className="font-accent mx-auto mt-3 max-w-xl text-xl text-bark-light md:text-2xl">
              {beat.overlay.line}
            </p>
          </div>
        );

        const cta = beat.cta ? (
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3">
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
        ) : null;

        return (
          <section key={beat.id} className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
            {animated ? (
              <>
                <Reveal variant="slide">{image}</Reveal>
                <Reveal variant="fade-up" delay={0.12}>
                  {caption}
                </Reveal>
                {cta && <Reveal delay={0.2}>{cta}</Reveal>}
                {/* gentle scroll cue under beat 1 (homepage carries an `intro`) */}
                {i === 0 && intro && (
                  <div className="mt-8 flex flex-col items-center text-gold" aria-hidden>
                    <p className="font-accent text-xl font-bold text-gold-dark">
                      {intro.label ?? "scroll to explore"}
                    </p>
                    <span className="mt-1 flex flex-col items-center -space-y-2">
                      {[0, 1].map((c) => (
                        <span
                          key={c}
                          style={{ animation: `chevron-wave 1.4s ease-in-out ${c * 0.2}s infinite` }}
                          className="text-lg leading-none"
                        >
                          ↓
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                {image}
                {caption}
                {cta}
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
