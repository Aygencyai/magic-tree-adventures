import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-forest-dark relative" role="contentinfo">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1 — Brand */}
          <div>
            <Link
              href="/"
              className="font-heading font-bold text-lg text-parchment tracking-tight"
            >
              The Magic Tree
            </Link>
            <p className="text-sm text-parchment/50 mt-4 leading-relaxed">
              A magical story about finding your voice, discovering your inner
              light, and the adventure of a lifetime.
            </p>
          </div>

          {/* Col 2 — Explore */}
          <nav aria-label="Footer navigation">
            <h3 className="uppercase tracking-[0.1em] text-xs font-sans font-bold text-parchment/70 mb-4">
              Explore
            </h3>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-parchment/40 hover:text-gold-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/buy"
                className="text-sm text-parchment/40 hover:text-gold-light transition-colors"
              >
                Buy the Book
              </Link>
            </div>
          </nav>

          {/* Col 3 — The Series */}
          <div>
            <h3 className="uppercase tracking-[0.1em] text-xs font-sans font-bold text-parchment/70 mb-4">
              The Series
            </h3>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-gold-light">
                Book One: Journey to the Crystal Mountain
              </span>
              <span className="text-sm text-parchment/40 italic">
                Book Two: Coming soon...
              </span>
            </div>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h3 className="uppercase tracking-[0.1em] text-xs font-sans font-bold text-parchment/70 mb-4">
              Connect
            </h3>
            <p className="text-sm text-parchment/40">
              For press enquiries, school visits, and book signings, please get
              in touch.
            </p>
          </div>
        </div>

        {/* Dedication */}
        <div className="mt-12 pt-8 border-t border-parchment/[0.08] text-center">
          <p className="font-accent text-lg text-gold-light/70 mb-6">
            Dedicated to the loving memory of Poppa Stan
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-parchment/30">
              &copy; 2026 The Magic Tree Adventures. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-parchment/30 hover:text-gold-light transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-parchment/30 hover:text-gold-light transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
