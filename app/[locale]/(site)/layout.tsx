import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default async function SiteLayout({
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
  const jsonLd = buildJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar locale={locale} messages={messages} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} messages={messages} />
      <WhatsAppFloating locale={locale} messages={messages} />
    </>
  );
}
