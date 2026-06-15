import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ChakraExplorer from "@/components/chakras/ChakraExplorer";
import { CHAKRAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Chakras",
  description:
    "Discover the seven chakras woven through The Magic Tree Adventures. An interactive, child-friendly guide to the seven energy centres.",
};

export default function ChakrasPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-cloud-pink/20 via-parchment to-parchment relative overflow-hidden">
        {/* Decorative background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-[10%] w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#E05555" }}
          />
          <div
            className="absolute top-32 right-[15%] w-24 h-24 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: "#8B5DC8" }}
          />
          <div
            className="absolute bottom-10 left-[40%] w-28 h-28 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: "#5DBB63" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-bark leading-[1.05]">
              Discover the Chakras
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg md:text-xl text-bark-light max-w-2xl mx-auto leading-relaxed">
              Chakras are little colourful energy spots inside you, helping you
              feel balanced and happy. In The Magic Tree Adventures, each chakra
              is part of the journey.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex justify-center gap-2.5 mt-8">
              {CHAKRAS.map((chakra) => (
                <a
                  key={chakra.name}
                  href={`#chakra-${chakra.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-7 h-7 rounded-full transition-transform duration-200 hover:scale-125"
                  style={{ backgroundColor: chakra.colour }}
                  title={`${chakra.name} — ${chakra.meaning}`}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-4 text-sm text-bark-muted">
              Scroll down to explore each chakra, or click a colour to jump ahead
            </p>
          </Reveal>
        </div>
      </section>

      {/* Scrollytelling Explorer */}
      <ChakraExplorer />

      {/* Rainbow Complete — closing section */}
      <section className="section-padding bg-gradient-to-b from-parchment to-parchment-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            {/* Full rainbow bar */}
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
            <p className="text-bark-light text-lg md:text-xl mb-4 max-w-xl mx-auto leading-relaxed">
              When your chakras are happy, you feel good inside. The Magic Tree
              Adventures is here to help every child discover their inner
              rainbow.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="font-accent text-gold text-xl mb-8 max-w-lg mx-auto">
              &ldquo;Every child has a voice. Some are loud, like a
              lion&rsquo;s roar. Some are quiet, like a whisper on the wind. But
              every single one matters.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/buy">Buy the Book</Button>
              <Button href="/" variant="secondary">
                Enter the Journey
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
