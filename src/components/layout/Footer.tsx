import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';
import Link from 'next/link';

export default async function Footer() {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'common');

  return (
    <footer className="bg-background-secondary mt-auto w-full p-4 text-xs">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1 text-left">
          <Link href="/cookie-policy" target="_blank">
            {t('cookie_policy')}
          </Link>
          <Link href="/privacy-policy" target="_blank">
            {t('privacy_policy')}
          </Link>
          <a data-cc="show-preferencesModal" href="#">
            {t('consent_preferences')}
          </a>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-xs text-gray-800 dark:text-gray-200">{t('copyright_note', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
