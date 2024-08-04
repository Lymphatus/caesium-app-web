<script setup lang="ts">
import {onMounted} from "vue";

useHead({
  title: 'Caesium Image Compressor - Online',
  meta: [
    {name: 'description', content: "Caesium is a free, open source, online compression tool for photos and images (JPG, PNG), supporting batch, preview and many more. Caesium saves space and makes uploads faster."}
  ],
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
