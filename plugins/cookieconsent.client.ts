import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

export default defineNuxtPlugin(async (_nuxtApp) => {
  await CookieConsent.run({
    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {},
    },

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'We might have cookies 🍪',
            description: 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only upon approval.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Accept Necessary',
            showPreferencesBtn: 'Manage preferences',
          },
          preferencesModal: {
            title: 'Manage cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Accept current selection',
            closeIconLabel: 'Close modal',
            sections: [
              {
                title: 'Strictly Necessary cookies',
                description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: 'necessary',
              },
              {
                title: 'Performance and Analytics',
                description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                linkedCategory: 'analytics',
              },
              {
                title: 'More information',
                description: 'For any queries in relation to my policy on cookies and your choices, please <a target="_blank" href="//saerasoft.com/caesium#contacts">contact us</a>',
              },
            ],
          },
        },
      },
    },
  });
});
