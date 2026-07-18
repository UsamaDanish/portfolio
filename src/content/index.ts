import type { Dictionary } from "./types";
import en from "./en";

/** Locale → dictionary. Falls back to English for any locale not yet authored. */
const dictionaries: Record<string, Dictionary> = {
  en,
};

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
