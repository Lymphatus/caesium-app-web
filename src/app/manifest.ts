import type { MetadataRoute } from 'next';
import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'common');

  return {
    name: t('app_name'),
    short_name: 'Caesium',
    description: t('meta_description'),
    lang,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
