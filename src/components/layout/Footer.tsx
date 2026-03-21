import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';
import Link from 'next/link';

export default async function Footer() {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'common');

  return (
    <footer className="bg-background mt-auto w-full border-t">
      <div className="container mx-auto px-4 py-8 md:px-0">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <Link className="text-sm font-semibold tracking-tight" href="/">
              {t('app_name')}
            </Link>
          </div>

          {/* Link columns */}
          <div className="mx-auto flex gap-12 text-center text-xs md:mx-0 md:text-right">
            <div className="flex flex-col gap-2">
              <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/cookie-policy" target="_blank">
                {t('cookie_policy')}
              </Link>
              <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/privacy-policy" target="_blank">
                {t('privacy_policy')}
              </Link>
              <a className="text-muted-foreground hover:text-foreground transition-colors" data-cc="show-preferencesModal" href="#">
                {t('consent_preferences')}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/donate">
                {t('donate')}
              </Link>
              <Link className="text-muted-foreground hover:text-foreground transition-colors" href="https://github.com/Lymphatus/caesium-app-web" rel="noopener noreferrer" target="_blank">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 py-3">
        <p className="text-muted-foreground text-center text-xs">{t('copyright_note', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
