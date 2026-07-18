import type { AboutContent } from "@/content/types";

/** About + contact. Two-column intro (portrait hides below 820px) then a
 *  three-column info row: languages · work status · get in touch. */
export default function About({ about }: { about: AboutContent }) {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1160px] border-t border-hairline px-[clamp(20px,5vw,48px)] py-[clamp(70px,11vh,130px)]"
    >
      <div
        data-reveal
        className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-[clamp(36px,6vw,72px)] max-[820px]:grid-cols-1"
      >
        <div>
          <div className="mb-[18px] text-[12.5px] uppercase tracking-[0.08em] text-muted">
            {about.kicker}
          </div>
          <p className="m-0 max-w-[30ch] text-[clamp(19px,2.6vw,27px)] font-medium leading-[1.4] tracking-[-0.01em]">
            {about.lead}
          </p>
          <p className="mb-0 mt-[22px] max-w-[56ch] text-[clamp(16px,1.9vw,18.5px)] text-muted">
            {about.body}
          </p>
          <blockquote className="mt-[34px] max-w-[34ch] border-s-2 border-accent ps-5 text-[clamp(18px,2.3vw,23px)] font-medium leading-[1.45] tracking-[-0.01em]">
            {about.blockquote}
          </blockquote>
        </div>

        {/* Portrait slot — hidden below 820px */}
        <div
          className="relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl border border-hairline p-[18px] max-[820px]:hidden"
          style={{
            background:
              "repeating-linear-gradient(135deg,var(--bg-surface) 0 14px,var(--bg-surface-2) 14px 28px)",
          }}
        >
          <span className="rounded-md border border-hairline bg-base px-[9px] py-[5px] text-[11.5px] text-faint">
            {about.portraitPlaceholder}
          </span>
        </div>
      </div>

      {/* Info row */}
      <div
        data-reveal
        className="mt-[clamp(48px,7vh,72px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[22px]"
      >
        <div className="border-t border-strong pt-4">
          <div className="mb-[10px] text-[11.5px] uppercase tracking-[0.06em] text-muted">
            {about.languagesHeading}
          </div>
          {about.languages.map((lang) => (
            <div key={lang.label} className="text-[15.5px] [&:not(:first-child)]:mt-1">
              {lang.label} <span className="text-muted">{lang.detail}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-strong pt-4">
          <div className="mb-[10px] text-[11.5px] uppercase tracking-[0.06em] text-muted">
            {about.workStatusHeading}
          </div>
          <div className="text-[15.5px] text-muted">{about.workStatus}</div>
        </div>

        <div className="border-t border-strong pt-4">
          <div className="mb-[10px] text-[11.5px] uppercase tracking-[0.06em] text-muted">
            {about.contactHeading}
          </div>
          <div className="flex flex-col gap-[6px] text-[15.5px]">
            {about.contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
