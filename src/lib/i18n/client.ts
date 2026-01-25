// lib/i18n/client.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

void i18next
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => import(`@/i18n/${language}/${namespace}.json`)))
  .init({
    lng: typeof window !== 'undefined' ? document.documentElement.lang : 'en-US',
    fallbackLng: 'en-US',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
