import type { CaseTimeline } from "@/content/types";

/** Framework timeline strip. Bars sit at their target widths in Phase A;
 *  Phase B animates them "drawing" in on scroll. */
export default function Timeline({ timeline }: { timeline: CaseTimeline }) {
  return (
    <div data-reveal className="mt-[clamp(56px,8vh,84px)]">
      <div className="mb-[18px] text-[12px] uppercase tracking-[0.06em] text-muted">
        {timeline.heading}
      </div>

      <div className="relative overflow-hidden rounded-[14px] border border-hairline bg-surface px-[clamp(20px,4vw,36px)] pb-[42px] pt-[26px]">
        <div className="relative h-[96px]">
          {/* Year gridlines */}
          {[0, 33.33, 66.66].map((left) => (
            <div
              key={left}
              className="absolute inset-y-0 w-px bg-hairline"
              style={{ insetInlineStart: `${left}%` }}
            />
          ))}
          <div className="absolute inset-y-0 end-0 w-px bg-hairline" />

          {/* Bars */}
          {timeline.bars.map((bar, i) => (
            <div
              key={bar.label}
              className="absolute flex h-[30px] items-center overflow-hidden whitespace-nowrap rounded-lg px-[14px] text-[12px]"
              style={{
                insetBlockStart: `${14 + i * 38}px`,
                insetInlineStart: `${bar.startPct}%`,
                width: `${bar.widthPct}%`,
                background:
                  bar.variant === "accent"
                    ? "var(--accent-soft)"
                    : "var(--bg-surface-2)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor:
                  bar.variant === "accent" ? "var(--accent)" : "var(--strong)",
                color:
                  bar.variant === "accent" ? "var(--accent)" : "var(--text-muted)",
                fontWeight: bar.variant === "accent" ? 600 : 400,
              }}
            >
              {bar.label}
            </div>
          ))}

          {/* Edge fade for the ongoing bar running off the right */}
          {timeline.bars.some((b) => b.runsOff) && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute end-0 h-[32px] w-[70px]"
              style={{
                insetBlockStart: "52px",
                background: "linear-gradient(90deg,transparent,var(--bg-surface))",
              }}
            />
          )}
        </div>

        <div className="mt-2 flex justify-between text-[11.5px] text-faint">
          {timeline.years.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[12px] text-faint">{timeline.caption}</p>
    </div>
  );
}
