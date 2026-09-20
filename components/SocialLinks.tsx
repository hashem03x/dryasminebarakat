import { Instagram, Facebook, MessageCircle } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { buildWhatsAppUrl, SOCIAL_LINKS } from "@/lib/constants";

export default function SocialLinks({
  messages,
  className,
}: {
  messages: Messages;
  className?: string;
}) {
  const links = [
    { href: SOCIAL_LINKS.instagram, label: messages.socials.instagramLabel, Icon: Instagram },
    { href: SOCIAL_LINKS.facebook, label: messages.socials.facebookLabel, Icon: Facebook },
    {
      href: buildWhatsAppUrl(messages.whatsapp.floatingMessage),
      label: messages.socials.whatsappLabel,
      Icon: MessageCircle,
    },
  ];

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
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
  );
}
