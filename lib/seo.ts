import type { Metadata } from "next";
import type { Locale } from "./i18n/config";
import { getMessages } from "./i18n/messages";
import { DOCTOR_NAME_AR, DOCTOR_NAME_EN, SITE_URL, SOCIAL_LINKS } from "./constants";
import { ADS_PORTRAIT, HERO_PORTRAIT } from "./content";

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

    icons: {
      icon: [
        {
          url: "/favicon.jpg",
          type: "image/jpeg",
        },
      ],
    },

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
    image: `${SITE_URL}${HERO_PORTRAIT}`,
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

  // Mirrors the visible FAQ section exactly (components/FAQ.tsx renders the
  // same messages.faq.items array) — never add questions here that aren't
  // also rendered on the page.
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: messages.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, business, website, webpage, faqPage],
  };
}

// Metadata for the dedicated Google Ads landing page (/ads). Kept fully
// separate from buildMetadata/buildJsonLd above: it must never inherit the
// homepage's medical-weight-management wording or FAQ content — only
// messages.ads.* copy, which is written to stay clear of restricted
// healthcare/medication terminology for advertising purposes.
export function buildAdsMetadata(locale: Locale): Metadata {
  const messages = getMessages(locale);
  const path = `/${locale}/ads`;
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: messages.ads.meta.title,
    description: messages.ads.meta.description,
    keywords: messages.ads.meta.keywords,

    icons: {
      icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    },

    alternates: {
      canonical: url,
      languages: {
        ar: `${SITE_URL}/ar/ads`,
        en: `${SITE_URL}/en/ads`,
        "x-default": `${SITE_URL}/ar/ads`,
      },
    },

    openGraph: {
      type: "website",
      url,
      siteName: DOCTOR_NAME_EN,
      title: messages.ads.meta.ogTitle,
      description: messages.ads.meta.ogDescription,
      locale: OG_LOCALE[locale],
      alternateLocale: locale === "ar" ? [OG_LOCALE.en] : [OG_LOCALE.ar],
    },

    twitter: {
      card: "summary_large_image",
      title: messages.ads.meta.ogTitle,
      description: messages.ads.meta.ogDescription,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function buildAdsJsonLd(locale: Locale) {
  const messages = getMessages(locale);
  const url = `${SITE_URL}/${locale}/ads`;
  const name = locale === "ar" ? DOCTOR_NAME_AR : DOCTOR_NAME_EN;

  const person = {
    "@type": "Person",
    "@id": `${url}#person`,
    name,
    jobTitle: messages.ads.hero.eyebrow,
    url,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    knowsAbout: messages.ads.services.items.map((item) => item.title),
  };

  // Intentionally a general ProfessionalService (not MedicalBusiness) on
  // this page — the ads landing page is positioned around nutrition &
  // wellness consultation, not a medical/clinical offering.
  const business = {
    "@type": "ProfessionalService",
    "@id": `${url}#business`,
    name,
    url,
    image: `${SITE_URL}${ADS_PORTRAIT}`,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    founder: { "@id": `${url}#person` },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: messages.ads.meta.title,
    description: messages.ads.meta.description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${url}#person` },
  };

  // Mirrors components/ads/AdsFAQ.tsx exactly — never add a question here
  // that isn't also rendered on the page.
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: messages.ads.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, business, webpage, faqPage],
  };
}
