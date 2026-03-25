import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export default function SectionContainer({
  children,
  className,
  id,
  dark = false,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        dark ? "bg-forest-dark text-parchment" : "bg-parchment",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">{children}</div>
    </section>
  );
}
