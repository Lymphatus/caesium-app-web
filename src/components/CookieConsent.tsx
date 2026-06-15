'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as CookieConsentLib from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

/**
 * Initializes vanilla-cookieconsent. We only use it to gate Google Analytics:
 * the GA snippet in `Analytics.tsx` is rendered inert (type="text/plain" +
 * data-category="analytics") and is enabled by this plugin once the user
 * accepts the "analytics" category.
 *
 * The "Consent Preferences" link in the footer (data-cc="show-preferencesModal")
 * is wired up automatically by the plugin. Theming lives in globals.css
 * (`html #cc-main`), which maps the plugin's tokens onto the app's design system.
 */
export default function CookieConsent() {
  const { t, i18n } = useTranslation('common');
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const lang = i18n.language;

    void CookieConsentLib.run({
      guiOptions: {
        consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true },
        preferencesModal: { layout: 'box', equalWeightButtons: true },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: /^_gid/ }, { name: /^_gat/ }],
          },
        },
      },
      language: {
        default: lang,
        translations: {
          [lang]: {
            consentModal: {
              title: t('cc_consent_title'),
              description: t('cc_consent_description'),
              acceptAllBtn: t('cc_accept_all'),
              acceptNecessaryBtn: t('cc_reject_all'),
              showPreferencesBtn: t('cc_manage_preferences'),
            },
            preferencesModal: {
              title: t('cc_prefs_title'),
              acceptAllBtn: t('cc_accept_all'),
              acceptNecessaryBtn: t('cc_reject_all'),
              savePreferencesBtn: t('cc_save_preferences'),
              closeIconLabel: t('cc_close'),
              sections: [
                {
                  title: t('cc_section_usage_title'),
                  description: t('cc_section_usage_description'),
                },
                {
                  title: t('cc_section_necessary_title'),
                  description: t('cc_section_necessary_description'),
                  linkedCategory: 'necessary',
                },
                {
                  title: t('cc_section_analytics_title'),
                  description: t('cc_section_analytics_description'),
                  linkedCategory: 'analytics',
                },
                {
                  title: t('cc_section_more_title'),
                  description: t('cc_section_more_description'),
                },
              ],
            },
          },
        },
      },
    });
  }, [t, i18n.language]);

  return null;
}
