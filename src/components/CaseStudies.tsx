import type { CaseStudy } from "@/content/types";
import RoleSwitcher from "./RoleSwitcher";

/** Array-driven case studies. Each renders the full narrative: intro →
 *  step cards → framework timeline → capability role-switcher → outcome stat.
 *  Add an entry to `caseStudies` in the content file to render another. */
export default function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  return (
    <section
      id="case"
      className="mx-auto max-w-[1160px] px-[clamp(20px,5vw,48px)]"
    >
      {studies.map((study) => (
        <article
          key={study.id}
          className="py-[clamp(80px,13vh,150px)]"
        >
          {/* Intro */}
          <div data-reveal>
            <div className="mb-4 text-[12.5px] uppercase tracking-[0.08em] text-accent">
              {study.kicker}
            </div>
            <h2 className="m-0 max-w-[20ch] text-[clamp(28px,4.6vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              {study.title}
            </h2>
            <p className="mb-0 mt-[26px] max-w-[60ch] text-[clamp(16px,1.9vw,19px)] text-muted">
              {study.intro}
            </p>
          </div>

          {/* Step cards */}
          <div
            data-reveal
            className="mt-[clamp(48px,7vh,72px)] grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5"
          >
            {study.steps.map((step, i) => (
              <div
                key={step.label}
                className="rounded-[14px] border border-hairline bg-surface p-[22px] pb-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:border-strong motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="mb-3 text-[11px] uppercase tracking-[0.08em] text-accent">
                  {i + 1} · {step.label}
                </div>
                <div className="text-[17.5px] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {step.title}
                </div>
                <div className="mt-[10px] text-[14.5px] leading-[1.55] text-muted">
                  {step.body}
                </div>
              </div>
            ))}
          </div>

          <RoleSwitcher data={study.roleSwitcher} />

          {/* Outcome stat */}
          <div
            data-reveal
            className="mt-[clamp(48px,7vh,68px)] flex flex-wrap items-baseline gap-5"
          >
            <div className="tnum text-[clamp(36px,6vw,64px)] font-semibold tracking-[-0.03em] text-accent">
              {study.stat.value}
            </div>
            <div className="max-w-[44ch] text-[clamp(16px,1.9vw,19px)] text-muted">
              {study.stat.label}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
