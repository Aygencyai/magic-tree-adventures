import type { Metadata } from "next";
import ExperienceMount from "@/experience/ExperienceMount";

export const metadata: Metadata = {
  title: "Enter Angelica — The Magic Tree Adventures",
  description:
    "Step through the golden door into Angelica — an immersive journey through the world of The Magic Tree Adventures.",
};

// Phase 0 spike route. The full journey replaces the homepage in later phases.
export default function ExperiencePage() {
  return <ExperienceMount />;
}
