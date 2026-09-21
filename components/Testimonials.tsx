import { Quote } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function Testimonials({ messages }: { messages: Messages }) {
  return (
    <section
      id={SECTION_ID.testimonials}
      className="section-space bg-ink text-ivory"
    >
      <div className="container-edit">
        <ScrollReveal>
          <p className="mb-5 flex  items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage-light">
            <span className="h-px w-8 bg-sage-light" aria-hidden="true" />
            {messages.testimonials.eyebrow}
          </p>
          <h2 className="text-white   max-w-2xl text-display-sm font-display font-semibold">
            {messages.testimonials.title}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 divide-y divide-ivory/15 lg:grid-cols-2 lg:gap-16 lg:divide-y-0">
          {messages.testimonials.items.map((item, index) => (
            <ScrollReveal
              key={item.name + index}
              delayMs={index * 120}
              className={
                index > 0
                  ? "pt-12 lg:border-s lg:border-ivory/15 lg:ps-16 lg:pt-0"
                  : ""
              }
            >
              <Quote className="h-9 w-9 text-sage-light" aria-hidden="true" />
              <p className="mt-6 font-display text-2xl leading-snug text-ivory/95 sm:text-3xl">
                {item.quote}
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-wide text-ivory/60">
                {item.name}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
