import Image from "next/image";
import { Home, Heart, Utensils } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";

const iconMap = {
  home: Home,
  heart: Heart,
  utensils: Utensils,
} as const;

export function AboutSection() {
  const { bio, brand } = grandmaWillieContent;

  return (
    <ScrollRevealSection
      id="about"
      className="relative overflow-hidden px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12"
      style={{ background: "var(--color-cast-iron)" }}
      aria-labelledby="about-heading"
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, var(--color-tomato) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[var(--container)] gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">

        {/* ── Left: Quote card ── */}
        <div
          data-reveal="left"
          className="order-2 lg:order-1"
        >
          <div
            className="relative overflow-hidden rounded-[var(--radius-card)] p-8 ring-1 ring-white/10 transition-transform duration-400 hover:-translate-y-1"
            style={{ background: "color-mix(in srgb, var(--color-cast-iron) 80%, var(--color-warm-brown) 20%)" }}
          >
            {/* Stamped gold ring accent */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-[var(--color-gold)] opacity-12"
              aria-hidden="true"
            />

            {/* Wordmark logo — SVG for crisp rendering at all screen densities */}
            <div className="relative mb-8 flex justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/grandma-willie-wordmark-light.svg"
                alt={brand.logoAlt}
                width={240}
                height={107}
                className="h-auto w-full max-w-[220px] opacity-95"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Quote */}
            <blockquote className="relative border-l-4 border-[var(--color-gold)] pl-6">
              <p
                className="text-3xl font-black leading-snug text-[var(--color-cream)] sm:text-4xl"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                &ldquo;{bio.quote}&rdquo;
              </p>
              <footer className="mt-4 text-[0.72rem] font-black uppercase tracking-[0.2em] text-[var(--color-gold)]">
                — Grandma Willie
              </footer>
            </blockquote>

            {/* Portrait inset */}
            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[var(--color-gold)] ring-offset-2 ring-offset-[var(--color-cast-iron)]">
                <Image
                  src={brand.mascot}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p
                  className="text-base font-black text-[var(--color-cream)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Grandma Willie
                </p>
                <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  Alabama Homestyle Cook
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Story notes ── */}
        <div
          data-reveal="right"
          className="reveal-delay-1 order-1 lg:order-2"
        >
          <p className="text-[0.72rem] font-black uppercase tracking-[0.26em] text-[var(--color-gold)]">
            {bio.eyebrow}
          </p>

          <h2
            id="about-heading"
            className="mt-4 leading-[0.92] text-[var(--color-cream)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            }}
          >
            {bio.title}
          </h2>

          <p className="mt-6 text-[1.05rem] leading-[1.85] text-[color-mix(in_srgb,var(--color-cream)_82%,transparent)]">
            {bio.body}
          </p>

          {/* Cookbook story note cards */}
          <div className="mt-10 grid gap-4">
            {bio.values.map((value, idx) => {
              const Icon = iconMap[value.icon];
              const rotations = ["sm:rotate-[0.3deg]", "sm:-rotate-[0.3deg]", "sm:rotate-[0.2deg]"];
              const offsets = ["lg:-translate-x-1", "lg:translate-x-1", "lg:-translate-x-2"];
              return (
                <div
                  key={value.label}
                  data-reveal
                  className={`reveal-delay-${idx + 2} group relative flex flex-col sm:flex-row items-start gap-4 rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.22)] border border-[var(--color-border-dark)] card-lift ${rotations[idx % 3]} ${offsets[idx % 3]}`}
                  style={{ background: "var(--color-paper)" }}
                >
                  {/* Note stamp */}
                  <div className="absolute top-4 right-5 text-[0.6rem] font-black tracking-[0.18em] text-[var(--color-muted)] select-none opacity-60">
                    NOTE #{String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Icon badge */}
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-tomato)] text-white shadow-md border-2 border-[var(--color-paper)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={20} aria-hidden="true" />
                  </span>

                  <div>
                    <h3
                      className="text-xl font-black text-[var(--color-cast-iron)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {value.label}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] leading-[1.65] text-[var(--color-warm-brown)]">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
