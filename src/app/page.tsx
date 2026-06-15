import Experience from "@/experience/Experience";
import { HOME_JOURNEY } from "@/experience/engine/scenes";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";

/**
 * Homepage = the immersive journey, then a short conversion tail.
 *
 * The journey (sticky WebGL track) plays Book One's full arc and ends on its own
 * "Back to the Garden" buy CTA. As you scroll past the track it releases and the
 * grounded tail — reviews + newsletter — scrolls up to close the sale. Inner
 * pages (Story / Chakras / About / Buy) carry the deeper content; the homepage
 * is the hook. (The previous storybook homepage lives in git history.)
 */
export default function HomePage() {
  return (
    <>
      <Experience journey={HOME_JOURNEY} />

      {/* Conversion tail — opaque, sits above the released sticky canvas */}
      <div id="conversion-tail" className="relative z-20 bg-parchment">
        <Reviews />
        <Newsletter />
      </div>
    </>
  );
}
