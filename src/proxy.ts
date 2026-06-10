import { NextRequest, NextResponse } from 'next/server';
import { defaultLang, supportedLangs } from '@/lib/i18n/config';

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
    if ((supportedLangs as readonly string[]).includes(normalized)) {
      return normalized;
    }
  }

  const langCode = parts[0].toLowerCase();
  return langToRegion[langCode] || defaultLang;
}

export function proxy(request: NextRequest) {
  const cookieLang = request.cookies.get('lang')?.value;

  // Re-detect when the cookie is missing or has been tampered with (not a supported locale).
  if (!cookieLang || !(supportedLangs as readonly string[]).includes(cookieLang)) {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLang = acceptLanguage?.split(',')[0]?.trim() || defaultLang;

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
