import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';

export default async function NotFound() {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'error');
  return (
    <div className="container mx-auto flex h-full max-w-300 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-primary text-7xl font-bold md:text-8xl">404</p>
      <h1 className="text-2xl font-semibold md:text-3xl">{t('not_found_title')}</h1>
      <p className="text-muted-foreground max-w-md">{t('not_found_description')}</p>
      <Button asChild>
        <Link href="/">{t('back_home')}</Link>
      </Button>
    </div>
  );
}
