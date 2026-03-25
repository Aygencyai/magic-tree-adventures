import type { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { CHARACTERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "Discover the world of Angelica, meet Rory, Riley, and Tilly, and follow their journey to the Crystal Mountain.",
};

export default function StoryPage() {
  return (
    <>
      {/* Story Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-sky-lavender/20 to-parchment">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-accent text-lg text-gold mb-4">
              Book One of The Magic Tree Adventures
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-bark leading-[1.05]">
              Journey to the Crystal Mountain
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-6 text-lg md:text-xl text-bark-light max-w-2xl mx-auto leading-relaxed">
              Three children discover a magic apple tree that opens a golden door
              to Angelica — a world where finding your voice means finding
              yourself.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Synopsis */}
      <SectionContainer>
        <SectionHeading title="The Story" subtitle="Where the adventure begins" />
        <div className="max-w-3xl mx-auto space-y-6">
          <Reveal>
            <p className="text-lg text-bark-light leading-relaxed">
              At the bottom of a garden, tucked behind overgrown bushes and the
              prettiest wildflowers, stands an old apple tree. Its trunk is
              knobbly and twisted, growing in every direction. But to the
              children who live here — shy Rory, fearless Riley, and cool Tilly
              — it is perfect.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-bark-light leading-relaxed">
              One autumn day, the tree begins to glow. The bark shimmers as if
              made of liquid gold. A door appears in a shining halo of light.
              And when it creaks open, the three children step through into a
              world none of them could have imagined.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-bark-light leading-relaxed">
              In Angelica, golden hills roll into green valleys, a lake of pure
              blue stretches to a glittering crystal mountain, and the sky is
              wrapped in lavender and candy-floss clouds. Here, angels guide
              those who seek to find their voice — and a gentle lion named Gino
              needs a friend who understands what it means to roar.
            </p>
          </Reveal>
        </div>
      </SectionContainer>

      {/* Characters */}
      <SectionContainer className="bg-parchment-dark">
        <SectionHeading title="Meet the Adventurers" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHARACTERS.map((character, i) => (
            <Reveal key={character.name} delay={i * 0.1}>
              <div className="bg-parchment rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <h3 className="font-heading text-xl font-semibold text-bark">
                  {character.name}
                </h3>
                <p className="font-accent text-gold mt-1">{character.role}</p>
                <p className="text-bark-light mt-3 text-sm leading-relaxed">
                  {character.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>

      {/* Buy CTA */}
      <SectionContainer>
        <div className="text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark mb-4">
              Begin the Adventure
            </h2>
            <p className="text-bark-light text-lg mb-8 max-w-xl mx-auto">
              The golden door is waiting. Step through and discover the magic
              inside every child.
            </p>
            <Button href="/buy">Buy the Book</Button>
          </Reveal>
        </div>
      </SectionContainer>
    </>
  );
}
