import { defineRouting } from "next-intl/routing";

/**
 * i18n routing config. English only for Phase A; German + Arabic (RTL) are
 * added here in Phase C — adding a locale is a one-line change plus authoring
 * `src/content/<locale>.ts`. The nav language switcher shows DE/AR as disabled
 * placeholders until they are enabled here.
 */
export const routing = defineRouting({
  locales: ["en", "de", "ar"],
  defaultLocale: "en",
  // "always" keeps a locale prefix on every path (/en/…), which makes hreflang
  // and the RTL/LTR split unambiguous. Arabic ("ar") renders dir="rtl".
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
