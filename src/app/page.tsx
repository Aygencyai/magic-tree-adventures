import Hero from "@/components/home/Hero";
import GoldenDoor from "@/components/home/GoldenDoor";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TiltCard from "@/components/ui/TiltCard";
import CharacterCards from "@/components/home/CharacterCards";
import StoryTeaser from "@/components/home/StoryTeaser";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";
import { CREATORS, CHAKRAS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — parallax illustrated scene with floating particles */}
      <Hero />

      {/* 2. The World Awaits — interactive golden door */}
      <GoldenDoor />

      {/* 3. Welcome to Angelica — three vignettes */}
      <SectionContainer className="bg-parchment-dark">
        <SectionHeading
          title="Welcome to Angelica"
          subtitle="Beyond the golden door lies a world of wonder"
        />
        <Reveal>
          <p className="text-center text-lg text-bark-light max-w-3xl mx-auto leading-relaxed">
            Beyond the golden door lies Angelica — a world of golden hills,
            crystal mountains, and angels who have been waiting for you. Three
            children step through and discover that the most powerful magic of
            all lives inside every one of us.
          </p>
        </Reveal>

        {/* Three vignettes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Golden Hills",
              description:
                "Rolling valleys bathed in warm light, where the adventure begins.",
              gradient: "from-gold/10 to-gold/[0.03]",
              icon: (
                <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                  <path
                    d="M4 38 Q12 20 24 28 Q36 16 44 38"
                    stroke="#C8963E"
                    strokeWidth="1.5"
                    fill="#C8963E"
                    fillOpacity="0.15"
                  />
                  <circle
                    cx="36"
                    cy="14"
                    r="5"
                    stroke="#E8C778"
                    strokeWidth="1.5"
                    fill="#E8C778"
                    fillOpacity="0.2"
                  />
                </svg>
              ),
            },
            {
              title: "The Blue Lake",
              description:
                "A lake of pure blue, crossed by Otter Joe's ferry through stormy seas.",
              gradient: "from-crystal/10 to-crystal/[0.03]",
              icon: (
                <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                  <path
                    d="M4 28 Q10 22 16 28 Q22 22 28 28 Q34 22 40 28 Q46 22 48 28"
                    stroke="#5B8FD4"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M8 32 Q14 26 20 32 Q26 26 32 32 Q38 26 44 32"
                    stroke="#5B8FD4"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    fill="none"
                  />
                  <path
                    d="M20 14 L24 8 L28 14 L24 38"
                    stroke="#8B7355"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              ),
            },
            {
              title: "Crystal Mountain",
              description:
                "A glittering mountain of rainbow crystals, where voices are found.",
              gradient: "from-sky-lavender/15 to-sky-lavender/[0.03]",
              icon: (
                <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                  <path
                    d="M24 6 L38 34 L42 44 L6 44 L10 34Z"
                    stroke="#C8B8E8"
                    strokeWidth="1.5"
                    fill="#C8B8E8"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M24 6 L24 44"
                    stroke="#C8B8E8"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                  <path
                    d="M24 6 L38 34"
                    stroke="#B8D4F0"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                  />
                </svg>
              ),
            },
          ].map((vignette, i) => (
            <Reveal key={vignette.title} delay={i * 0.12}>
              <TiltCard glowOnTilt>
                <div
                  className={`bg-gradient-to-b ${vignette.gradient} rounded-2xl p-8 border border-gold/[0.08] h-full`}
                >
                  <div className="mb-4">{vignette.icon}</div>
                  <h3 className="font-heading text-xl font-semibold text-bark mb-2">
                    {vignette.title}
                  </h3>
                  <p className="text-bark-light text-sm leading-relaxed">
                    {vignette.description}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </SectionContainer>

      {/* 4. Meet the Adventurers — character cards with personality animations */}
      <CharacterCards />

      {/* 5. The Chakra Thread */}
      <SectionContainer>
        <SectionHeading
          title="The Magic Inside Every Child"
          subtitle="Discover the seven chakras woven through the story"
        />
        <Reveal>
          <div className="flex justify-center gap-1.5 mb-8">
            {CHAKRAS.map((chakra) => (
              <div
                key={chakra.name}
                className="h-2.5 flex-1 max-w-16 rounded-full transition-all duration-300 hover:h-4 hover:max-w-20"
                style={{ backgroundColor: chakra.colour }}
                title={`${chakra.name} Chakra — ${chakra.meaning}`}
              />
            ))}
          </div>
          <p className="text-center text-lg text-bark-light max-w-2xl mx-auto leading-relaxed">
            This is not just a story about magic — it is about the magic inside
            every child. Seven colourful energy centres, seven adventures, seven
            ways to discover who you truly are.
          </p>
          <div className="text-center mt-8">
            <Button href="/chakras" variant="secondary">
              Discover the Chakras
            </Button>
          </div>
        </Reveal>
      </SectionContainer>

      {/* 6. Story Teaser — page turn effect */}
      <StoryTeaser />

      {/* 7. People Behind the Magic */}
      <SectionContainer className="bg-parchment-dark">
        <SectionHeading
          title="The People Behind the Magic"
          subtitle="A story sixty years in the making"
        />
        <Reveal>
          <p className="text-center text-lg text-bark-light max-w-3xl mx-auto leading-relaxed mb-12">
            In 1964, a four-year-old girl moved to a new home with an old apple
            tree at the bottom of the garden. Her father, Poppa Stan, told her
            the tree was magic. Those bedtime stories were passed down through
            four generations — and now, they are yours to share.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CREATORS.map((creator, i) => (
            <Reveal key={creator.name} delay={i * 0.12}>
              <div className="bg-parchment rounded-2xl p-8 shadow-card text-center">
                <div className="w-20 h-20 rounded-full bg-parchment-dark mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-2xl text-bark-muted">
                    {creator.name[0]}
                  </span>
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
        <Reveal delay={0.3}>
          <div className="text-center mt-8">
            <Button href="/about" variant="secondary">
              Read the Full Story
            </Button>
          </div>
        </Reveal>
      </SectionContainer>

      {/* 8. Reviews */}
      <Reviews />

      {/* 9. Newsletter */}
      <Newsletter />
    </>
  );
}
