<script setup lang="ts">
import {useCompressorStore} from '@/stores/compressor'
import {CircleHelp} from 'lucide-vue-next';
import {COMPRESSION_MODE} from "~/utils/utils";

const compressorStore = useCompressorStore()
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-neutral-200 dark:border-neutral-700" :class="{'opacity-50 pointer-events-none': compressorStore.compressionStatus === COMPRESSION_STATUS.COMPRESSING}">
    <div class="w-full sm:w-1/2 flex flex-col gap-2">
      <div class="flex justify-between items-center border-b border-neutral-300 dark:border-neutral-700 pb-2">
        <span>{{ $t('compressor.mode') }}</span>

        <select
            v-model="compressorStore.compressionMode"
            class="py-2 px-3 pe-9 block border-neutral-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        >
          <option :value="COMPRESSION_MODE.QUALITY">{{ $t('compressor.quality') }}</option>
          <option :value="COMPRESSION_MODE.SIZE">{{ $t('compressor.size') }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <div v-if="compressorStore.compressionMode === COMPRESSION_MODE.QUALITY">
          <div class="flex items-center justify-between">
            <label for="quality-range-slider">Quality</label>
            <span v-html="compressorStore.quality"></span>
          </div>
          <input :disabled="compressorStore.lossless" v-model.number="compressorStore.quality" type="range" id="quality-range-slider" min="1" max="100"
                 class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                        [&::-webkit-slider-thumb]:w-2.5
                        [&::-webkit-slider-thumb]:h-2.5
                        [&::-webkit-slider-thumb]:-mt-0.5
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(147,51,234,1)]
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:transition-all
                        [&::-webkit-slider-thumb]:duration-150
                        [&::-webkit-slider-thumb]:ease-in-out
                        [&::-webkit-slider-thumb]:dark:bg-neutral-800

                        [&::-moz-range-thumb]:w-2.5
                        [&::-moz-range-thumb]:h-2.5
                        [&::-moz-range-thumb]:appearance-none
                        [&::-moz-range-thumb]:bg-purple-600
                        [&::-moz-range-thumb]:border-4
                        [&::-moz-range-thumb]:border-purple-600
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:transition-all
                        [&::-moz-range-thumb]:duration-150
                        [&::-moz-range-thumb]:ease-in-out

                        [&::-webkit-slider-runnable-track]:w-full
                        [&::-webkit-slider-runnable-track]:h-2
                        [&::-webkit-slider-runnable-track]:bg-neutral-100
                        [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-webkit-slider-runnable-track]:dark:bg-neutral-800

                        [&::-moz-range-track]:w-full
                        [&::-moz-range-track]:h-2
                        [&::-moz-range-track]:bg-neutral-100
                        [&::-moz-range-track]:dark:bg-neutral-800
                        [&::-moz-range-track]:rounded-full

                        [&::-moz-range-progress]:dark:bg-purple-900
                        [&::-moz-range-progress]:bg-purple-200
                        [&::-moz-range-progress]:h-2
                        [&::-moz-range-progress]:rounded-full
                      "
          >
        </div>

        <div v-if="compressorStore.compressionMode === COMPRESSION_MODE.SIZE">
          <div class="space-y-3 mt-0.5">
            <div class="flex items-center justify-between gap-4">
              <label for="hs-inline-leading-pricing-select-label" class="block text-sm font-medium dark:text-white">{{ $t('compressor.max_size') }}</label>
              <div class="relative flex-1">
                <input v-model.number="compressorStore.maxSizeValue"
                       type="number" id="hs-inline-leading-pricing-select-label" name="inline-add-on"
                       class="py-3 px-4 block w-full border-neutral-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                       placeholder="100">
                <div class="absolute inset-y-0 end-0 flex items-center text-neutral-500 pe-0.5">
                  <label for="hs-inline-leading-select-currency" class="sr-only"></label>
                  <select v-model.number="compressorStore.maxSizeUnit" id="hs-inline-leading-select-currency" name="hs-inline-leading-select-currency"
                          class="block w-full border-transparent rounded-r-md focus:ring-purple-600 focus:border-purple-600 dark:text-neutral-500 dark:bg-neutral-800">
                    <option :value="MAX_SIZE_UNIT.BYTE">Bytes</option>
                    <option :value="MAX_SIZE_UNIT.KILOBYTE">kB</option>
                    <option :value="MAX_SIZE_UNIT.MEGABYTE">MB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
            <label for="input-lossless">{{ $t('compressor.lossless_compression') }}</label>
            <div class="hs-tooltip inline-block">
              <CircleHelp class="size-4 cursor-help"/>
              <span
                  class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-neutral-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                  role="tooltip">
                  {{ $t('compressor.lossless_help') }}
                </span>
            </div>
          </div>
          <input :disabled="compressorStore.compressionMode === COMPRESSION_MODE.SIZE"
                 type="checkbox"
                 id="input-lossless"
                 v-model="compressorStore.lossless"
                 class="relative w-11 h-6 p-px bg-neutral-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-purple-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-purple-600 checked:border-purple-600 focus:checked:border-purple-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-purple-500 dark:checked:border-purple-500 dark:focus:ring-offset-neutral-600 before:inline-block before:size-5 before:bg-white checked:before:bg-purple-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-purple-200">
        </div>
        <div class="flex items-center justify-between">
          <label for="input-keep-metadata" class="text-sm text-neutral-500 dark:text-neutral-400">{{ $t('compressor.keep_metadata') }}</label>
          <input type="checkbox" id="input-keep-metadata" v-model="compressorStore.keepMetadata"
                 class="relative w-11 h-6 p-px bg-neutral-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-purple-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-purple-600 checked:border-purple-600 focus:checked:border-purple-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-purple-500 dark:checked:border-purple-500 dark:focus:ring-offset-neutral-600 before:inline-block before:size-5 before:bg-white checked:before:bg-purple-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-purple-200">
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/2">
      <span class="font-medium mb-3">{{ $t('compressor.restriction', 2) }}</span>
      <ul class="marker:text-purple-600 list-disc ps-5 space-y-1 text-sm">
        <li>
          {{ $t('compressor.file_types') }}
        </li>
        <li>
          {{ $t('compressor.max_files') }}
        </li>
        <li>
          {{ $t('compressor.max_file_size') }}
        </li>
        <li>
          {{ $t('compressor.auto_delete') }}
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>