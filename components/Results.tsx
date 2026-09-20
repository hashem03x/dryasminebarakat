import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";
import { RESULT_IMAGES, SECTION_ID } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function Results({ messages }: { messages: Messages }) {
  return (
    <section id={SECTION_ID.results} className="section-space bg-paper">
      <div className="container-edit">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.results.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.results.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{messages.results.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-faint">{messages.results.privacyNote}</p>
        </ScrollReveal>
      </div>

      <div className="container-edit mt-14">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {messages.results.items.map((item, index) => {
            const images = RESULT_IMAGES[index];
            return (
              <ScrollReveal
                key={item.title}
                delayMs={index * 100}
                className="w-[82vw] shrink-0 snap-start border border-line bg-ivory sm:w-[380px] lg:w-auto"
              >
                <div className="grid grid-cols-2">
                  <div className="relative aspect-[3/4] overflow-hidden border-e border-line">
                    <Image
                      src={images.before}
                      alt={`${item.title} — ${messages.results.beforeLabel}`}
                      fill
                      loading="lazy"
                      // Placeholders are SVG; remove `unoptimized` once these are real photography.
                      unoptimized
                      sizes="(min-width: 1024px) 20vw, 40vw"
                      className="object-contain"
                    />
                    <span className="absolute start-2 top-2 rounded bg-paper/90 px-2 py-1 text-xs font-medium text-ink">
                      {messages.results.beforeLabel}
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={images.after}
                      alt={`${item.title} — ${messages.results.afterLabel}`}
                      fill
                      loading="lazy"
                      // Placeholders are SVG; remove `unoptimized` once these are real photography.
                      unoptimized
                      sizes="(min-width: 1024px) 20vw, 40vw"
                      className="object-contain"
                    />
                    <span className="absolute start-2 top-2 rounded bg-sage px-2 py-1 text-xs font-medium text-paper">
                      {messages.results.afterLabel}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-sage">
                    {messages.results.anonymousLabel}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-ink-faint">{messages.results.placeholderNote}</p>
      </div>
    </section>
  );
}
