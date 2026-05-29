import { ArrowRight } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function BookingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

const cardIcons = {
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
  Contact: BookingIcon,
} as const;

const cardAccents = {
  TikTok:    { bg: "var(--color-cast-iron)", text: "var(--color-cream)", icon: "var(--color-gold)", hover: "var(--color-warm-brown)" },
  Instagram: { bg: "var(--color-tomato)", text: "white", icon: "white", hover: "var(--color-tomato-dark)" },
  Contact:   { bg: "var(--color-leaf)", text: "white", icon: "white", hover: "#224230" },
} as const;

export function FeaturedMoments() {
  const { follow, socialDestinations } = grandmaWillieContent;

  return (
    <section
      id="follow"
      className="relative overflow-hidden px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12"
      style={{ background: "var(--color-butter)" }}
    >
      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-dark) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[var(--container)]">
        {/* Header */}
        <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[var(--color-tomato)]">
          {follow.eyebrow}
        </p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="max-w-[20ch] leading-[0.92] text-[var(--color-cast-iron)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
            }}
          >
            {follow.headline}
          </h2>
          <p className="max-w-[40ch] text-[0.95rem] leading-[1.75] text-[var(--color-warm-brown)] sm:text-right">
            {follow.body}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {socialDestinations.map((dest) => {
            const Icon = cardIcons[dest.source];
            const accent = cardAccents[dest.source];
            const isExternal = dest.kind === "external";

            return (
              <article
                key={dest.title}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-editorial)]"
                style={{ background: accent.bg, color: accent.text }}
              >
                {/* Corner ring decoration */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border-[20px] opacity-15 transition group-hover:scale-125"
                  style={{ borderColor: accent.icon }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div style={{ color: accent.icon }}>
                  <Icon />
                </div>

                <h3
                  className="mt-6 text-2xl font-black leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: accent.text }}
                >
                  {dest.title}
                </h3>

                <p
                  className="mt-3 flex-1 text-[0.9rem] leading-[1.7]"
                  style={{ color: `color-mix(in srgb, ${accent.text} 80%, transparent)` }}
                >
                  {dest.description}
                </p>

                <a
                  href={dest.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="mt-7 inline-flex min-h-[46px] items-center gap-2.5 self-start rounded-full px-5 text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
                  style={{
                    background: `color-mix(in srgb, ${accent.text} 12%, transparent)`,
                    color: accent.text,
                    outline: `2px solid color-mix(in srgb, ${accent.text} 30%, transparent)`,
                  }}
                >
                  {dest.label}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
