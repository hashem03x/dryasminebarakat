import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID, ABOUT_PORTRAIT } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function About({ messages }: { messages: Messages }) {
  return (
    <section id={SECTION_ID.about} className="section-space bg-paper">
      <div className="container-edit">
        <ScrollReveal className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {messages.about.eyebrow}
          </p>
          <h2 className="text-display-md font-display font-semibold text-ink">
            {messages.about.title}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal delayMs={100} className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden border border-line bg-sand-light">
              <Image
                src={ABOUT_PORTRAIT}
                alt={messages.about.portraitAlt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={200} className="lg:col-span-7">
            <div className="space-y-6">
              {messages.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-prose text-lg leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-s-2 border-sage-light ps-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                {messages.about.credentialsTitle}
              </h3>
              <p className="mt-2 text-base italic text-ink-faint">
                {messages.about.credentialsPlaceholder}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
