// Central i18n config + helpers for SSG localized routing.
// defaultLocale lives at root ("/"); other locales are prefixed ("/vi/...").

export const defaultLocale = "en" as const;
export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

/** BCP47 language tag for the <html lang> attribute, per locale. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  vi: "vi",
};

/** Detect the active locale from a pathname like "/vi/docs". */
export function getLocale(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

/**
 * Localize an internal path for a given locale.
 * - Non-internal links (http, #, mailto, etc.) are returned unchanged.
 * - defaultLocale ("en") maps to the unprefixed root ("/docs").
 * - Other locales get a prefix ("/vi/docs").
 */
export function localizePath(path: string, locale: Locale): string {
  // Leave external links, anchors, and protocol-relative URLs untouched.
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  if (locale === defaultLocale) return path;

  // Avoid double-prefixing if the path already starts with the locale.
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;

  // "/" -> "/vi", "/docs" -> "/vi/docs"
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
