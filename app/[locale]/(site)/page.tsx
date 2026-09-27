import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import ClosingCta from "@/components/ClosingCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const messages = getMessages(locale);

  return (
    <>
      <Hero locale={locale} messages={messages} />
      <About messages={messages} />
      <Services messages={messages} />
      <Approach messages={messages} />
      <Results messages={messages} />
      <Testimonials locale={locale} messages={messages} />
      <FAQ messages={messages} />
      <Location messages={messages} />
      <ClosingCta messages={messages} />
    </>
  );
}
