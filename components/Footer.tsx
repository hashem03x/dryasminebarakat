import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID } from "@/lib/content";
import { DOCTOR_NAME_AR, DOCTOR_NAME_EN, SOCIAL_LINKS } from "@/lib/constants";
import SocialLinks from "./SocialLinks";

export default function Footer({ locale, messages }: { locale: Locale; messages: Messages }) {
  const name = locale === "ar" ? DOCTOR_NAME_AR : DOCTOR_NAME_EN;
  const year = new Date().getFullYear();

  const navItems = [
    { key: SECTION_ID.about, label: messages.nav.about },
    { key: SECTION_ID.services, label: messages.nav.services },
    { key: SECTION_ID.results, label: messages.nav.results },
    { key: SECTION_ID.location, label: messages.nav.location },
  ];

  return (
    <footer className="bg-ink text-ivory">
      <div className="container-edit grid grid-cols-1 gap-12 py-16 sm:py-20 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-display text-xl font-semibold">{name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">
            {messages.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ivory/50">
            {messages.footer.navTitle}
          </p>
          <ul className="mt-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={`#${item.key}`}
                  className="text-sm text-ivory/80 transition-colors duration-200 hover:text-sage-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SOCIAL_LINKS.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ivory/80 transition-colors duration-200 hover:text-sage-light"
              >
                {messages.location.mapCta}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ivory/50">
            {messages.footer.contactTitle}
          </p>
          <SocialLinks messages={messages} className="mt-4" />
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-edit flex flex-col gap-3 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {name}. {messages.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
