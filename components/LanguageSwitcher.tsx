"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

export default function LanguageSwitcher({
  locale,
  messages,
  variant = "default",
}: {
  locale: Locale;
  messages: Messages;
  variant?: "default" | "compact";
}) {
  const router = useRouter();
  const pathname = usePathname();

  function hrefFor(target: Locale) {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${target}${rest ? `/${rest}` : ""}`;
  }

  function handleClick(event: React.MouseEvent, target: Locale) {
    event.preventDefault();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${hrefFor(target)}${hash}`);
  }

  const options: { code: Locale; label: string }[] = [
    { code: "ar", label: messages.languageSwitcher.ar },
    { code: "en", label: messages.languageSwitcher.en },
  ];

  return (
    <div
      role="group"
      aria-label={messages.languageSwitcher.label}
      className={`flex items-center gap-2 font-body ${variant === "compact" ? "text-xs" : "text-sm"}`}
    >
      {options.map((option, index) => {
        const isActive = option.code === locale;
        return (
          <span key={option.code} className="flex items-center gap-2">
            {index > 0 && <span className="text-ink-faint" aria-hidden="true">/</span>}
            <Link
              href={hrefFor(option.code)}
              onClick={(event) => handleClick(event, option.code)}
              aria-current={isActive ? "true" : undefined}
              className={`transition-colors duration-200 ${
                isActive
                  ? "text-ink underline decoration-sage decoration-2 underline-offset-4"
                  : "text-ink-faint hover:text-sage"
              }`}
            >
              {option.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
