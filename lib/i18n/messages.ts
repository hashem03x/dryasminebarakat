import type { Locale } from "./config";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

export type Messages = typeof ar;

const dictionaries: Record<Locale, Messages> = { ar, en };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
