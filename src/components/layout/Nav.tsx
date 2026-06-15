"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Over an immersive journey track (homepage / experience) the nav stays
    // transparent across the whole journey and flips to the solid glass bar only
    // as the conversion tail begins. Elsewhere it flips early (scrollY >= 50).
    const onScroll = () => {
      const track = document.querySelector<HTMLElement>("[data-journey-track]");
      if (track) {
        const flip = track.offsetTop + track.offsetHeight - window.innerHeight * 1.2;
        setScrolled(window.scrollY >= flip);
      } else {
        setScrolled(window.scrollY >= 50);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-warm-strong shadow-nav"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading font-bold text-lg text-bark tracking-tight"
            >
              The Magic Tree
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative font-sans font-semibold text-sm uppercase tracking-[0.08em] transition-colors duration-200",
                    isActive(link.href)
                      ? "text-bark"
                      : "text-bark-muted hover:text-bark"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              ))}

              {/* Desktop CTA */}
              <Link
                href="/buy"
                className="bg-gold text-parchment font-sans font-bold text-sm uppercase tracking-[0.1em] rounded-full px-7 py-2.5 hover:bg-gold-dark hover:shadow-glow-gold-sm active:scale-[0.97] transition-all duration-200"
              >
                Buy the Book
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  "block w-6 h-[2px] bg-bark transition-all duration-300 origin-center",
                  mobileOpen && "translate-y-[4px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-[2px] bg-bark transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-[2px] bg-bark transition-all duration-300 origin-center",
                  mobileOpen && "-translate-y-[4px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>

        {/* Bottom border */}
        {!scrolled && (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        )}
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-parchment z-50 flex flex-col"
          >
            {/* Mobile header */}
            <div className="px-6">
              <div className="flex items-center justify-between py-4">
                <Link
                  href="/"
                  className="font-heading font-bold text-lg text-bark tracking-tight"
                  onClick={() => setMobileOpen(false)}
                >
                  The Magic Tree
                </Link>
                <button
                  className="relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="block w-6 h-[2px] bg-bark translate-y-[4px] rotate-45 transition-all duration-300 origin-center" />
                  <span className="block w-6 h-[2px] bg-bark opacity-0 transition-all duration-300" />
                  <span className="block w-6 h-[2px] bg-bark -translate-y-[4px] -rotate-45 transition-all duration-300 origin-center" />
                </button>
              </div>
              <div className="h-px w-full bg-gold/10" />
            </div>

            {/* Mobile links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-heading text-3xl text-bark font-semibold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: NAV_LINKS.length * 0.08,
                  ease: [0.25, 0.8, 0.25, 1],
                }}
                className="mt-4 w-full max-w-xs"
              >
                <Link
                  href="/buy"
                  className="block w-full text-center bg-gold text-parchment font-sans font-bold text-sm uppercase tracking-[0.1em] rounded-full px-8 py-4 hover:bg-gold-dark hover:shadow-glow-gold-sm active:scale-[0.97] transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Buy the Book
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
