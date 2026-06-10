export const supportedLangs = ['en-US', 'it-IT', 'es-ES', 'fr-FR', 'pl-PL', 'uk-UA', 'zh-CN', 'zh-TW'] as const;

export const defaultLang = 'en-US';

// Normalises an untrusted language value (e.g. a cookie) to a supported locale,
// falling back to the default when it is missing or unrecognised.
export function resolveLang(lang: string | undefined | null): string {
  return lang && (supportedLangs as readonly string[]).includes(lang) ? lang : defaultLang;
}
