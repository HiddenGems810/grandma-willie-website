"use client";

import { useEffect, useRef } from "react";

type ScrollRevealSectionProps = React.ComponentPropsWithoutRef<"section"> & {
  threshold?: number;
};

export function ScrollRevealSection({
  children,
  threshold = 0.12,
  ...props
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <section ref={sectionRef} {...props}>
      {children}
    </section>
  );
}
