<script setup lang="ts">
import {Languages} from "lucide-vue-next";

const {locales, setLocale} = useI18n()
</script>

<template>
  <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-100 text-sm py-3 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <nav class="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="global">
      <div class="flex items-center justify-between">
        <NuxtLink class="flex items-center gap-2" :to="{name: 'index'}">
          <img class="size-10" src="~/assets/images/logo.png" alt="logo">
          <h2 class="hidden sm:block text-gray-600 dark:text-gray-400 text-lg"><span class="font-medium">Caesium</span> Image Compressor</h2>
        </NuxtLink>
        <div class="sm:hidden">
          <button
              type="button"
              class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-gray-100 dark:hover:bg-white/10"
              data-hs-collapse="#navbar-menu" aria-controls="navbar-menu" aria-label="Toggle navigation">
            <svg
                class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
              <line x1="3" x2="21" y1="6" y2="6"/>
              <line x1="3" x2="21" y1="12" y2="12"/>
              <line x1="3" x2="21" y1="18" y2="18"/>
            </svg>
            <svg
                class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      </div>
      <div id="navbar-menu" class="hs-collapse hidden overflow-hidden transition-all duration-300 sm:block">
        <div class="flex flex-col gap-4 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <NuxtLink class="font-medium text-gray-600 hover:text-purple-400 dark:text-gray-400 dark:hover:text-purple-500 cursor-pointer" :to="{name: 'about'}">{{ $t('compressor.donate') }}</NuxtLink>

          <div class="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] ">
            <button id="hs-mega-menu-basic-dr" type="button" class="flex items-center w-full text-gray-600 hover:text-purple-400 font-medium dark:text-gray-400 dark:hover:text-purple-500 ">
              <Languages class="size-4"/>
              <svg class="ms-1 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <div
                class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">

              <a
                  v-for="locale in locales" :key="locale.code" href="#"
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-purple-300"
                  @click.prevent.stop="setLocale(locale.code)">
                <img class="size-4" :src="locale.flag" alt="logo"> {{ locale.code }}
              </a>
            </div>
          </div>

          <button type="button" class="hs-dark-mode-active:hidden block hs-dark-mode group items-center text-gray-600 hover:text-purple-600 font-medium dark:text-gray-400 dark:hover:text-purple-500" data-hs-theme-click-value="dark">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          </button>
          <button type="button" class="hs-dark-mode-active:block hidden hs-dark-mode group items-center text-gray-600 hover:text-purple-600 font-medium dark:text-gray-400 dark:hover:text-purple-500" data-hs-theme-click-value="light">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2"/>
              <path d="M12 20v2"/>
              <path d="m4.93 4.93 1.41 1.41"/>
              <path d="m17.66 17.66 1.41 1.41"/>
              <path d="M2 12h2"/>
              <path d="M20 12h2"/>
              <path d="m6.34 17.66-1.41 1.41"/>
              <path d="m19.07 4.93-1.41 1.41"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>