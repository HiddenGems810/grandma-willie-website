"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function RecipeCardDecor({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-2xl border border-[var(--color-border-dark)] bg-[var(--color-paper)] p-3 shadow-[var(--shadow-soft)] ${className}`}
      aria-hidden="true"
    >
      <div className="h-2.5 w-14 rounded-full bg-[var(--color-gold-soft)]" />
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-20 rounded-full bg-[var(--color-border-dark)] opacity-60" />
        <div className="h-1.5 w-16 rounded-full bg-[var(--color-border-dark)] opacity-40" />
        <div className="h-1.5 w-12 rounded-full bg-[var(--color-border-dark)] opacity-30" />
      </div>
    </div>
  );
}

export function HeroSection() {
  const { hero, socialStats, socialLinks } = grandmaWillieContent;
  const sectionRef = useScrollReveal();

  return (
    <section
      id="home"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative isolate overflow-hidden px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-28 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(145deg, var(--color-cream) 0%, var(--color-butter) 55%, color-mix(in srgb, var(--color-leaf-soft) 50%, var(--color-cream)) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-dark) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 right-0 -z-10 h-[600px] w-[600px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[var(--container)] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

        {/* ── Left: Copy ─────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-dark)] bg-white/50 px-4 py-1.5 text-[0.72rem] font-black uppercase tracking-[0.24em] text-[var(--color-tomato)] backdrop-blur-sm"
          >
            {hero.eyebrow}
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            data-reveal
            className="reveal-delay-1 mt-6 max-w-[760px] leading-[0.88] text-[var(--color-cast-iron)] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6.2vw, 4.8rem)",
            }}
          >
            Southern cooking,<br className="hidden sm:inline" />{" "}
            Alabama soul,<br className="hidden sm:inline" />{" "}
            and the kind of<br className="hidden sm:inline" />{" "}
            kitchen love people remember.
          </h1>

          {/* Body */}
          <p
            data-reveal
            className="reveal-delay-2 mt-6 max-w-[52ch] text-[1.05rem] leading-[1.8] text-[var(--color-warm-brown)] sm:text-[1.1rem]"
          >
            {hero.body}
          </p>

          {/* Social stats */}
          <div
            data-reveal
            className="reveal-delay-3 mt-8 flex flex-wrap gap-3"
          >
            {socialStats.map((stat) => (
              <div
                key={`${stat.source}-${stat.label}`}
                className="card-lift rounded-xl border border-[var(--color-border)] bg-white/60 px-5 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur"
              >
                <p
                  className="text-2xl font-black text-[var(--color-cast-iron)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            data-reveal
            className="reveal-delay-4 mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#contact"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[var(--color-tomato)] px-8 text-[0.95rem] font-black text-white shadow-[var(--shadow-button)] transition-all duration-250 hover:-translate-y-1 hover:bg-[var(--color-tomato-dark)] hover:shadow-[0_20px_48px_rgba(185,71,27,0.38)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {hero.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="Watch Grandma Willie's kitchen videos on TikTok (opens in new tab)"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border-2 border-[var(--color-cast-iron)] bg-transparent px-8 text-[0.95rem] font-black text-[var(--color-cast-iron)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[var(--color-cast-iron)] hover:text-[var(--color-cream)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              <Play size={17} aria-hidden="true" />
              {hero.secondaryCta}
            </a>
          </div>

          {/* Proof line */}
          <p
            data-reveal
            className="reveal-delay-5 mt-7 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[var(--color-muted)] opacity-70"
          >
            {hero.proofLine}
          </p>
        </div>

        {/* ── Right: Brand visual ── */}
        <div
          data-reveal="scale"
          className="reveal-delay-2 relative mx-auto w-full max-w-[26rem] pt-6 lg:max-w-none"
        >
          {/* Creator brand badge */}
          <div
            className="absolute -left-6 top-16 z-20 hidden rounded-2xl bg-[var(--color-cast-iron)] px-5 py-3.5 text-[var(--color-cream)] shadow-[var(--shadow-card)] sm:block transition-transform duration-300 hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-[var(--color-gold)]">
              Creator brand
            </p>
            <p
              className="mt-0.5 text-xl font-black leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Videos · Warmth · Booking
            </p>
          </div>

          {/* Floating food card with tilt on hover */}
          <div
            className="absolute -bottom-8 -left-6 z-20 w-[180px] rotate-[-4deg] overflow-hidden rounded-2xl border-2 border-[var(--color-border-dark)] bg-[var(--color-paper)] p-2.5 shadow-[var(--shadow-card)] transition-all duration-400 hover:rotate-0 hover:scale-105 hover:shadow-[var(--shadow-editorial)]"
            aria-hidden="true"
          >
            <div className="img-zoom-wrap relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/images/food-fried-chicken.png"
                alt="Golden crispy Alabama fried chicken from Grandma Willie's kitchen"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p
              className="mt-2 text-center text-xs font-black italic text-[var(--color-cast-iron)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alabama Fried Chicken
            </p>
          </div>

          {/* Decorative recipe card stacks */}
          <RecipeCardDecor className="-right-6 top-32 w-32 hidden lg:block motion-safe:animate-[driftSlow_9s_ease-in-out_infinite]" />

          {/* Main mascot card */}
          <div
            className="relative overflow-hidden rounded-[2.2rem] p-3.5 shadow-[var(--shadow-editorial)] ring-2 ring-[var(--color-border)] transition-transform duration-400 hover:-translate-y-1"
            style={{ background: "var(--color-paper)" }}
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 20%, var(--color-gold-soft), var(--color-butter) 60%, color-mix(in srgb, var(--color-leaf-soft) 40%, var(--color-butter)))",
              }}
            >
              <Image
                src={grandmaWillieContent.brand.mascot}
                alt="Grandma Willie brand mascot — illustrated woman holding a wooden spoon, wearing an apron"
                width={900}
                height={1148}
                className="h-full w-full object-contain object-bottom"
                priority
              />
            </div>
          </div>

          {/* Follow handle badge */}
          <div
            className="absolute -bottom-4 -right-2 z-20 rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-0.5"
            aria-label="Follow Grandma Willie on TikTok at @will46shelby"
          >
            <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Follow along
            </p>
            <p
              className="mt-0.5 text-lg font-black text-[var(--color-cast-iron)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              @will46shelby
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
