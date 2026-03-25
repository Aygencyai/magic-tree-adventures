import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-bold text-sm uppercase tracking-[0.1em] rounded-full px-8 py-3.5 transition-all duration-200 active:scale-[0.97]";

  const variants = {
    primary:
      "bg-gold text-parchment hover:bg-gold-dark hover:shadow-glow-gold-sm",
    secondary:
      "border-2 border-gold/40 bg-transparent text-gold hover:border-gold hover:bg-gold/[0.05]",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}>
      {children}
    </button>
  );
}
