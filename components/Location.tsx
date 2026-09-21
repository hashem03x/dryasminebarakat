import { MapPin } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function Location({ messages }: { messages: Messages }) {
  return (
    <section id={SECTION_ID.location} className="section-space bg-ivory">
      <div className="container-edit grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-12 lg:gap-16">
        <ScrollReveal>
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.location.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.location.title}
          </h2>
          <p className="mt-4 font-display text-xl text-ink">{messages.location.cityLabel}</p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            {messages.location.description}
          </p>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              {messages.location.areasServedLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {messages.location.areasServed.map((area) => (
                <li
                  key={area}
                  className="border border-line px-3 py-1.5 text-sm text-ink-soft"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={SOCIAL_LINKS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded bg-ink px-6 py-3.5 text-base font-medium text-ivory transition-colors duration-200 hover:bg-sage-dark"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            {messages.location.mapCta}
          </a>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div
            className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border border-line bg-sage-pale/50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(65,75,59,0.18) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            role="img"
            aria-label={messages.location.cityLabel}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-sage bg-paper shadow-soft">
              <MapPin className="h-7 w-7 text-sage-dark" aria-hidden="true" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
