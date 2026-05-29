"use client";

import { useState, useEffect } from "react";
import { Menu, X, CalendarDays } from "lucide-react";
import { grandmaWillieContent, navItems } from "@/content/grandma-willie";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-cream)_92%,white)] shadow-[0_4px_24px_rgba(64,31,10,0.08)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[var(--container)] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            aria-label="Grandma Willie — return to top"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[var(--color-butter)] ring-2 ring-[var(--color-border)] transition-transform hover:scale-105">
              <img
                src="/logos/grandma-willie-mascot.png"
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover object-top"
                aria-hidden="true"
              />
            </span>
            <span
              className="font-serif text-[1.1rem] font-black leading-none text-[var(--color-cast-iron)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {grandmaWillieContent.brand.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--color-warm-brown)] transition-colors duration-200 hover:text-[var(--color-tomato)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded pb-0.5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden min-h-[44px] items-center gap-2 rounded-full bg-[var(--color-cast-iron)] px-5 text-sm font-black text-[var(--color-cream)] shadow-[0_8px_24px_rgba(20,11,7,0.22)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[var(--color-tomato)] hover:shadow-[0_12px_32px_rgba(185,71,27,0.32)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] md:inline-flex"
          >
            <CalendarDays size={16} aria-hidden="true" />
            Book / Contact
          </a>

          {/* Mobile: book pill + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#contact"
              className="inline-flex min-h-[40px] items-center rounded-full bg-[var(--color-cast-iron)] px-4 text-xs font-black text-[var(--color-cream)] transition hover:bg-[var(--color-tomato)]"
            >
              Book
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-[var(--color-cast-iron)] transition hover:bg-[var(--color-butter)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-40 flex flex-col bg-[var(--color-cream)] pt-[76px] motion-safe:animate-[slideInDown_0.22s_ease-out]"
        >
          <nav
            className="flex flex-1 flex-col gap-1 px-6 pt-8"
            aria-label="Mobile navigation links"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[60px] items-center border-b border-[var(--color-border)] text-2xl font-black text-[var(--color-cast-iron)] transition-colors hover:text-[var(--color-tomato)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[var(--color-tomato)] px-8 text-base font-black text-white shadow-[var(--shadow-button)] transition hover:bg-[var(--color-tomato-dark)]"
            >
              <CalendarDays size={18} aria-hidden="true" />
              Book / Contact Grandma Willie
            </a>
          </nav>

          {/* Social quick links in mobile menu */}
          <div className="px-6 pb-10 pt-4 flex gap-3">
            <a
              href={grandmaWillieContent.socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center rounded-full border border-[var(--color-border-dark)] py-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-warm-brown)] transition hover:bg-[var(--color-butter)]"
            >
              TikTok
            </a>
            <a
              href={grandmaWillieContent.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center rounded-full border border-[var(--color-border-dark)] py-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-warm-brown)] transition hover:bg-[var(--color-butter)]"
            >
              Instagram
            </a>
          </div>
        </div>
      )}
    </>
  );
}
