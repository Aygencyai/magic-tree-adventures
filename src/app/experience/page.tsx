import type { Metadata } from "next";
import Experience from "@/experience/Experience";
import { HOME_JOURNEY } from "@/experience/engine/scenes";

export const metadata: Metadata = {
  title: "Enter Angelica — The Magic Tree Adventures",
  description:
    "Step through the golden door into Angelica — an immersive journey through the world of The Magic Tree Adventures.",
};

// Journey-only route (no conversion tail) — handy for ?p= QA + sharing.
export default function ExperiencePage() {
  return <Experience journey={HOME_JOURNEY} />;
}
