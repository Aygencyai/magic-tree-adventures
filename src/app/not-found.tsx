import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";

export default function NotFound() {
  return (
    <SectionContainer className="min-h-[70vh] flex items-center">
      <div className="text-center max-w-lg mx-auto">
        <p className="font-accent text-6xl text-gold mb-4">404</p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-bark mb-4">
          Lost in the Garden
        </h1>
        <p className="text-bark-light text-lg leading-relaxed mb-8">
          It seems you have wandered off the path. Even the magic tree
          cannot find this page. Let us take you back to safety.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-sans font-bold text-sm uppercase tracking-[0.1em] rounded-full px-8 py-3.5 transition-all duration-200 active:scale-[0.97] bg-gold text-parchment hover:bg-gold-dark hover:shadow-glow-gold-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/story"
            className="inline-flex items-center justify-center font-sans font-bold text-sm uppercase tracking-[0.1em] rounded-full px-8 py-3.5 transition-all duration-200 active:scale-[0.97] border-2 border-gold/40 bg-transparent text-gold hover:border-gold hover:bg-gold/[0.05]"
          >
            Explore the Story
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
