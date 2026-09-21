"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID } from "@/lib/content";
import { buildWhatsAppUrl, DOCTOR_NAME_AR, DOCTOR_NAME_EN } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navItems = [
    { key: SECTION_ID.home, label: messages.nav.home },
    { key: SECTION_ID.about, label: messages.nav.about },
    { key: SECTION_ID.services, label: messages.nav.services },
    { key: SECTION_ID.results, label: messages.nav.results },
    { key: SECTION_ID.testimonials, label: messages.nav.testimonials },
    { key: SECTION_ID.faq, label: messages.nav.faq },
    { key: SECTION_ID.location, label: messages.nav.location },
  ];

  const name = locale === "ar" ? DOCTOR_NAME_AR : DOCTOR_NAME_EN;
  const whatsappHref = buildWhatsAppUrl(messages.whatsapp.heroMessage);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isMenuOpen
          ? "border-line bg-ivory shadow-subtle"
          : isScrolled
            ? "border-line bg-paper/90 shadow-subtle backdrop-blur-md"
            : "border-transparent bg-ivory/0"
      }`}
    >
      <div className="container-edit flex h-[72px] items-center justify-between gap-6 sm:h-20">
        <Link
          href={`#${SECTION_ID.home}`}
          className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl"
        >
          {name}
        </Link>

        <nav aria-label={messages.nav.ariaLabel} className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`#${item.key}`}
              className="text-sm text-ink-soft transition-colors duration-200 hover:text-sage"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher locale={locale} messages={messages} variant="compact" />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-sage px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-sage-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {messages.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher locale={locale} messages={messages} variant="compact" />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? messages.nav.closeLabel : messages.nav.menuLabel}
            className="flex h-10 w-10 items-center justify-center rounded border border-line text-ink"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ivory px-6 py-8 sm:top-20 lg:hidden"
        >
          <nav aria-label={messages.nav.ariaLabel} className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`#${item.key}`}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-line py-4 font-display text-xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded bg-sage px-5 py-4 text-base font-medium text-paper"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {messages.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}
