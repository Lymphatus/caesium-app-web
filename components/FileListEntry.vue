<script setup lang="ts">
import { type CImage, COMPRESSION_MODE } from '~/utils/utils';
import prettyBytes from 'pretty-bytes';
import { CircleAlert, TriangleAlert, Download, Eye, Trash2 } from 'lucide-vue-next';
import { useCompressorStore } from '@/stores/compressor';
import CompareBox from '~/components/CompareBox.vue';

const compressorStore = useCompressorStore();
const showPreview = ref(false);

const props = defineProps<{
  cImage: CImage;
}>();

function onPreviewClose() {
  showPreview.value = false;
}
</script>

<template>
  <CompareBox v-if="showPreview" :c-image="cImage" :on-close="onPreviewClose" />
  <div class="flex border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 gap-4 items-center">
    <div class="flex whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 items-center pl-4">
      <div class="rounded-xl size-10 bg-center bg-cover border-2 border-gray-200 dark:border-gray-700" :style="['background-image: url(\'' + cImage.url + '\')']">&nbsp;</div>
    </div>
    <div class="flex flex-col py-2 text-sm text-gray-800 dark:text-gray-200 flex-1 gap-1 truncate">
      <span class="font-medium">{{ props.cImage.file.name }}</span>
      <div class="flex gap-1">
        <span :class="{ 'line-through opacity-50': props.cImage.newSize > 0 }">{{ prettyBytes(props.cImage.file.size) }}</span>
        <span v-if="props.cImage.newSize > 0">
          → {{ prettyBytes(props.cImage.newSize) }}
          <span :class="[cImage.newSize > cImage.file.size ? 'text-red-600 dark:text-red-500' : 'text-emerald-600 dark:text-emerald-500']">[{{ Math.round((cImage.newSize / cImage.file.size) * 100) - 100 }}%]</span></span
        >
        <span
          v-if="compressorStore.compressionMode === COMPRESSION_MODE.SIZE && cImage.newSize && cImage.newSize > compressorStore.maxSizeValue * compressorStore.maxSizeUnit"
          class="text-sm text-amber-600 dark:text-amber-500 flex items-center gap-1"
          ><TriangleAlert class="size-4"
        /></span>
      </div>
    </div>
    <div v-if="cImage.errorMessage" class="text-sm text-red-600 dark:text-red-500 flex items-center gap-1"><CircleAlert class="size-3" />{{ cImage.errorMessage }}</div>
    <div class="flex py-2 text-end text-sm font-medium align-bottom pr-4 items-center">
      <button
        v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED || compressorStore.compressionStatus === COMPRESSION_STATUS.WAITING"
        type="button"
        class="inline-flex items-center px-1 text-sm font-semibold rounded-lg border border-transparent text-purple-600 hover:text-purple-800 focus:outline-hidden focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:text-purple-400 dark:focus:text-purple-400"
      >
        <Eye class="size-4" @click="showPreview = true" />
      </button>
      <button
        v-if="compressorStore.compressionStatus === COMPRESSION_STATUS.WAITING || compressorStore.compressionStatus === COMPRESSION_STATUS.FINISHED_ALL_ERRORS"
        type="button"
        class="inline-flex items-center px-1 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-hidden focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
        @click="compressorStore.removeFile(cImage.key)"
      >
        <Trash2 class="size-4" />
      </button>
      <div v-if="cImage.status === FILE_STATUS.COMPRESSING" class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-purple-600 rounded-full dark:text-purple-500" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <a
        v-if="cImage.status === FILE_STATUS.FINISHED"
        :download="cImage.file.name"
        :href="cImage.outputImageUrl || '#'"
        target="_blank"
        class="inline-flex items-center px-1 text-sm font-semibold rounded-lg border border-transparent text-purple-600 hover:text-purple-800 focus:outline-hidden focus:text-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:hover:text-purple-400 dark:focus:text-purple-400"
      >
        <Download class="size-4" />
      </a>
    </div>
  </div>
</template>

<style scoped></style>
