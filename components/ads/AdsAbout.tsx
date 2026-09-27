import type { Messages } from "@/lib/i18n/messages";
import ScrollReveal from "@/components/ScrollReveal";

export default function AdsAbout({ messages }: { messages: Messages }) {
  return (
    <section id="about" className="section-space bg-ivory">
      <div className="container-edit">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.about.eyebrow}
          </p>
          <h2 className="text-display-sm font-display font-semibold text-ink">
            {messages.ads.about.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{messages.ads.about.paragraph}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
