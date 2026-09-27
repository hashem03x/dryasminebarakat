import { MessageCircle, Repeat, UserCheck, type LucideIcon } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { ADS_WHY_ICONS } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

const ICONS: Record<(typeof ADS_WHY_ICONS)[number], LucideIcon> = {
  "user-check": UserCheck,
  repeat: Repeat,
  "message-circle": MessageCircle,
};

export default function AdsWhyChooseUs({ messages }: { messages: Messages }) {
  return (
    <section className="section-space bg-sage-pale/40">
      <div className="container-edit">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.whyChooseUs.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.ads.whyChooseUs.title}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {messages.ads.whyChooseUs.items.map((item, index) => {
            const Icon = ICONS[ADS_WHY_ICONS[index]];
            return (
              <ScrollReveal key={item.title} delayMs={index * 80}>
                <Icon className="h-7 w-7 text-sage-dark" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.description}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
