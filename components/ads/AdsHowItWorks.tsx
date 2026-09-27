import type { Messages } from "@/lib/i18n/messages";
import ScrollReveal from "@/components/ScrollReveal";

export default function AdsHowItWorks({ messages }: { messages: Messages }) {
  return (
    <section id="how-it-works" className="section-space bg-paper">
      <div className="container-edit">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.howItWorks.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.ads.howItWorks.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {messages.ads.howItWorks.subtitle}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-sage/25 [&>*:not(:first-child)]:pt-10 sm:[&>*:not(:first-child)]:border-t-0 sm:[&>*:not(:first-child)]:border-s sm:[&>*:not(:first-child)]:ps-8 sm:[&>*:not(:first-child)]:pt-0">
          {messages.ads.howItWorks.steps.map((step, index) => (
            <ScrollReveal key={step.title} delayMs={index * 100}>
              <span className="font-display text-6xl font-semibold text-sage/40 sm:text-7xl">
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
