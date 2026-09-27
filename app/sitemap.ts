import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}`])
  );
  const adsLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}/ads`])
  );

  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "ar" ? 1 : 0.9,
    alternates: { languages: homeLanguages },
  }));

  const adsEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/ads`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "ar" ? 0.8 : 0.7,
    alternates: { languages: adsLanguages },
  }));

  return [...homeEntries, ...adsEntries];
}
