import type { NavContent } from "@/content/types";
import ThemeToggle from "./ThemeToggle";
import LangSwitcher from "./LangSwitcher";

/** Sticky, translucent top nav. Nav links hide below 560px; switcher + toggle stay. */
export default function Nav({ nav }: { nav: NavContent }) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-hairline bg-nav px-[clamp(18px,5vw,48px)] backdrop-blur-[14px] backdrop-saturate-[1.4]">
      <a
        href="#top"
        className="flex items-center gap-[10px] font-semibold tracking-[-0.01em] text-primary no-underline hover:no-underline"
      >
        <span className="inline-block h-[9px] w-[9px] rounded-full bg-accent" />
        {nav.brand}
      </a>

      <div className="flex items-center gap-[clamp(14px,2.5vw,28px)]">
        <div className="hidden items-center gap-[26px] text-[14.5px] font-medium text-muted min-[560px]:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted no-underline transition-colors hover:text-primary hover:no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <LangSwitcher label={nav.languageLabel} comingSoon={nav.localeComingSoon} />
        <ThemeToggle toLight={nav.themeToLight} toDark={nav.themeToDark} />
      </div>
    </nav>
  );
}
