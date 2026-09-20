"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { buildWhatsAppUrl } from "@/lib/constants";

export default function WhatsAppFloating({
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  // Compacting-on-scroll is a JS-driven enhancement; the button itself is
  // always rendered visible by default (the fade-in is pure CSS via
  // animate-fade-in below, so it plays even if this effect never runs).
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsCompact(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = buildWhatsAppUrl(messages.whatsapp.floatingMessage);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={messages.whatsapp.floatingLabel}
      className={`animate-fade-in fixed z-40 flex h-12 items-center justify-center gap-2 rounded-full bg-sage text-paper shadow-soft transition-[width,padding] duration-300 ease-editorial hover:bg-sage-dark ${
        isCompact ? "w-12 px-0" : "px-5"
      }`}
      style={{
        insetInlineEnd: "1.25rem",
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        animationDelay: "400ms",
      }}
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      {!isCompact && (
        <span className="whitespace-nowrap text-sm font-medium">
          {messages.whatsapp.floatingLabel}
        </span>
      )}
    </a>
  );
}
