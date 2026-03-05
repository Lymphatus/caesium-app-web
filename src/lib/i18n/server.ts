// lib/i18n/server.ts
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

const initI18next = async (lang: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`@/i18n/${language}/${namespace}.json`)))
    .init({
      lng: lang,
      fallbackLng: 'en-US',
      ns: ns,
      defaultNS: Array.isArray(ns) ? ns[0] : ns,
      initImmediate: false,
    });
  return i18nInstance;
};

export async function getServerTranslation(lang: string, ns: string | string[] = 'common') {
  const i18nInstance = await initI18next(lang, ns);
  return {
    t: i18nInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nInstance,
  };
}

export async function getTranslationsResources(lang: string, namespaces: string[]) {
  const i18nInstance = await initI18next(lang, namespaces);

  // We extract the initial bundle from i18n store.
  const resources: Record<string, Record<string, Record<string, string>>> = {};
  resources[lang] = {};

  for (const ns of namespaces) {
    resources[lang][ns] = i18nInstance.getResourceBundle(lang, ns) || {};
  }

  // Since we also want the fallback to be available, ensure it's not strictly null.
  return resources;
}
