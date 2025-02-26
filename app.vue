<script setup lang="ts">
import { onMounted } from 'vue';
import { APP_THEME } from '~/utils/utils';
import { useCompressorStore } from '~/stores/compressor';

const gtag = useRuntimeConfig().public.gtag || '';
const matomoEndpoint = useRuntimeConfig().public.matomoEndpoint || '';

const compressorStore = useCompressorStore();

useHead({
  title: 'Caesium Image Compressor - Online',
  meta: [
    {
      name: 'description',
      content: 'Caesium is a free, open source, online compression tool for photos and images (JPG, PNG), supporting batch, preview and many more. Caesium saves space and makes uploads faster.',
    },
  ],
  script: [
    {
      'data-category': 'analytics',
      type: 'text/plain',
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=' + gtag,
    },
    {
      'data-category': 'analytics',
      type: 'text/plain',
      innerHTML: 'window.dataLayer = window.dataLayer || [];\n' + '  function gtag(){dataLayer.push(arguments);}\n' + "  gtag('js', new Date());\n" + '\n' + "  gtag('config', '" + gtag + "');",
    },
    {
      innerHTML:
        ' var _paq = window._paq = window._paq || [];\n' +
        '            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */\n' +
        "            _paq.push(['trackPageView']);\n" +
        "            _paq.push(['enableLinkTracking']);\n" +
        '            (function () {\n' +
        '                var u = "' +
        matomoEndpoint +
        '/";\n' +
        "                _paq.push(['setTrackerUrl', u + 'matomo.php']);\n" +
        "                _paq.push(['setSiteId', '2']);\n" +
        "                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];\n" +
        '                g.async = true;\n' +
        "                g.src = u + 'matomo.js';\n" +
        '                s.parentNode.insertBefore(g, s);\n' +
        '            })();',
    },
    {
      innerHTML:
        '(function () {\n' +
        "  const theme = localStorage.getItem('appTheme') || 'system';\n" +
        "  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n" +
        "  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);\n" +
        '  if (isDark) {\n' +
        "    document.documentElement.classList.add('dark');\n" +
        "    document.documentElement.classList.add('cc--darkmode');\n" +
        '  }\n' +
        '})();',
    },
  ],
});

onMounted(() => {
  const forceDark = compressorStore.appTheme === APP_THEME.DARK || (compressorStore.appTheme === APP_THEME.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('cc--darkmode', forceDark);
  document.documentElement.classList.toggle('dark', forceDark);
});
</script>

<template>
  <div class="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
    <PageHeader />
    <NuxtPage class="flex-1" />
    <PageFooter />
  </div>
</template>
