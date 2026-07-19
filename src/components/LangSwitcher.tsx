"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { id: "en", label: "EN" },
  { id: "de", label: "DE" },
  { id: "ar", label: "AR" },
] as const;

/** Language switcher — links to the current page in each locale. next-intl
 *  swaps the locale prefix; the layout flips dir="rtl" for Arabic. */
export default function LangSwitcher({ label }: { label: string }) {
  const active = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-[2px] rounded-lg border border-hairline bg-surface-2 p-[3px] text-[12px]"
    >
      {LOCALES.map((loc) => {
        const isActive = loc.id === active;
        if (isActive) {
          return (
            <span
              key={loc.id}
              aria-current="true"
              className="rounded-[5px] bg-surface px-2 py-[3px] font-semibold text-primary"
            >
              {loc.label}
            </span>
          );
        }
        return (
          <Link
            key={loc.id}
            href={pathname}
            locale={loc.id}
            hrefLang={loc.id}
            className="rounded-[5px] px-2 py-[3px] text-muted no-underline transition-colors hover:text-primary hover:no-underline"
          >
            {loc.label}
          </Link>
        );
      })}
    </div>
  );
}
