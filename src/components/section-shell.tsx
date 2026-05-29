import type { ComponentPropsWithoutRef } from "react";

type SectionShellProps = ComponentPropsWithoutRef<"section"> & {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export function SectionShell({
  eyebrow,
  title,
  intro,
  children,
  className = "",
  ...props
}: SectionShellProps) {
  return (
    <section
      className={`px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12 ${className}`}
      {...props}
    >
      <div className="mx-auto max-w-[var(--container)]">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-[0.7rem] font-black uppercase tracking-[0.24em] text-[var(--color-tomato)]">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className="leading-[0.92] text-[var(--color-cast-iron)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            }}
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-[1.8] text-[var(--color-warm-brown)]">
              {intro}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
