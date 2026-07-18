import type { FooterContent } from "@/content/types";

export default function Footer({ footer }: { footer: FooterContent }) {
  return (
    <footer className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 border-t border-hairline px-[clamp(20px,5vw,48px)] pb-14 pt-10 text-[14px] text-muted">
      <span>{footer.copyright}</span>
      <span className="text-[12px] text-faint">{footer.tagline}</span>
    </footer>
  );
}
