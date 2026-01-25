import { NextRequest, NextResponse } from 'next/server';

export const supportedLangs = ['en-US', 'it-IT', 'es-ES', 'fr-FR', 'pl-PL', 'uk-UA', 'zh-CN', 'zh-TW'];

const langToRegion: Record<string, string> = {
  en: 'en-US',
  it: 'it-IT',
  es: 'es-ES',
  fr: 'fr-FR',
  pl: 'pl-PL',
  uk: 'uk-UA',
  zh: 'zh-CN',
};

function normalizeLang(acceptLang: string): string {
  const parts = acceptLang.split('-');

  if (parts.length === 2) {
    const normalized = `${parts[0]}-${parts[1].toUpperCase()}`;
    if (supportedLangs.includes(normalized)) {
      return normalized;
    }
  }

  const langCode = parts[0].toLowerCase();
  return langToRegion[langCode] || 'en-US';
}

export function proxy(request: NextRequest) {
  const cookieLang = request.cookies.get('lang')?.value;

  if (!cookieLang) {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLang = acceptLanguage?.split(',')[0]?.trim() || 'en-US';

    const lang = normalizeLang(detectedLang);

    const response = NextResponse.next();
    response.cookies.set('lang', lang, {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}
