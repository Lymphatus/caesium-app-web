<script setup lang="ts">
import { ChevronDown, Heart, Languages, Menu, Moon, Sun, SunMoon, X } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { APP_THEME } from '~/utils/utils';
import { useCompressorStore } from '@/stores/compressor';

const { locales, setLocale, t } = useI18n();

const compressorStore = useCompressorStore();

function toggleTheme(theme: APP_THEME) {
  compressorStore.appTheme = theme;
}
</script>

<template>
  <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-100 text-sm py-3 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <nav class="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="global">
      <div class="flex items-center justify-between">
        <a href="/" class="flex items-center gap-2">
          <img class="size-10" src="~/assets/images/logo.png" alt="logo" />
          <h2 class="hidden sm:block text-gray-900 dark:text-gray-100 text-lg"><span class="font-medium">Caesium</span> Image Compressor</h2>
        </a>
        <div class="sm:hidden">
          <button
            type="button"
            class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-gray-100 dark:hover:bg-white/10"
            data-hs-collapse="#navbar-menu"
            aria-controls="navbar-menu"
            aria-label="Toggle navigation"
          >
            <Menu class="hs-collapse-open:hidden shrink-0 size-4" />
            <X class="hs-collapse-open:block hidden shrink-0 size-4" />
          </button>
        </div>
      </div>
      <div id="navbar-menu" class="hs-collapse hidden overflow-hidden transition-all duration-300 sm:block">
        <div class="flex flex-col gap-4 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <NuxtLink class="group font-medium text-gray-600 hover:text-purple-400 dark:text-gray-400 dark:hover:text-purple-500 cursor-pointer flex items-center gap-1 transition-colors" :to="{ name: 'donate' }">
            <Heart class="size-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            {{ t('compressor.donate') }}
          </NuxtLink>
          <!--          <NuxtLink class="font-medium text-gray-600 hover:text-purple-400 dark:text-gray-400 dark:hover:text-purple-500 cursor-pointer" :to="{name: 'about'}">{{ t('compressor.about') }}</NuxtLink>-->
          <div class="hs-dropdown relative inline-flex">
            <button id="hs-dropdown-custom-trigger" type="button" class="hs-dropdown-toggle flex items-center w-full text-gray-600 hover:text-purple-400 font-medium dark:text-gray-400 dark:hover:text-purple-500">
              <Languages class="size-4" />
              <ChevronDown class="size-4" />
            </button>

            <div
              class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-custom-trigger"
            >
              <div class="p-1 space-y-0.5">
                <a
                  v-for="locale in locales"
                  :key="locale.code"
                  href="#"
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-purple-300"
                  @click.prevent.stop="setLocale(locale.code)"
                >
                  <img class="size-4" :src="locale.flag as string" alt="logo" /> {{ locale.code }}
                </a>
              </div>
            </div>
          </div>
          <button
            v-if="compressorStore.appTheme === APP_THEME.LIGHT"
            type="button"
            class="group items-center text-gray-600 hover:text-purple-400 font-medium dark:text-gray-400 dark:hover:text-purple-500"
            @click="toggleTheme(APP_THEME.DARK)"
          >
            <Sun class="size-4" />
          </button>
          <button
            v-if="compressorStore.appTheme === APP_THEME.DARK"
            type="button"
            class="group items-center text-gray-600 hover:text-purple-400 font-medium dark:text-gray-400 dark:hover:text-purple-500"
            @click="toggleTheme(APP_THEME.SYSTEM)"
          >
            <Moon class="size-4" />
          </button>
          <button
            v-if="compressorStore.appTheme === APP_THEME.SYSTEM"
            type="button"
            class="group items-center text-gray-600 hover:text-purple-400 font-medium dark:text-gray-400 dark:hover:text-purple-500"
            @click="toggleTheme(APP_THEME.LIGHT)"
          >
            <SunMoon class="size-4" />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
