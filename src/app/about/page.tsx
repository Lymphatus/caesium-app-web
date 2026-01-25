import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';

export default async function Page() {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'about');
  return (
    <div>
      <h1>{t('about')}</h1>
      <section>
        <h2>{t('description')}</h2>
      </section>
    </div>
  );
}
