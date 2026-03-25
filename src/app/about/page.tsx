import type { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { CREATORS, CHAKRAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind The Magic Tree Adventures — sixty years of bedtime stories, from Poppa Stan to the world.",
};

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

const CREATOR_ICONS: Record<string, React.ReactNode> = {
  Author: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold">
      <path
        d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Spiritual Guide": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  Illustrator: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold">
      <path
        d="M12 19l7-7 3 3-7 7-3-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gold/[0.08] to-parchment relative overflow-hidden">
        {/* Decorative tree silhouette */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-[0.03]">
          <svg viewBox="0 0 200 400" fill="currentColor" className="h-full w-full text-bark">
            <path d="M100 400 L100 200 Q60 180 40 140 Q20 100 40 60 Q60 20 100 10 Q140 0 160 40 Q180 80 170 120 Q160 160 140 180 Q120 200 120 400Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <p className="font-accent text-lg text-gold mb-4">
              A story sixty years in the making
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-bark leading-[1.05]">
              The Story Behind the Story
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-lg text-bark-light max-w-2xl mx-auto leading-relaxed">
              Before there was a book, there was a family. Before there was a
              family, there was a tree. And before there was a tree, there was a
              man called Poppa Stan who believed every child deserved to feel
              heard.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Poppa Stan's Story */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto">
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
                home. It was a lovely house with creaky floors and wooden panels
                on the walls. But what made it special — what truly made it feel
                like home — was the garden.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg text-bark-light leading-relaxed">
                At the bottom of that garden, tucked behind overgrown bushes and
                the prettiest wildflowers, stood an old apple tree. The tree had
                been there for as long as anyone could remember, its trunk
                knobbly and twisted, growing in every direction.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <blockquote className="border-l-4 border-gold/40 pl-6 py-2 my-8">
                <p className="font-accent text-gold text-xl md:text-2xl leading-relaxed">
                  &ldquo;If you listen closely on a quiet night, you can hear
                  its whispers, like the wind gently blowing.&rdquo;
                </p>
                <p className="text-bark-muted text-sm mt-2">
                  &mdash; Poppa Stan
                </p>
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
      </SectionContainer>

      {/* Timeline */}
      <SectionContainer className="bg-parchment-dark">
        <SectionHeading
          title="Sixty Years of Magic"
          subtitle="From bedtime stories to the bookshelf"
        />
        <div className="max-w-3xl mx-auto">
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
      </SectionContainer>

      {/* Creative Team */}
      <SectionContainer>
        <SectionHeading
          title="The Creative Team"
          subtitle="Three women bringing Poppa Stan's stories to life"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {CREATORS.map((creator, i) => (
            <Reveal key={creator.name} delay={i * 0.12}>
              <div className="bg-parchment-dark rounded-2xl p-8 shadow-card text-center hover:shadow-card-hover transition-shadow duration-300">
                {/* Avatar with role icon */}
                <div className="relative w-24 h-24 rounded-full bg-parchment mx-auto mb-5 flex items-center justify-center">
                  <span className="font-heading text-3xl font-semibold text-bark-muted">
                    {creator.name[0]}
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-parchment-dark border-2 border-parchment flex items-center justify-center">
                    {CREATOR_ICONS[creator.role]}
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-bark">
                  {creator.name}
                </h3>
                <p className="font-accent text-gold mt-1">{creator.role}</p>
                <p className="text-bark-light mt-4 text-sm leading-relaxed">
                  {creator.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>

      {/* Dedication */}
      <SectionContainer dark>
        <div className="max-w-3xl mx-auto text-center">
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
      </SectionContainer>

      {/* What's Next */}
      <SectionContainer>
        <div className="text-center">
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
      </SectionContainer>
    </>
  );
}
