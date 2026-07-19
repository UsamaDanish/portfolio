import type { ExperienceContent } from "@/content/types";

const LANE_HEIGHT = 46;
const BAR_HEIGHT = 34;

/** Standalone career timeline: one lane per role on a shared year axis
 *  (2018 → now). Each role's colored bar shows its duration; the label trails
 *  from the bar's start so the full stack stays readable even on short bars.
 *  Phase B animates the bars "drawing" in on scroll. */
export default function Experience({
  experience,
}: {
  experience: ExperienceContent;
}) {
  const { axisStart, axisEnd, roles, yearMarks } = experience;
  const span = axisEnd - axisStart || 1;
  const pct = (year: number) => ((year - axisStart) / span) * 100;

  return (
    <section
      id="experience"
      className="mx-auto max-w-[1160px] border-t border-hairline px-[clamp(20px,5vw,48px)] py-[clamp(70px,11vh,130px)]"
    >
      <div data-reveal>
        <div className="mb-4 text-[12.5px] uppercase tracking-[0.08em] text-accent">
          {experience.kicker}
        </div>
        <h2 className="m-0 max-w-[26ch] text-[clamp(26px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {experience.title}
        </h2>
        <p className="mb-0 mt-[22px] max-w-[62ch] text-[clamp(16px,1.9vw,18.5px)] text-muted">
          {experience.intro}
        </p>
      </div>

      <div
        data-reveal
        className="relative mt-[clamp(40px,6vh,64px)] overflow-hidden rounded-2xl border border-hairline bg-surface px-[clamp(20px,4vw,36px)] pb-[26px] pt-[28px]"
      >
        {/* Lanes */}
        <div
          className="relative"
          style={{ height: `${roles.length * LANE_HEIGHT}px` }}
        >
          {/* Year gridlines */}
          {yearMarks.map((year) => (
            <div
              key={year}
              className="absolute inset-y-0 w-px bg-hairline"
              style={{ insetInlineStart: `${pct(year)}%` }}
            />
          ))}

          {/* Role bars + trailing labels */}
          {roles.map((role, i) => {
            const left = pct(role.start);
            const right = role.end == null ? 100 : pct(role.end);
            const width = Math.max(1.5, right - left);
            const accent = role.variant === "accent";
            return (
              <div
                key={role.company}
                className="absolute inset-x-0"
                style={{ insetBlockStart: `${i * LANE_HEIGHT}px`, height: `${BAR_HEIGHT}px` }}
              >
                {/* Colored duration bar — "draws" in on scroll (Phase B) */}
                <div
                  data-draw
                  className="absolute top-0 rounded-lg"
                  style={{
                    insetInlineStart: `${left}%`,
                    width: `${width}%`,
                    height: `${BAR_HEIGHT}px`,
                    background: accent ? "var(--accent-soft)" : "var(--bg-surface-2)",
                    border: `1px solid ${accent ? "var(--accent)" : "var(--strong)"}`,
                  }}
                />
                {/* Label — starts at the bar, free to trail past it */}
                <div
                  className="absolute top-0 flex items-center whitespace-nowrap ps-3 text-[12.5px]"
                  style={{ insetInlineStart: `${left}%`, height: `${BAR_HEIGHT}px` }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: accent ? "var(--accent)" : "var(--text-primary)" }}
                  >
                    {role.company}
                  </span>
                  <span className="mx-2 text-faint">·</span>
                  <span className="text-muted">{role.stack.join("  ·  ")}</span>
                </div>
                {/* Edge fade for the current, ongoing role */}
                {role.current && (
                  <div
                    aria-hidden="true"
                    className="timeline-fade pointer-events-none absolute top-0 end-0 w-[70px]"
                    style={{ height: `${BAR_HEIGHT}px` }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Year axis */}
        <div className="relative mt-3 h-[16px]">
          {yearMarks.map((year, idx) => {
            const isLast = idx === yearMarks.length - 1;
            return (
              <span
                key={year}
                className="absolute whitespace-nowrap text-[11.5px] text-faint"
                style={{ insetInlineStart: `${pct(year)}%` }}
              >
                {isLast ? (
                  <>
                    {year} <span className="tl-arrow">→</span>
                  </>
                ) : (
                  year
                )}
              </span>
            );
          })}
        </div>
      </div>

      <p data-reveal className="mt-3 text-[12px] text-faint">
        {experience.caption}
      </p>
    </section>
  );
}
