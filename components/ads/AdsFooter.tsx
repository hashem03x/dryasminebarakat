import { Facebook, Instagram, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { buildWhatsAppUrl, DOCTOR_NAME_AR, DOCTOR_NAME_EN, SOCIAL_LINKS } from "@/lib/constants";

export default function AdsFooter({ locale, messages }: { locale: Locale; messages: Messages }) {
  const name = locale === "ar" ? DOCTOR_NAME_AR : DOCTOR_NAME_EN;
  const year = new Date().getFullYear();

  const links = [
    { href: SOCIAL_LINKS.instagram, label: messages.socials.instagramLabel, Icon: Instagram },
    { href: SOCIAL_LINKS.facebook, label: messages.socials.facebookLabel, Icon: Facebook },
    {
      href: buildWhatsAppUrl(messages.ads.whatsapp.floatingMessage),
      label: messages.socials.whatsappLabel,
      Icon: MessageCircle,
    },
  ];

  return (
    <footer className="bg-ink text-ivory">
      <div className="container-edit flex flex-col items-center gap-6 py-14 text-center sm:py-16">
        <p className="font-display text-xl font-semibold">{name}</p>
        <p className="max-w-sm text-sm leading-relaxed text-ivory/70">
          {messages.ads.footer.tagline}
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-200 hover:border-sage-light hover:text-sage-light"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-edit py-6 text-center text-xs text-ivory/50">
          © {year} {name}. {messages.ads.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
