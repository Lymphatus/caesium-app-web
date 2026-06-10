import { cookies, headers } from 'next/headers';
import { detectLang, isSupportedLang } from './config';

export async function getLang(): Promise<string> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('lang')?.value;

  // Honour an explicit, valid language choice; otherwise detect from the
  // browser's Accept-Language header.
  if (isSupportedLang(cookieLang)) {
    return cookieLang!;
  }

  const headerStore = await headers();
  return detectLang(headerStore.get('accept-language'));
}
