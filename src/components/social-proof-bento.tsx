"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Play, Eye } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const categories = grandmaWillieContent.social.categories;

function TikTokIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  );
}

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-8 w-8 animate-spin text-[var(--color-tomato)]" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

// Curated food preview cards from approved banner imagery
const foodPreviews = [
  {
    image: "/images/01.png",
    title: "Crispy Skillet Fried Chicken",
    label: "Homestyle Meals",
    views: "1.2M views",
    platform: "TikTok",
  },
  {
    image: "/images/02.png",
    title: "Fresh Baked Cornbread",
    label: "Kitchen Stories",
    views: "840K views",
    platform: "TikTok",
  },
  {
    image: "/images/03.png",
    title: "Alabama Collard Greens",
    label: "Southern Comfort",
    views: "620K views",
    platform: "Instagram",
  },
  {
    image: "/images/04.png",
    title: "Homemade Peach Cobbler",
    label: "Family Table",
    views: "1.5M views",
    platform: "TikTok",
  },
];

export function SocialProofBento() {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const { social, socialLinks, socialStats } = grandmaWillieContent;
  const sectionRef = useScrollReveal();

  return (
    <section
      id="videos"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12"
      style={{ background: "var(--color-paper)" }}
      aria-labelledby="videos-heading"
    >
      {/* Top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[var(--container)]">

        {/* Section header */}
        <div
          data-reveal
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.26em] text-[var(--color-tomato)]">
              {social.eyebrow}
            </p>
            <h2
              id="videos-heading"
              className="mt-3 leading-[0.92] text-[var(--color-cast-iron)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              }}
            >
              {social.headline}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[1.0rem] leading-[1.75] text-[var(--color-warm-brown)] lg:text-right">
            {social.body}
          </p>
        </div>

        {/* Content category tags */}
        <div
          data-reveal
          className="reveal-delay-1 mt-6 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-[var(--color-border-dark)] bg-[var(--color-cream)] px-4 py-1.5 text-[0.72rem] font-black uppercase tracking-[0.14em] text-[var(--color-warm-brown)]"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Bento grid */}
        <div
          data-reveal="scale"
          className="reveal-delay-2 mt-10 grid gap-6 lg:grid-cols-12"
        >
          {/* ── Stats card (dark) ── */}
          <article
            className="relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-cast-iron)] p-8 text-[var(--color-cream)] shadow-[var(--shadow-card)] lg:col-span-4 card-lift"
          >
            <div
              className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border-[28px] border-[var(--color-tomato)] opacity-15"
              aria-hidden="true"
            />
            <div>
              <div className="text-[var(--color-gold)]">
                <TikTokIcon size={32} />
              </div>
              <h3
                className="mt-6 text-3xl font-black leading-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Follow the kitchen, then reach out.
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)]">
                Short videos give you a real feel for Grandma Willie&apos;s warmth before you book, collaborate, or send a message.
              </p>
            </div>

            {/* Platform stats */}
            <div className="mt-8 grid gap-3">
              {socialStats.map((stat) => (
                <div
                  key={`${stat.source}-${stat.label}`}
                  className="flex items-center justify-between rounded-xl bg-white/8 px-4 py-3"
                >
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-cream)_65%,transparent)]">
                    {stat.label}
                  </p>
                  <p
                    className="text-xl font-black text-[var(--color-gold)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* ── Food preview collage / TikTok embed ── */}
          <div
            className="overflow-hidden rounded-[var(--radius-card)] bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)] lg:col-span-8"
          >
            <div
              className="relative min-h-[34rem] overflow-hidden rounded-[18px]"
              style={{ background: "var(--color-butter)" }}
            >
              {!embedLoaded ? (
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                  {/* 2×2 food preview cards */}
                  <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
                    {foodPreviews.map((preview, i) => (
                      <div
                        key={preview.title}
                        className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] shadow-sm"
                      >
                        <Image
                          src={preview.image}
                          alt={`${preview.title} — Grandma Willie ${preview.platform} video`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 28vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={i < 2}
                          loading={i < 2 ? "eager" : "lazy"}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-300 group-hover:via-black/15" />

                        {/* Play button */}
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-[var(--color-tomato)] text-white"
                          aria-hidden="true"
                        >
                          <Play size={18} fill="currentColor" />
                        </div>

                        {/* Labels */}
                        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-0.5 text-white">
                          <span className="self-start rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-wider text-[var(--color-cast-iron)]">
                            {preview.label}
                          </span>
                          <p
                            className="mt-1 line-clamp-1 text-xs font-black sm:text-sm"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {preview.title}
                          </p>
                          <p className="flex items-center gap-1 text-[0.62rem] font-medium text-white/70">
                            <Eye size={10} aria-hidden="true" />
                            <span aria-label={`${preview.views} on ${preview.platform}`}>
                              {preview.views}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Overlay CTA card */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/22 backdrop-blur-[2px] transition duration-300 hover:bg-black/30">
                    <div className="mx-4 max-w-sm rounded-2xl bg-[var(--color-cast-iron)] p-6 text-center text-[var(--color-cream)] shadow-2xl ring-1 ring-white/10">
                      <p
                        className="text-xl font-black text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Watch Grandma Willie Cook
                      </p>
                      <p className="mt-2 text-xs leading-[1.6] text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)]">
                        Alabama comfort food, kitchen stories, and homestyle recipes — live on TikTok.
                      </p>
                      <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => setEmbedLoaded(true)}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--color-tomato)] px-5 text-xs font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[var(--color-tomato-dark)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                        >
                          <Play size={12} fill="currentColor" aria-hidden="true" />
                          Load Live TikTok Feed
                        </button>
                        <a
                          href={socialLinks.tiktok}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open Grandma Willie TikTok profile (opens in new tab)"
                          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                        >
                          Open TikTok
                          <ArrowRight size={12} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Live TikTok creator embed */
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative w-full max-w-[780px] overflow-auto h-full max-h-[500px]">
                    <blockquote
                      className="tiktok-embed"
                      cite={socialLinks.tiktok}
                      data-unique-id="will46shelby"
                      data-embed-type="creator"
                      style={{ maxWidth: "780px", minWidth: "288px" }}
                    >
                      <section className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                        <SpinnerIcon />
                        <a
                          href={socialLinks.tiktok}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cast-iron)] px-5 py-2 text-sm font-black text-[var(--color-cream)]"
                        >
                          View @will46shelby on TikTok
                        </a>
                      </section>
                    </blockquote>
                    <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Instagram card ── */}
          <article
            className="flex flex-col rounded-[var(--radius-card)] bg-[var(--color-cream)] p-8 shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-border)] lg:col-span-5 card-lift"
          >
            <div className="text-[var(--color-tomato)]">
              <InstagramIcon size={28} />
            </div>
            <h3
              className="mt-5 text-2xl font-black text-[var(--color-cast-iron)] sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Instagram
            </h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-[1.8] text-[var(--color-warm-brown)]">
              Follow for daily photos, reels, kitchen updates, and behind-the-scenes moments from Grandma Willie&apos;s home.
            </p>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Grandma Willie on Instagram — @grandmawillie184 (opens in new tab)"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2 self-start rounded-full border-2 border-[var(--color-cast-iron)] px-6 text-sm font-black text-[var(--color-cast-iron)] transition hover:bg-[var(--color-cast-iron)] hover:text-[var(--color-cream)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Follow @grandmawillie184
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </article>

          {/* ── Collaboration CTA card ── */}
          <article
            className="flex flex-col rounded-[var(--radius-card)] bg-[var(--color-tomato)] p-8 text-white shadow-[var(--shadow-card)] lg:col-span-7 card-lift"
          >
            <h3
              className="text-2xl font-black sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to work together?
            </h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-[1.8] text-white/85">
              Whether it&apos;s a brand partnership, cooking feature, community event, or booking inquiry — use the form and the team will be in touch within 2–3 business days.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2.5 self-start rounded-full bg-[var(--color-cast-iron)] px-6 text-sm font-black text-[var(--color-cream)] shadow-[0_12px_32px_rgba(20,11,7,0.35)] transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-cast-iron)_85%,white)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Send Booking Inquiry
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
