<script setup lang="ts">
import { FolderOpen } from 'lucide-vue-next';

import { useCompressorStore } from '@/stores/compressor';
const { t } = useI18n();

const compressorStore = useCompressorStore();
</script>

<template>
  <div
    class="min-h-[400px] h-2/3 rounded-md border-dashed flex flex-col flex-1 items-center justify-center gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
    @drop.prevent="compressorStore.onFilesAdded($event?.dataTransfer?.files)"
    @dragover.prevent
  >
    <img class="size-36 opacity-30" src="~/assets/images/logo.png" alt="logo" />
    <h2 class="font-medium text-2xl">{{ t('compressor.drop_here') }}</h2>
    <div
      class="w-full sm:w-5/6 py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-300 before:me-6 after:flex-1 after:border-t after:border-gray-300 after:ms-6 dark:text-gray-100 dark:before:border-gray-700 dark:after:border-gray-700"
    >
      {{ t('compressor.or').toUpperCase() }}
    </div>

    <button
      type="button"
      class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-gray-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none justify-center"
      @click="compressorStore.addFiles()"
    >
      <FolderOpen class="size-5" />
      {{ t('compressor.browse_dots') }}
    </button>
  </div>
</template>

<style scoped></style>
