import type { AnchorHTMLAttributes, ReactNode } from "react";

type CTAButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

const variants: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-tomato)] text-white shadow-[var(--shadow-button)] hover:bg-[var(--color-tomato-dark)]",
  secondary:
    "border-2 border-[var(--color-cast-iron)] bg-transparent text-[var(--color-cast-iron)] hover:bg-[var(--color-cast-iron)] hover:text-[var(--color-cream)]",
  dark:
    "bg-[var(--color-cast-iron)] text-[var(--color-cream)] shadow-[0_12px_32px_rgba(20,11,7,0.24)] hover:bg-[var(--color-tomato)]",
};

export function CTAButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: CTAButtonProps) {
  return (
    <a
      className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:text-[0.95rem] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
