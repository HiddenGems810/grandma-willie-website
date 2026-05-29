import Image from "next/image";
import { grandmaWillieContent, navItems } from "@/content/grandma-willie";

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function SiteFooter() {
  const { brand, socialLinks } = grandmaWillieContent;
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden px-5 pb-28 pt-14 text-[var(--color-cream)] sm:px-8 sm:pb-14 lg:px-12"
      style={{ background: "var(--color-cast-iron)" }}
    >
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[var(--container)]">

        {/* Top row: Brand + Nav + Socials */}
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-[1fr_auto_auto] sm:items-start sm:gap-16">

          {/* Brand */}
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded-lg"
              aria-label="Back to top"
            >
              <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/20">
                <Image
                  src={brand.mascot}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </span>
              <span
                className="text-xl font-black leading-none text-[var(--color-cream)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {brand.name}
              </span>
            </a>
            <p className="mt-4 max-w-[36ch] text-[0.9rem] leading-[1.7] text-[color-mix(in_srgb,var(--color-cream)_65%,transparent)]">
              Alabama roots, family warmth, and homestyle cooking made with love —
              shared across TikTok and Instagram.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-[var(--color-gold)] mb-4">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm font-medium text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)] transition hover:text-[var(--color-cream)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social links */}
          <div>
            <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-[var(--color-gold)] mb-4">
              Follow Along
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok — @will46shelby"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)] transition hover:text-[var(--color-cream)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/8 transition hover:bg-white/16">
                  <TikTokIcon />
                </span>
                @will46shelby
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram — grandmawillie184"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)] transition hover:text-[var(--color-cream)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/8 transition hover:bg-white/16">
                  <InstagramIcon />
                </span>
                grandmawillie184
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-[color-mix(in_srgb,var(--color-cream)_50%,transparent)]">
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <p className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--color-gold)] opacity-60">
            Alabama Homestyle Cooking
          </p>
        </div>
      </div>
    </footer>
  );
}
