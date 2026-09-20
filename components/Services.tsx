import { Repeat, Scale, Sparkles, Stethoscope, TrendingUp, type LucideIcon } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID, SERVICE_ICONS } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

const ICONS: Record<(typeof SERVICE_ICONS)[number], LucideIcon> = {
  stethoscope: Stethoscope,
  scale: Scale,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
  repeat: Repeat,
};

export default function Services({ messages }: { messages: Messages }) {
  return (
    <section id={SECTION_ID.services} className="section-space bg-ivory">
      <div className="container-edit">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.services.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.services.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{messages.services.subtitle}</p>
        </ScrollReveal>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {messages.services.items.map((service, index) => {
            const Icon = ICONS[SERVICE_ICONS[index]];
            return (
              <ScrollReveal key={service.title} delayMs={index * 60}>
                <div className="grid grid-cols-1 items-start gap-4 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
                  <div className="flex items-center gap-4 sm:col-span-2">
                    <span className="font-display text-3xl text-sand-dark">{service.number}</span>
                    <Icon className="h-6 w-6 text-sage sm:hidden" aria-hidden="true" />
                  </div>
                  <div className="hidden sm:col-span-1 sm:flex sm:items-start sm:pt-1.5">
                    <Icon className="h-6 w-6 text-sage" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:col-span-4">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-soft sm:col-span-5">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
