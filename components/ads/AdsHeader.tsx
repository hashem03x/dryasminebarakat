"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { buildWhatsAppUrl, DOCTOR_NAME_AR, DOCTOR_NAME_EN } from "@/lib/constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// A deliberately minimal header for the Google Ads landing page: logo and a
// single WhatsApp CTA, no multi-item navigation menu. A focused landing
// page shouldn't offer exits into the rest of the site — every path here
// leads to the same conversion action.
//
// Takes narrow slices, not the full Messages object — this is a client
// component, so whatever is passed here is serialized in full into the
// page's hydration payload, and this page must not leak the homepage's
// copy into its HTML.
export default function AdsHeader({
  locale,
  nav,
  whatsapp,
  languageSwitcher,
}: {
  locale: Locale;
  nav: Messages["ads"]["nav"];
  whatsapp: Messages["ads"]["whatsapp"];
  languageSwitcher: Messages["languageSwitcher"];
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const name = locale === "ar" ? DOCTOR_NAME_AR : DOCTOR_NAME_EN;
  const whatsappHref = buildWhatsAppUrl(whatsapp.heroMessage);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-line bg-paper/90 shadow-subtle backdrop-blur-md"
          : "border-transparent bg-ivory/0"
      }`}
    >
      <div className="container-edit flex h-[72px] items-center justify-between gap-6 sm:h-20">
        <span className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
          {name}
        </span>

        <div className="flex items-center gap-4 sm:gap-6">
          <LanguageSwitcher locale={locale} messages={{ languageSwitcher }} variant="compact" />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.cta}
            className="inline-flex items-center gap-2 rounded bg-sage px-4 py-2.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-sage-dark sm:px-5"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{nav.cta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
