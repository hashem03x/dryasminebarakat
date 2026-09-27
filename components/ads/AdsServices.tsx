import { CalendarCheck, HeartPulse, Leaf, Repeat, type LucideIcon } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { ADS_SERVICE_ICONS } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

const ICONS: Record<(typeof ADS_SERVICE_ICONS)[number], LucideIcon> = {
  "heart-pulse": HeartPulse,
  "calendar-check": CalendarCheck,
  repeat: Repeat,
  leaf: Leaf,
};

export default function AdsServices({ messages }: { messages: Messages }) {
  return (
    <section id="services" className="section-space bg-ivory">
      <div className="container-edit">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.services.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.ads.services.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {messages.ads.services.subtitle}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {messages.ads.services.items.map((service, index) => {
            const Icon = ICONS[ADS_SERVICE_ICONS[index]];
            return (
              <ScrollReveal
                key={service.title}
                delayMs={index * 60}
                className="bg-paper p-8 sm:p-10"
              >
                <Icon className="h-7 w-7 text-sage" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {service.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
