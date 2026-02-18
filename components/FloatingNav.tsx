"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FloatingNavProps {
  links: { href: string; label: string }[];
}

export default function FloatingNav({ links }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const past = window.scrollY > 64;
      setScrolled(past);
      if (!past) setOpen(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Toggle button — appears fixed on right when scrolled past header */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 shadow-lg transition-all duration-300 hover:bg-zinc-800 hover:text-white ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Toggle navigation"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Header bar — slides down when button is clicked */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-md transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Desktop: single row */}
        <div className="mx-auto hidden h-16 max-w-6xl items-center justify-between px-6 md:flex">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-bold tracking-tight text-zinc-100">
            Made Wrong
          </Link>

          <nav className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile: logo + stacked links */}
        <div className="px-6 py-4 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-bold tracking-tight text-zinc-100">
            Made Wrong
          </Link>
          <nav className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
