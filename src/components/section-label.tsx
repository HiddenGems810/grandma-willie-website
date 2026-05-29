import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  light?: boolean;
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-[0.7rem] font-black uppercase tracking-[0.24em] ${
        light ? "text-[var(--color-gold)]" : "text-[var(--color-tomato)]"
      }`}
    >
      {children}
    </p>
  );
}
