<script setup lang="ts">
import FileListEntry from '~/components/FileListEntry.vue';

import { useCompressorStore } from '@/stores/compressor';
import { ArrowLeft, FolderDown, ListX, Play, Plus, Redo2 } from 'lucide-vue-next';

const compressorStore = useCompressorStore();
</script>

<template>
  <div class="flex flex-col justify-between h-full flex-1">
    <div>
      <button
        :disabled="compressorStore.compressionStatus === COMPRESSION_STATUS.COMPRESSING"
        type="button"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-purple-600 hover:text-purple-800 focus:outline-hidden focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:text-purple-400 dark:focus:text-purple-400"
        @click="compressorStore.reset()"
      >
        <ArrowLeft class="size-4" />
        {{ $t('compressor.back') }}
      </button>
      <div>
        <FileListEntry v-for="cImage in compressorStore.files" :key="cImage.key" :c-image="cImage" />
      </div>

      <div class="flex justify-between items-center">
        <button
          :disabled="compressorStore.compressionStatus === COMPRESSION_STATUS.COMPRESSING"
          type="button"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-hidden focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
          @click="compressorStore.reset()"
        >
          <ListX class="size-4" />
          {{ $t('compressor.clear_list') }}
        </button>

        <button
          v-if="compressorStore.files.length < compressorStore.FILES_LIMIT && compressorStore.compressionStatus === COMPRESSION_STATUS.WAITING"
          type="button"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-purple-600 hover:text-purple-800 focus:outline-hidden focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:text-purple-400 dark:focus:text-purple-400"
          @click="compressorStore.addFiles()"
        >
          <Plus class="size-4" />
          {{ $t('compressor.add_dots') }}
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center gap-3">
      <button
        v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.WAITING || compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED_ALL_ERRORS"
        type="button"
        class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-gray-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none"
        @click="compressorStore.startCompress"
      >
        <Play class="size-5" />
        {{ $t('compressor.compress') }}
      </button>
      <button
        v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED"
        type="button"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-purple-600 hover:bg-purple-100 hover:text-purple-800 focus:outline-hidden focus:bg-purple-100 focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:bg-purple-800/30 dark:hover:text-purple-400 dark:focus:bg-purple-800/30 dark:focus:text-purple-400"
        @click="compressorStore.recompress"
      >
        <Redo2 class="size-5" />
        {{ $t('compressor.compress_again') }}
      </button>
      <button
        v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED"
        type="button"
        class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-gray-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none"
        @click="compressorStore.downloadAll"
      >
        <FolderDown class="size-5" />
        {{ $t('compressor.download_all') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
