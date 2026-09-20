import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID, HERO_PORTRAIT } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/constants";
import DirectionalIcon from "./DirectionalIcon";
import ScrollReveal from "./ScrollReveal";

export default function Hero({ locale, messages }: { locale: Locale; messages: Messages }) {
  const whatsappHref = buildWhatsAppUrl(messages.whatsapp.heroMessage);

  return (
    <section id={SECTION_ID.home} className="relative overflow-hidden bg-ivory pt-14 sm:pt-20">
      <div className="container-edit grid grid-cols-1 items-center gap-14 pb-20 sm:pb-28 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.hero.eyebrow}
          </p>

          <h1 className="text-display-lg font-display font-semibold text-ink">
            {messages.hero.headline}
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
            {messages.hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-sage px-7 py-3.5 text-base font-medium text-paper transition-colors duration-200 hover:bg-sage-dark"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {messages.hero.primaryCta}
            </a>
            <a
              href={`#${SECTION_ID.services}`}
              className="inline-flex items-center justify-center gap-2 px-1 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:text-sage"
            >
              {messages.hero.secondaryCta}
              <DirectionalIcon locale={locale} className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-sand-light">
            <Image
              src={HERO_PORTRAIT}
              alt={messages.hero.portraitAlt}
              fill
              priority
              // Placeholder is SVG; Next's image optimizer rejects local SVGs
              // by default. Remove `unoptimized` once this is real photography.
              unoptimized
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-5 start-5 flex items-center gap-2 rounded bg-paper/95 px-4 py-3 shadow-soft backdrop-blur">
            <MapPin className="h-4 w-4 text-sage" aria-hidden="true" />
            <span className="text-sm font-medium text-ink">{messages.hero.locationBadge}</span>
          </div>
        </ScrollReveal>
      </div>

      <div className="border-t border-line bg-paper/60">
        <div className="container-edit flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-7">
          {messages.trustBar.items.map((item, index) => (
            <p
              key={item}
              className={`flex items-center gap-3 text-sm text-ink-soft ${
                index > 0 ? "sm:ps-6 sm:border-s sm:border-line" : ""
              }`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
