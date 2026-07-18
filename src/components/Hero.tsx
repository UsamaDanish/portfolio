import type { HeroContent } from "@/content/types";
import HeroBackdrop from "./HeroBackdrop";

/** Full-bleed cinematic hero: a rounded dark panel that is bottom-aligned. */
export default function Hero({ hero }: { hero: HeroContent }) {
  return (
    <header className="px-[clamp(14px,3vw,28px)] pb-[clamp(40px,7vh,80px)] pt-[clamp(14px,2vw,24px)]">
      <div
        data-reveal
        className="relative flex min-h-[clamp(500px,82vh,760px)] flex-col justify-end overflow-hidden rounded-[22px] bg-[#08090B]"
      >
        {/* z1 canvas + z4 fps chip (client) */}
        <HeroBackdrop liveLabel={hero.liveLabel} fpsUnit={hero.fpsUnit} />

        {/* z2 — bottom scrim for text legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg,rgba(8,9,11,.05) 0%,rgba(8,9,11,.15) 40%,rgba(8,9,11,.82) 100%)",
          }}
        />

        {/* z3 — headline content */}
        <div className="relative z-[3] p-[clamp(30px,6vw,64px)]">
          <div className="mb-[22px] flex items-center gap-[10px] text-[13px] tracking-[0.03em] text-[rgba(185,189,196,0.95)]">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#4D8DFF] [animation:ud-pulse_2.4s_ease-in-out_infinite]" />
            {hero.kicker}
          </div>

          <h1 className="m-0 max-w-[18ch] text-balance text-[clamp(34px,6vw,72px)] font-semibold leading-[1.03] tracking-[-0.03em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.4)]">
            {hero.headline}
          </h1>

          <p className="mb-0 mt-[26px] max-w-[54ch] text-[clamp(16px,1.9vw,20px)] leading-[1.6] text-[rgba(232,233,235,0.78)]">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap gap-[9px]">
            {hero.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/[0.14] bg-white/[0.08] px-[14px] py-2 text-[12.5px] text-[rgba(232,233,235,0.9)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll affordance below the panel */}
      <div
        data-reveal
        className="mx-auto mt-[clamp(28px,4vh,44px)] flex max-w-[1160px] items-center gap-3 px-[clamp(20px,5vw,48px)] text-[12px] text-faint"
      >
        <span>{hero.scrollPre}</span>
        <span
          className="h-px max-w-[120px] flex-1"
          style={{
            background: "linear-gradient(90deg,var(--strong),transparent)",
          }}
        />
        <span>{hero.scrollPost}</span>
      </div>
    </header>
  );
}
