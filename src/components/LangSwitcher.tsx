"use client";

import { useLocale } from "next-intl";

// The full set is shown from Phase A; DE/AR are disabled placeholders until
// they are enabled in routing (Phase C), where they become locale-aware links.
const LOCALES = [
  { id: "en", label: "EN" },
  { id: "de", label: "DE" },
  { id: "ar", label: "AR" },
];

export default function LangSwitcher({
  label,
  comingSoon,
}: {
  label: string;
  comingSoon: string;
}) {
  const active = useLocale();

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
          <span
            key={loc.id}
            title={comingSoon}
            aria-disabled="true"
            className="cursor-not-allowed px-2 py-[3px] text-faint"
          >
            {loc.label}
          </span>
        );
      })}
    </div>
  );
}
