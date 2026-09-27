import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, localeDirection, locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { SITE_URL } from "@/lib/constants";
import "../globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexLatin = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Base metadata shared by every page under [locale]. Each leaf page
// (homepage, /ads, ...) supplies its own title/description/OG/canonical via
// its own generateMetadata, which Next merges over these shared defaults.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

// This layout only establishes the document shell (html lang/dir, fonts,
// skip link) shared by every page under this locale. Page-specific chrome
// (navigation, footer, JSON-LD) lives in each route's own nested layout —
// see app/[locale]/(site)/layout.tsx and app/[locale]/ads/layout.tsx —
// since the homepage and the Google Ads landing page intentionally use
// different navigation/footer and different structured data.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const messages = getMessages(locale);
  const direction = localeDirection[locale];
  const bodyFontVariable = locale === "ar" ? ibmPlexArabic.variable : ibmPlexLatin.variable;

  return (
    <html lang={locale} dir={direction} className={`${alexandria.variable} ${bodyFontVariable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          {messages.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
