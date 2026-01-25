// lib/i18n/server.ts
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

const initI18next = async (lang: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`@/i18n/${language}/${namespace}.json`)))
    .init({
      lng: lang,
      fallbackLng: 'en-US',
      ns,
      defaultNS: ns,
    });
  return i18nInstance;
};

export async function getServerTranslation(lang: string, ns: string = 'common') {
  const i18nInstance = await initI18next(lang, ns);
  return {
    t: i18nInstance.t,
    i18n: i18nInstance,
  };
}
