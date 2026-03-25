"use client";

interface GoldenGlowProps {
  size?: number;
  opacity?: number;
  className?: string;
}

export default function GoldenGlow({
  size = 400,
  opacity = 0.15,
  className,
}: GoldenGlowProps) {
  return (
    <div className={className} aria-hidden="true">
      <div
        style={{
          width: size,
          height: size,
          maxWidth: "80vw",
          maxHeight: "80vw",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(200, 150, 62, ${opacity}) 0%, rgba(232, 199, 120, ${opacity * 0.4}) 35%, rgba(200, 150, 62, ${opacity * 0.1}) 60%, transparent 75%)`,
          filter: "blur(25px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
