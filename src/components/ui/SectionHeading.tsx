import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "font-heading text-3xl md:text-[2.75rem] font-semibold leading-tight",
          dark ? "text-parchment" : "text-bark"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 font-accent text-xl md:text-[22px]",
            dark ? "text-gold-light" : "text-gold"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
