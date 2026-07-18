import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getDictionary } from "@/content";

/**
 * Per-request i18n config. The typed content dictionary (src/content/<locale>.ts)
 * doubles as next-intl `messages`, so client components can use `useTranslations`
 * if convenient — but sections mostly receive the typed dictionary as props for
 * full autocomplete over nested copy and the projects[]/caseStudies[] arrays.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: getDictionary(locale),
  };
});
