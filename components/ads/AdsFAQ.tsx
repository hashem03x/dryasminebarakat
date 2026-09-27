"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import ScrollReveal from "@/components/ScrollReveal";

// Takes only the ads FAQ slice, not the full Messages object — this is a
// client component, so whatever is passed here is serialized in full into
// the page's hydration payload, and this page must not leak the homepage's
// copy into its HTML.
export default function AdsFAQ({ faq }: { faq: Messages["ads"]["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="section-space bg-ivory">
      <div className="container-edit">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {faq.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">{faq.title}</h2>
        </ScrollReveal>

        <div className="mt-14 max-w-3xl divide-y divide-line border-y border-line">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-trigger-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <ScrollReveal key={item.question} delayMs={Math.min(index, 4) * 50}>
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-start"
                  >
                    <span className="font-display text-lg font-medium text-ink sm:text-xl">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-sage transition-transform duration-300 ease-editorial ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="grid transition-[grid-template-rows] duration-300 ease-editorial"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-base leading-relaxed text-ink-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
