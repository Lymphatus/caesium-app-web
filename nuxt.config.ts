// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n', '@nuxt/eslint', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  srcDir: 'app',
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],

  i18n: {
    //    vueI18n: './i18n/i18n.ts',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: false,
      fallbackLocale: 'en-US',
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en-US',
        file: 'en-US.json',
        flag: '/images/flags/us.svg',
      },
      {
        code: 'es-ES',
        file: 'es-ES.json',
        flag: '/images/flags/es.svg',
      },
      {
        code: 'fr-FR',
        file: 'fr-FR.json',
        flag: '/images/flags/fr.svg',
      },
      {
        code: 'it-IT',
        file: 'it-IT.json',
        flag: '/images/flags/it.svg',
      },
      {
        code: 'pl-PL',
        file: 'pl-PL.json',
        flag: '/images/flags/pl.svg',
      },
      {
        code: 'uk-UA',
        file: 'uk-UA.json',
        flag: '/images/flags/ua.svg',
      },
      {
        code: 'zh-CN',
        file: 'zh-CN.json',
        flag: '/images/flags/cn.svg',
      },
      {
        code: 'zh-TW',
        file: 'zh-TW.json',
        flag: '/images/flags/tw.svg',
      },
    ],
  },

  plugins: ['~/plugins/preline.client.ts'],

  nitro: {
    experimental: {
      wasm: true,
    },
  },

  compatibilityDate: '2024-10-08',

  runtimeConfig: {
    public: {
      apiHost: '',
      compressorMaxFileSize: 20000000,
      compressorMaxFiles: 10,
      sendUsageReport: true,
      gtag: '',
      matomoEndpoint: '',
    },
  },
});
