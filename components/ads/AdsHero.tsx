import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { ADS_PORTRAIT } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/constants";
import DirectionalIcon from "@/components/DirectionalIcon";
import ScrollReveal from "@/components/ScrollReveal";

export default function AdsHero({ locale, messages }: { locale: Locale; messages: Messages }) {
  const whatsappHref = buildWhatsAppUrl(messages.ads.whatsapp.heroMessage);

  return (
    <section id="hero" className="relative overflow-hidden bg-ivory pt-14 sm:pt-20">
      <div className="container-edit grid grid-cols-1 items-center gap-14 pb-20 sm:pb-28 md:grid-cols-2 md:gap-12 lg:gap-16">
        <ScrollReveal>
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.hero.eyebrow}
          </p>

          <h1 className="text-display-lg font-display font-semibold text-ink">
            {messages.ads.hero.headline}
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
            {messages.ads.hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-sage px-7 py-3.5 text-base font-medium text-paper transition-colors duration-200 hover:bg-sage-dark"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {messages.ads.hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-1 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:text-sage"
            >
              {messages.ads.hero.secondaryCta}
              <DirectionalIcon locale={locale} className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-sand-light">
            <Image
              src={ADS_PORTRAIT}
              alt={messages.ads.hero.portraitAlt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
