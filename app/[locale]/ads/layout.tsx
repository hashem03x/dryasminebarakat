import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildAdsJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";
import AdsHeader from "@/components/ads/AdsHeader";
import AdsFooter from "@/components/ads/AdsFooter";
import AdsWhatsAppFloating from "@/components/ads/AdsWhatsAppFloating";

// Deliberately separate from app/[locale]/(site)/layout.tsx: the Google Ads
// landing page uses its own minimal header/footer (no links back into the
// main site's medical-weight-management content) and its own JSON-LD built
// from messages.ads.* only.
export default async function AdsLayout({
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
  const jsonLd = buildAdsJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdsHeader
        locale={locale}
        nav={messages.ads.nav}
        whatsapp={messages.ads.whatsapp}
        languageSwitcher={messages.languageSwitcher}
      />
      <main id="main-content">{children}</main>
      <AdsFooter locale={locale} messages={messages} />
      <AdsWhatsAppFloating whatsapp={messages.ads.whatsapp} />
    </>
  );
}
