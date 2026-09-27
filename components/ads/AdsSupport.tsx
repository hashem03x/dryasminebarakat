import type { Messages } from "@/lib/i18n/messages";
import ScrollReveal from "@/components/ScrollReveal";

// Replaces the homepage's before/after results gallery on the ads landing
// page — this page must contain zero transformation imagery. A calm,
// editorial statement section instead, making no outcome promises.
export default function AdsSupport({ messages }: { messages: Messages }) {
  return (
    <section className="border-y border-line bg-paper py-20 sm:py-28">
      <div className="container-edit">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.ads.support.eyebrow}
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h2 className="text-display-sm font-display font-semibold text-ink">
            {messages.ads.support.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {messages.ads.support.description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
