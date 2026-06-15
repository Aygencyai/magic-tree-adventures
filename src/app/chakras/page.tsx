import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Experience from "@/experience/Experience";
import { CHAKRAS_JOURNEY } from "@/experience/engine/scenes";
import { CHAKRAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Chakras",
  description:
    "Discover the seven chakras woven through The Magic Tree Adventures — an immersive, child-friendly journey through the seven energy centres, from the Root to the Crown.",
};

/**
 * The Chakras experience (Phase 6.1) — an immersive scroll journey through the
 * seven energy centres (intro rainbow → Root … Crown), replacing the old
 * Framer ChakraExplorer. The WebGL journey is the hook; the grounded tail below
 * carries the real, crawlable chakra copy (names + affirmations) and the CTA, so
 * SEO doesn't depend on the client-only canvas.
 */
export default function ChakrasPage() {
  return (
    <>
      <Experience journey={CHAKRAS_JOURNEY} />

      {/* Grounded tail — opaque, sits above the released sticky canvas. Real DOM
          copy for crawlers + the conversion close. */}
      <div id="conversion-tail" className="relative z-20 bg-parchment">
        <section className="section-padding bg-gradient-to-b from-parchment to-parchment-dark">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <Reveal>
              {/* Full rainbow bar — the seven chakra colours */}
              <div className="flex justify-center gap-1.5 mb-10">
                {CHAKRAS.map((chakra) => (
                  <div
                    key={chakra.name}
                    className="h-3 flex-1 max-w-16 rounded-full"
                    style={{ backgroundColor: chakra.colour }}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-bark mb-4 leading-tight">
                Every Colour Lives Inside You
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-bark-light text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                When your chakras are happy, you feel good inside. The Magic Tree
                Adventures is here to help every child discover their inner
                rainbow.
              </p>
            </Reveal>

            {/* Crawlable summary of the seven chakras (SEO + reduced-motion users) */}
            <Reveal delay={0.25}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 text-left max-w-2xl mx-auto">
                {CHAKRAS.map((chakra) => (
                  <li
                    key={chakra.name}
                    className="flex items-center gap-3 rounded-2xl glass-warm px-5 py-3.5"
                  >
                    <span
                      aria-hidden
                      className="h-4 w-4 shrink-0 rounded-full"
                      style={{ backgroundColor: chakra.colour }}
                    />
                    <span className="text-bark">
                      <span className="font-heading font-semibold">{chakra.name}</span>
                      <span className="text-bark-muted"> — {chakra.meaning}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-accent text-gold text-xl mb-8 max-w-lg mx-auto">
                &ldquo;Every child has a voice. Some are loud, like a
                lion&rsquo;s roar. Some are quiet, like a whisper on the wind. But
                every single one matters.&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/buy">Buy the Book</Button>
                <Button href="/" variant="secondary">
                  Enter the Journey
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
