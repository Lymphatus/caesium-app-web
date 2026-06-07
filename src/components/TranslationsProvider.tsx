'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

function createI18nInstance(locale: string, namespaces: string[], resources: Resource) {
  const i18nInstance = createInstance();

  i18nInstance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'en-US',
    ns: namespaces,
    defaultNS: namespaces[0],
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18nInstance;
}

interface TranslationsProviderProps {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}

export default function TranslationsProvider({ children, locale, namespaces, resources }: TranslationsProviderProps) {
  const i18n = createI18nInstance(locale, namespaces, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
