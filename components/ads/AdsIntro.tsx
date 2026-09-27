import type { Messages } from "@/lib/i18n/messages";
import ScrollReveal from "@/components/ScrollReveal";

export default function AdsIntro({ messages }: { messages: Messages }) {
  return (
    <section className="section-space bg-paper">
      <div className="container-edit">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.intro.eyebrow}
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h2 className="text-display-sm font-display font-semibold text-ink">
            {messages.ads.intro.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {messages.ads.intro.paragraph}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
