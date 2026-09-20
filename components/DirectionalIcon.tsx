import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

export default function DirectionalIcon({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const Icon = locale === "ar" ? ArrowLeft : ArrowRight;
  return <Icon aria-hidden="true" className={className} />;
}
