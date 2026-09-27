import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildAdsMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import AdsHero from "@/components/ads/AdsHero";
import AdsIntro from "@/components/ads/AdsIntro";
import AdsServices from "@/components/ads/AdsServices";
import AdsWhyChooseUs from "@/components/ads/AdsWhyChooseUs";
import AdsHowItWorks from "@/components/ads/AdsHowItWorks";
import AdsAbout from "@/components/ads/AdsAbout";
import AdsSupport from "@/components/ads/AdsSupport";
import Testimonials from "@/components/Testimonials";
import AdsFAQ from "@/components/ads/AdsFAQ";
import AdsClosingCta from "@/components/ads/AdsClosingCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildAdsMetadata(locale);
}

export default async function AdsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const messages = getMessages(locale);

  return (
    <>
      <AdsHero locale={locale} messages={messages} />
      <AdsIntro messages={messages} />
      <AdsServices messages={messages} />
      <AdsWhyChooseUs messages={messages} />
      <AdsHowItWorks messages={messages} />
      <AdsAbout messages={messages} />
      <AdsSupport messages={messages} />
      <Testimonials locale={locale} messages={{ testimonials: messages.ads.testimonials }} />
      <AdsFAQ faq={messages.ads.faq} />
      <AdsClosingCta messages={messages} />
    </>
  );
}
