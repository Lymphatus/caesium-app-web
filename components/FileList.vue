<script setup lang="ts">

import FileListEntry from "~/components/FileListEntry.vue";

import {useCompressorStore} from '@/stores/compressor'
import {ArrowLeft, FolderDown, Play, Plus, Redo2} from "lucide-vue-next";

const compressorStore = useCompressorStore()
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="">
      <div class=" ">
        <FileListEntry v-for="cImage in compressorStore.files" :cImage="cImage"></FileListEntry>
      </div>

      <div class="flex justify-between items-center">
        <button :disabled="compressorStore.compressionStatus === COMPRESSION_STATUS.COMPRESSING"
                @click="compressorStore.reset()"
                type="button"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400">
          <ArrowLeft class="size-4"/>
          {{ $t('compressor.clear_list') }}
        </button>

        <button v-if="compressorStore.files.length < compressorStore.FILES_LIMIT && compressorStore.compressionStatus === COMPRESSION_STATUS.WAITING"
                @click="compressorStore.addFiles()"
                type="button"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-purple-600 hover:text-purple-800 focus:outline-none focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:text-purple-400 dark:focus:text-purple-400">
          <Plus class="size-4"/>
          {{ $t('compressor.add_dots') }}
        </button>
      </div>

    </div>
    <div class="flex items-center justify-center gap-3">
      <button
          @click="compressorStore.startCompress"
          v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.WAITING || compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED_ALL_ERRORS"
          type="button"
          class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-neutral-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none">
        <Play class="size-5"/>
        {{ $t('compressor.compress') }}
      </button>
      <button
          @click="compressorStore.recompress"
          v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED"
          type="button"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-purple-600 hover:bg-purple-100 hover:text-purple-800 focus:outline-none focus:bg-purple-100 focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:bg-purple-800/30 dark:hover:text-purple-400 dark:focus:bg-purple-800/30 dark:focus:text-purple-400">
        <Redo2 class="size-5"/>
        {{$t('compressor.compress_again')}}
      </button>
      <button
          @click="compressorStore.downloadAll"
          v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED"
          type="button"
          class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-neutral-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none">
        <FolderDown class="size-5"/>
        {{ $t('compressor.download_all') }}
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>