import type { Metadata } from "next";
import type { Locale } from "./i18n/config";
import { getMessages } from "./i18n/messages";
import { DOCTOR_NAME_AR, DOCTOR_NAME_EN, SITE_URL, SOCIAL_LINKS } from "./constants";

const OG_LOCALE: Record<Locale, string> = {
  ar: "ar_EG",
  en: "en_US",
};

export function buildMetadata(locale: Locale): Metadata {
  const messages = getMessages(locale);
  const path = `/${locale}`;
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: messages.meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: DOCTOR_NAME_EN,
      title: messages.meta.ogTitle,
      description: messages.meta.ogDescription,
      locale: OG_LOCALE[locale],
      alternateLocale: locale === "ar" ? [OG_LOCALE.en] : [OG_LOCALE.ar],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.ogTitle,
      description: messages.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export function buildJsonLd(locale: Locale) {
  const messages = getMessages(locale);
  const url = `${SITE_URL}/${locale}`;
  const name = locale === "ar" ? DOCTOR_NAME_AR : DOCTOR_NAME_EN;

  const person = {
    "@type": "Person",
    "@id": `${url}#person`,
    name,
    jobTitle: messages.hero.eyebrow,
    url,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    knowsAbout: messages.services.items.map((item) => item.title),
  };

  const business = {
    "@type": "MedicalBusiness",
    "@id": `${url}#business`,
    name,
    url,
    image: `${SITE_URL}/images/hero/portrait.svg`,
    areaServed: messages.location.areasServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasMap: SOCIAL_LINKS.googleMaps,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    founder: { "@id": `${url}#person` },
    medicalSpecialty: "Nutrition",
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name,
    inLanguage: locale,
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: messages.meta.title,
    description: messages.meta.description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${url}#person` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, business, website, webpage],
  };
}
