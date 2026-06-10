import { cookies } from 'next/headers';
import { resolveLang } from './config';

export async function getLang(): Promise<string> {
  const cookieStore = await cookies();
  return resolveLang(cookieStore.get('lang')?.value);
}
