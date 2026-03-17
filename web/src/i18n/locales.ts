export type Locale = "pt" | "en";

export const locales: Locale[] = ["pt", "en"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

