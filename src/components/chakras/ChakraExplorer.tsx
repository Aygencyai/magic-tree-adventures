"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CHAKRAS } from "@/lib/constants";
import ChakraProgress from "./ChakraProgress";
import ChakraSection from "./ChakraSection";

export default function ChakraExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rafId = useRef(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      CHAKRAS.forEach((chakra, i) => {
        const slug = chakra.name.toLowerCase().replace(/\s+/g, "-");
        const section = document.getElementById(`chakra-${slug}`);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return (
    <>
      <ChakraProgress activeIndex={activeIndex} />
      {CHAKRAS.map((chakra, i) => (
        <ChakraSection
          key={chakra.name}
          chakra={chakra}
          index={i}
          isActive={i === activeIndex}
        />
      ))}
    </>
  );
}
