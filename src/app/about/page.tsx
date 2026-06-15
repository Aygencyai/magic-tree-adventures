import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Experience from "@/experience/Experience";
import { ABOUT_JOURNEY } from "@/experience/engine/scenes";
import { CHAKRAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind The Magic Tree Adventures — sixty years of bedtime stories, from Poppa Stan to the world, brought to the page by author Sara Oberman Babai and illustrator Alejandra Barajas.",
};

/**
 * The About experience (Phase 6.2) — the sixty-year origin story as an immersive
 * scroll journey (the apple tree → the author → the illustrator → a Poppa Stan
 * close), replacing the old Framer hero/timeline. The WebGL journey is the hook;
 * the grounded tail below carries the real, crawlable copy — Poppa Stan's story,
 * the timeline, and the creator credits (author + illustrator with photos and
 * bios) — so SEO doesn't depend on the client-only canvas.
 *
 * Creator data is defined here, not pulled from `constants.ts` CREATORS: Louis
 * corrected the attribution (Sara = Author, Alejandra = Illustrator, Jools
 * dropped) and `constants.ts` is a protected content file.
 */

const TIMELINE = [
  {
    year: "1964",
    title: "The Apple Tree",
    description:
      "A four-year-old girl moves to a new home with an old apple tree at the bottom of the garden. Her father tells her the tree is magic.",
  },
  {
    year: "1980s",
    title: "Bedtime Stories",
    description:
      "The stories grow. Children, then grandchildren, fall asleep to tales of Angelica, golden doors, and angels with shimmering wings.",
  },
  {
    year: "2010s",
    title: "Great-Grandchildren",
    description:
      "A new generation discovers the magic tree. Rory, Riley, and Tilly become the heroes of the stories — named after real great-grandchildren.",
  },
  {
    year: "2021",
    title: "Poppa Stan",
    description:
      "Poppa Stan passes away at the age of 93. The family vows to share his stories with the world, so every child can find their voice.",
  },
  {
    year: "Now",
    title: "Book One",
    description:
      "Journey to the Crystal Mountain is published — the first book in The Magic Tree Adventures series, dedicated to Poppa Stan's loving memory.",
  },
];

const TEAM = [
  {
    name: "Sara Oberman Babai",
    role: "Author",
    photo: "/about/author-sara-oberman-babai.png",
    bio: "A grandmother, clairvoyant medium, and psychic who spent over thirty years guiding others to trust their intuition. She wove the wisdom of the chakras into gentle, magical tales that inspire children to see the world with love and wonder.",
  },
  {
    name: "Alejandra Barajas",
    role: "Illustrator",
    photo: "/about/author-alejandra-barajas.png",
    bio: "A Mexican illustrator and Fine Arts graduate from the University of Guanajuato. She creates imaginative worlds that express deep emotions and connect with viewers, bringing the land of Angelica to vivid life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Experience journey={ABOUT_JOURNEY} />

      {/* Grounded tail — opaque, sits above the released sticky canvas. Real DOM
          copy for crawlers + reduced-motion users + the conversion close. */}
      <div id="conversion-tail" className="relative z-20 bg-parchment">
        {/* Poppa Stan's Story */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px flex-1 bg-gold/20" />
                <p className="font-accent text-gold text-lg whitespace-nowrap">
                  In loving memory of Poppa Stan
                </p>
                <div className="h-px flex-1 bg-gold/20" />
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal>
                <p className="text-lg text-bark-light leading-relaxed">
                  In 1964, a four-year-old girl moved with her family to a new
                  home. It was a lovely house with creaky floors and wooden
                  panels on the walls. But what made it special — what truly made
                  it feel like home — was the garden.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-lg text-bark-light leading-relaxed">
                  At the bottom of that garden, tucked behind overgrown bushes
                  and the prettiest wildflowers, stood an old apple tree. The
                  tree had been there for as long as anyone could remember, its
                  trunk knobbly and twisted, growing in every direction.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <blockquote className="border-l-4 border-gold/40 pl-6 py-2 my-8">
                  <p className="font-accent text-gold text-xl md:text-2xl leading-relaxed">
                    &ldquo;If you listen closely on a quiet night, you can hear
                    its whispers, like the wind gently blowing.&rdquo;
                  </p>
                  <p className="text-bark-muted text-sm mt-2">&mdash; Poppa Stan</p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="text-lg text-bark-light leading-relaxed">
                  Those bedtime stories were passed down through four generations
                  — enchanting children, grandchildren, and great-grandchildren.
                  Each telling added new details, new characters, new adventures.
                  But the heart of it never changed: a magic tree, a golden door,
                  and a world where every child&rsquo;s voice matters.
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <p className="text-lg text-bark-light leading-relaxed">
                  In 2021, Poppa Stan passed away at the age of 93. These books
                  are dedicated to his loving memory and the wonderful, magical
                  stories that brought light and laughter into so many lives.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-parchment-dark">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-bark">
                  Sixty Years of Magic
                </h2>
                <p className="font-accent text-gold text-xl mt-3">
                  From bedtime stories to the bookshelf
                </p>
              </div>
            </Reveal>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gold/20" />

              {TIMELINE.map((event, i) => (
                <Reveal key={event.year} delay={i * 0.1}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-12 mb-12 last:mb-0 ${
                      i % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse md:text-right"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold ring-4 ring-parchment-dark z-10 mt-1.5" />

                    {/* Content */}
                    <div className="flex-1 pl-14 md:pl-0">
                      <span className="inline-block font-heading text-sm font-bold text-gold bg-gold/10 rounded-full px-3 py-0.5 mb-2">
                        {event.year}
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-bark">
                        {event.title}
                      </h3>
                      <p className="text-bark-light text-sm leading-relaxed mt-1">
                        {event.description}
                      </p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Team */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-bark">
                  The Creative Team
                </h2>
                <p className="font-accent text-gold text-xl mt-3">
                  Bringing Poppa Stan&rsquo;s stories to life
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {TEAM.map((person, i) => (
                <Reveal key={person.name} delay={i * 0.12}>
                  <div className="bg-parchment-dark rounded-2xl p-8 shadow-card text-center hover:shadow-card-hover transition-shadow duration-300 h-full">
                    {/* Author photo in a soft circular frame */}
                    <div className="relative w-28 h-28 rounded-full mx-auto mb-5 overflow-hidden ring-4 ring-parchment shadow-[0_10px_30px_-12px_rgba(61,43,31,0.5)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={person.photo}
                        alt={`${person.name}, ${person.role}`}
                        className="w-full h-full object-cover object-[center_22%]"
                      />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-bark">
                      {person.name}
                    </h3>
                    <p className="font-accent text-gold mt-1">{person.role}</p>
                    <p className="text-bark-light mt-4 text-sm leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dedication */}
        <section className="section-padding bg-forest-dark">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <Reveal>
              <p className="font-accent text-gold-light text-lg mb-6">
                A dedication from the book
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="font-heading text-2xl md:text-3xl text-parchment leading-relaxed font-medium">
                &ldquo;For Poppa Stan, whose magical stories have been shared for
                over sixty years. You taught us that every child has a voice, and
                every voice deserves to be heard.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex justify-center gap-1.5 mt-10">
                {CHAKRAS.map((chakra) => (
                  <div
                    key={chakra.name}
                    className="w-2 h-2 rounded-full opacity-60"
                    style={{ backgroundColor: chakra.colour }}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* What's Next */}
        <section className="section-padding bg-gradient-to-b from-parchment to-parchment-dark">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark mb-4">
                Book One is Just the Beginning
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-bark-light text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                The Magic Tree Adventures is a series. Each book guides children
                through a different chakra — a different way to discover who they
                truly are.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/buy">Get Book One</Button>
                <Button href="/chakras" variant="secondary">
                  Explore the Chakras
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
