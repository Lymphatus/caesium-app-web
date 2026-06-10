export const supportedLangs = ['en-US', 'it-IT', 'es-ES', 'fr-FR', 'pl-PL', 'uk-UA', 'zh-CN', 'zh-TW'] as const;

export const defaultLang = 'en-US';

// Base language code -> default regional locale, for Accept-Language values
// that don't carry (or carry an unsupported) region.
const langToRegion: Record<string, string> = {
  en: 'en-US',
  it: 'it-IT',
  es: 'es-ES',
  fr: 'fr-FR',
  pl: 'pl-PL',
  uk: 'uk-UA',
  zh: 'zh-CN',
};

export function isSupportedLang(lang: string | undefined | null): boolean {
  return !!lang && (supportedLangs as readonly string[]).includes(lang);
}

// Picks a supported locale from an Accept-Language header value, falling back to
// the default when nothing matches.
export function detectLang(acceptLanguage: string | undefined | null): string {
  const first = acceptLanguage?.split(',')[0]?.trim();
  if (!first) return defaultLang;

  const parts = first.split('-');
  if (parts.length === 2) {
    const normalized = `${parts[0]}-${parts[1].toUpperCase()}`;
    if (isSupportedLang(normalized)) return normalized;
  }

  return langToRegion[parts[0].toLowerCase()] || defaultLang;
}
