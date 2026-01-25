import { cookies } from 'next/headers';

export async function getLang(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('lang')?.value || 'en-US';
}
