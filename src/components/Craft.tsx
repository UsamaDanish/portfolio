import type { CraftContent } from "@/content/types";
import CraftMeter from "./CraftMeter";

/** "The craft" — shows attention to detail via an honest measurement. */
export default function Craft({ craft }: { craft: CraftContent }) {
  return (
    <section className="mx-auto max-w-[1160px] border-t border-hairline px-[clamp(20px,5vw,48px)] py-[clamp(70px,11vh,130px)]">
      <div
        data-reveal
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(32px,6vw,72px)]"
      >
        <div>
          <div className="mb-4 text-[12.5px] uppercase tracking-[0.08em] text-muted">
            {craft.kicker}
          </div>
          <h2 className="m-0 max-w-[18ch] text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            {craft.title}
          </h2>
          <p className="mb-0 mt-[22px] max-w-[46ch] text-[16.5px] text-muted">
            {craft.bodyBefore}
            <code className="rounded-[5px] bg-surface-2 px-[6px] py-[2px] text-[0.85em]">
              {craft.codeSnippet}
            </code>
            {craft.bodyAfter}
          </p>
        </div>

        <CraftMeter
          cardLabel={craft.cardLabel}
          unit={craft.unit}
          opsLabel={craft.opsLabel}
        />
      </div>
    </section>
  );
}
