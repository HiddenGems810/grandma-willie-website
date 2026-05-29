import type { SocialStat } from "@/content/grandma-willie";

export function StatChip({ stat }: { stat: SocialStat }) {
  return (
    <div className="rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 shadow-[var(--shadow-soft)] backdrop-blur">
      <p
        className="text-sm font-black text-[var(--color-cast-iron)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {stat.value}
      </p>
      <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-[var(--color-muted)]">
        {stat.label}
      </p>
    </div>
  );
}
