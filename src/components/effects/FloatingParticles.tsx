"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({
  count = 24,
  className,
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 10,
        opacity: 0.2 + Math.random() * 0.4,
        drift: -30 + Math.random() * 60,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className={className} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(200, 150, 62, ${p.opacity}) 0%, rgba(232, 199, 120, ${p.opacity * 0.5}) 60%, transparent 100%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(200, 150, 62, ${p.opacity * 0.4})`,
            animation: `sparkle-drift ${p.duration}s ${p.delay}s ease-in-out infinite`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
