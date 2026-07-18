import ThemeToggle from "@/components/ThemeToggle";
import { getDictionary } from "@/content";

/**
 * Phase 0 placeholder — proves design tokens, Inter Tight, and the theme
 * toggle (with persistence) all work end to end. Phase A replaces this with
 * the full five-section composition.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { meta } = getDictionary(locale);

  return (
    <main className="min-h-screen bg-base px-6 py-20">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px] font-semibold tracking-[-0.01em] text-primary">
            <span className="inline-block h-[9px] w-[9px] rounded-full bg-accent" />
            Usama Danish
          </div>
          <ThemeToggle />
        </div>

        <div className="max-w-[40ch]">
          <p className="mb-4 text-[12.5px] uppercase tracking-[0.08em] text-muted">
            Phase 0 · foundation
          </p>
          <h1 className="text-[clamp(34px,6vw,64px)] font-semibold leading-[1.03] tracking-[-0.03em] text-primary text-balance">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-[54ch] text-[clamp(16px,1.9vw,20px)] leading-[1.6] text-muted">
            {meta.description}
          </p>
        </div>

        {/* Token swatches — quick visual confirmation the palette responds to theme. */}
        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl border border-hairline bg-surface px-5 py-4 text-sm text-primary">
            surface
          </div>
          <div className="rounded-xl border border-hairline bg-surface-2 px-5 py-4 text-sm text-primary">
            surface-2
          </div>
          <div className="rounded-xl border border-accent bg-accent-soft px-5 py-4 text-sm text-accent">
            accent
          </div>
          <div className="rounded-xl border border-strong px-5 py-4 text-sm text-muted">
            muted / strong
          </div>
        </div>
      </div>
    </main>
  );
}
