<script setup lang="ts">
import type { CImage } from '~/utils/utils';
import { ref } from 'vue';
import prettyBytes from 'pretty-bytes';
import { ArrowLeftRight, X } from 'lucide-vue-next';
const { t } = useI18n();

const props = defineProps<{
  cImage: CImage;
  onClose: CallableFunction;
}>();

const showOriginal = ref(true);
</script>

<template>
  <div class="fixed top-0 left-0 size-full bg-gray-800/95 z-10 p-4 flex flex-col items-center justify-center gap-2" @click.self="() => props.onClose()">
    <button
      type="button"
      class="absolute z-10 right-2 top-2 p-1 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none text-white hover:bg-gray-700 focus:bg-gray-700"
    >
      <X class="size-4" @click="() => props.onClose()" />
    </button>
    <div class="size-full flex flex-col items-center justify-center relative" @click.self="() => props.onClose()">
      <img :src="props.cImage.url" class="absolute object-contain max-w-full max-h-full" :class="[showOriginal ? 'opacity-100' : 'opacity-0']" alt="original" />
      <img
        v-if="props.cImage.outputImageArray && props.cImage.outputImageUrl"
        :src="props.cImage.outputImageUrl"
        class="absolute object-contain max-w-full max-h-full"
        :class="[!showOriginal ? 'opacity-100' : 'opacity-0']"
        alt="compressed"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span v-if="showOriginal" class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 text-white uppercase">{{ t('compressor.original') }} - {{ prettyBytes(props.cImage.file.size) }}</span>
      <span v-else class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 text-white uppercase">{{ t('compressor.compressed') }} - {{ prettyBytes(props.cImage.newSize || 0) }}</span>
    </div>
    <button
      v-if="props.cImage.outputImageArray"
      type="button"
      class="transition p-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-purple-500 text-gray-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none"
      @click="showOriginal = !showOriginal"
    >
      <ArrowLeftRight class="size-4" />
      {{ t('compressor.swap') }}
    </button>
  </div>
</template>

<style scoped></style>
