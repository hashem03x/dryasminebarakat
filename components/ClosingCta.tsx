import { MessageCircle } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function ClosingCta({ messages }: { messages: Messages }) {
  const whatsappHref = buildWhatsAppUrl(messages.whatsapp.closingMessage);

  return (
    <section id={SECTION_ID.contact} className="bg-sage-dark py-24 text-ivory sm:py-32">
      <div className="container-edit">
        <ScrollReveal className="max-w-3xl">
          <h2 className="text-display-md font-display font-semibold">
            {messages.closingCta.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
            {messages.closingCta.description}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded bg-ivory px-7 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-paper"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {messages.closingCta.button}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
