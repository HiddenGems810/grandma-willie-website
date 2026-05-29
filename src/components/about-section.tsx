import Image from "next/image";
import { Home, Heart, Utensils } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";

const iconMap = {
  home: Home,
  heart: Heart,
  utensils: Utensils,
} as const;

export function AboutSection() {
  const { bio, brand } = grandmaWillieContent;

  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12"
      style={{ background: "var(--color-cast-iron)" }}
    >
      {/* Warm ambient glows for dark brand depth */}
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

        {/* ── Left: Tactile Quote Card (Upgraded contrast & breathing room) ── */}
        <div className="order-2 lg:order-1">
          <div
            className="relative overflow-hidden rounded-[var(--radius-card)] p-8 ring-1 ring-white/10"
            style={{ background: "color-mix(in srgb, var(--color-cast-iron) 80%, var(--color-warm-brown) 20%)" }}
          >
            {/* Stamped gold accent ring */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-[var(--color-gold)] opacity-12"
              aria-hidden="true"
            />

            {/* Wordmark logo — resized for lighter weight and balanced breathing room */}
            <div className="relative mb-8 flex justify-start">
              <Image
                src="/logos/grandma-willie-wordmark-light.png"
                alt={brand.logoAlt}
                width={260}
                height={116}
                className="h-auto w-full max-w-[210px] opacity-90"
              />
            </div>

            {/* Quote with upgraded typography and high readability */}
            <blockquote
              className="relative border-l-4 border-[var(--color-gold)] pl-6"
            >
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

            {/* Mascot portrait inset */}
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

        {/* ── Right: Cookbook-style Story notes (Upgraded from SaaS features) ── */}
        <div className="order-1 lg:order-2">
          <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[var(--color-gold)]">
            {bio.eyebrow}
          </p>

          <h2
            className="mt-4 leading-[0.92] text-[var(--color-cream)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            }}
          >
            {bio.title}
          </h2>

          <p className="mt-6 text-[1.05rem] leading-[1.8] text-[color-mix(in_srgb,var(--color-cream)_80%,transparent)]">
            {bio.body}
          </p>

          {/* Cookbook/Story Notes Stack */}
          <div className="mt-10 grid gap-5">
            {bio.values.map((value, idx) => {
              const Icon = iconMap[value.icon];
              const rotation = idx % 2 === 0 ? "sm:rotate-[0.3deg]" : "sm:-rotate-[0.3deg]";
              const translation = idx % 3 === 0 ? "lg:-translate-x-1" : idx % 3 === 1 ? "lg:translate-x-1" : "lg:-translate-x-2";
              return (
                <div
                  key={value.label}
                  className={`group relative flex flex-col sm:flex-row items-start gap-4 rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.22)] border border-[var(--color-border-dark)] transition duration-300 hover:scale-[1.01] hover:rotate-0 ${rotation} ${translation}`}
                  style={{ background: "var(--color-paper)" }}
                >
                  {/* Stamped note counter */}
                  <div className="absolute top-4 right-5 text-[0.62rem] font-black tracking-[0.16em] text-[var(--color-muted)] select-none">
                    KITCHEN NOTE #{String(idx + 1).padStart(2, "0")}
                  </div>
                  
                  {/* Stamped-style tomato icon badge */}
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-tomato)] text-white shadow-md border-2 border-[var(--color-paper)]">
                    <Icon size={20} aria-hidden="true" />
                  </span>

                  <div>
                    <h3
                      className="text-xl font-black text-[var(--color-cast-iron)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {value.label}
                    </h3>
                    <p className="mt-1 text-[0.95rem] leading-[1.6] text-[var(--color-warm-brown)]">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
