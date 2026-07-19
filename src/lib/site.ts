/**
 * Canonical site origin, used for metadata, hreflang, sitemap and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production; on Vercel it falls back to the
 * project's production URL; locally it falls back to localhost.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const SITE_URL = (fromEnv || "http://localhost:3000").replace(/\/$/, "");

/** BCP-47-ish OpenGraph locale tags per app locale. */
export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  de: "de_DE",
  ar: "ar_AE",
};
