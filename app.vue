<script setup lang="ts">
import {onMounted} from "vue";

useHead({
  title: 'Caesium Image Compressor - Online',
  meta: [
    {
      name: 'description',
      content: "Caesium is a free, open source, online compression tool for photos and images (JPG, PNG), supporting batch, preview and many more. Caesium saves space and makes uploads faster."
    }
  ],
  script: [
    {
      type: 'text/plain',
      'data-cookiecategory': 'analytics',
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=UA-140154178-1"
    },
    {
      type: 'text/plain',
      'data-cookiecategory': 'analytics',
      innerHTML: " window.dataLayer = window.dataLayer || [];\n" +
          "\n" +
          "            function gtag() {\n" +
          "                dataLayer.push(arguments);\n" +
          "            }\n" +
          "\n" +
          "            gtag('js', new Date());\n" +
          "\n" +
          "            gtag('config', 'UA-140154178-1');"
    },
    {
      innerHTML: " var _paq = window._paq = window._paq || [];\n" +
          "            /* tracker methods like \"setCustomDimension\" should be called before \"trackPageView\" */\n" +
          "            _paq.push(['trackPageView']);\n" +
          "            _paq.push(['enableLinkTracking']);\n" +
          "            (function () {\n" +
          "                var u = \"//analytics.saerasoft.com/\";\n" +
          "                _paq.push(['setTrackerUrl', u + 'matomo.php']);\n" +
          "                _paq.push(['setSiteId', '2']);\n" +
          "                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];\n" +
          "                g.async = true;\n" +
          "                g.src = u + 'matomo.js';\n" +
          "                s.parentNode.insertBefore(g, s);\n" +
          "            })();"
    }
  ]
})

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('cc--darkmode')
  }
})
</script>

<template>
  <div class="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
    <PageHeader/>
    <NuxtPage class="flex-1"/>
    <PageFooter/>
  </div>
</template>
