import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, localeDirection, locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildJsonLd, buildMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
}

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
  const jsonLd = buildJsonLd(locale);

  return (
    <html lang={locale} dir={direction} className={`${alexandria.variable} ${bodyFontVariable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          {messages.skipToContent}
        </a>
        <Navbar locale={locale} messages={messages} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} messages={messages} />
        <WhatsAppFloating locale={locale} messages={messages} />
      </body>
    </html>
  );
}
