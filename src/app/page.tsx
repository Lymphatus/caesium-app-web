import { getLang } from '@/lib/i18n/lang-context';
import { getServerTranslation } from '@/lib/i18n/server';
import DropAreaContainer from '@/components/DropAreaContainer';

export default async function Home() {
  const lang = await getLang();
  const { t } = await getServerTranslation(lang, 'common');
  return (
    <div className="container mx-auto w-full p-4">
      <DropAreaContainer></DropAreaContainer>
    </div>
  );
}
