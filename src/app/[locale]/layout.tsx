import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getDictionary } from "@/content";
import { SITE_URL, OG_LOCALE } from "@/lib/site";
import "../globals.css";

// Single typeface across the whole design — display, body, labels, and data.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Pre-paint theme script: sets [data-theme] on <html> before the body paints,
// so there is no flash. Reads persisted choice, else the OS preference.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('ud-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getDictionary(locale);

  // hreflang alternates — one entry per locale, plus x-default.
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  );
  languages["x-default"] = `/${routing.defaultLocale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    authors: [{ name: "Usama Danish" }],
    creator: "Usama Danish",
    keywords: [
      "Usama Danish",
      "Full-Stack Engineer",
      "Frontend Engineer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Berlin",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      siteName: "Usama Danish",
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l] ?? l),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enables static rendering for this locale.
  setRequestLocale(locale);

  // RTL locales (Arabic lands in Phase C). A Set avoids literal-narrowing on
  // `locale` while `routing.locales` still contains only "en".
  const rtlLocales = new Set<string>(["ar"]);
  const dir = rtlLocales.has(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={interTight.variable}
      suppressHydrationWarning
    >
      <body>
        {/* Pre-paint theme init — must run before the body paints (blocking,
            first in body) to avoid a flash. React 19 logs a dev-only notice
            that inline scripts don't run on client renders; that's expected —
            this only needs to run once, on the initial server-rendered load. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}[data-draw]{transform:none !important}`}</style>
        </noscript>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
