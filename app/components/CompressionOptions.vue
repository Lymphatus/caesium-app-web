<script setup lang="ts">
import { useCompressorStore } from '@/stores/compressor';
import { CircleHelp } from 'lucide-vue-next';
import { COMPRESSION_MODE } from '~/utils/utils';
import prettyBytes from 'pretty-bytes';

const { t } = useI18n();

const compressorStore = useCompressorStore();
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700" :class="{ 'opacity-50 pointer-events-none': compressorStore.compressionStatus === COMPRESSION_STATUS.COMPRESSING }">
    <div class="w-full sm:w-1/2 flex flex-col gap-2">
      <div class="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
        <span>{{ t('compressor.mode') }}</span>
        <select
          v-model="compressorStore.compressionMode"
          class="py-2 px-3 pe-9 block border-2 border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
        >
          <option :value="COMPRESSION_MODE.QUALITY">{{ t('compressor.quality') }}</option>
          <option :value="COMPRESSION_MODE.SIZE">{{ t('compressor.size') }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <div v-if="compressorStore.compressionMode === COMPRESSION_MODE.QUALITY">
          <div class="flex items-center justify-between">
            <label for="quality-range-slider">{{ t('compressor.quality') }}</label>
            <span>{{ compressorStore.quality }}</span>
          </div>
          <input
            id="quality-range-slider"
            v-model.number="compressorStore.quality"
            :disabled="compressorStore.lossless"
            type="range"
            min="1"
            max="100"
            class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(168,85,247,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out dark:[&::-webkit-slider-thumb]:dark:bg-gray-800 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-purple-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-full dark:[&::-webkit-slider-runnable-track]:bg-gray-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-200 dark:[&::-moz-range-track]:bg-gray-700 [&::-moz-range-track]:rounded-full dark:[&::-moz-range-progress]:bg-purple-700 [&::-moz-range-progress]:bg-purple-300 [&::-moz-range-progress]:h-2 [&::-moz-range-progress]:rounded-full"
          />
        </div>

        <div v-if="compressorStore.compressionMode === COMPRESSION_MODE.SIZE">
          <div class="space-y-3 mt-0.5">
            <div class="flex items-center justify-between gap-4">
              <label for="hs-inline-leading-pricing-select-label" class="block text-sm">{{ t('compressor.max_size') }}</label>
              <div class="relative flex-1">
                <input
                  id="hs-inline-leading-pricing-select-label"
                  v-model.number="compressorStore.maxSizeValue"
                  type="number"
                  name="inline-add-on"
                  class="py-2 px-3 block w-full border-2 border-gray-200 shadow-xs rounded-lg text-sm focus:z-10 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="100"
                />
                <div class="absolute inset-y-0 end-0 flex items-center pe-0.5">
                  <label for="hs-inline-leading-select-unit" class="sr-only" />
                  <select
                    id="hs-inline-leading-select-unit"
                    v-model.number="compressorStore.maxSizeUnit"
                    name="hs-inline-leading-select-unit"
                    class="block w-full border-2 border-r-1 h-full rounded-r-md dark:bg-gray-800 text-sm dark:border-gray-700 border-gray-200 focus:border-purple-500 focus:ring-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option :value="MAX_SIZE_UNIT.BYTE">Bytes</option>
                    <option :value="MAX_SIZE_UNIT.KILOBYTE">kB</option>
                    <option :value="MAX_SIZE_UNIT.MEGABYTE">MB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="compressorStore.compressionMode === COMPRESSION_MODE.QUALITY" class="flex items-center justify-between">
          <div class="text-sm flex items-center gap-2">
            <div class="text-sm flex items-center gap-1">
              {{ t('compressor.lossless_compression') }}
              <div class="hs-tooltip inline-block">
                <CircleHelp class="size-4 cursor-help" />
                <span
                  class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-xs dark:bg-gray-700"
                  role="tooltip"
                >
                  {{ t('compressor.lossless_help') }}
                </span>
              </div>
            </div>
          </div>
          <label for="input-lossless" class="relative inline-block w-11 h-6 cursor-pointer">
            <input id="input-lossless" v-model="compressorStore.lossless" type="checkbox" class="sr-only peer" />
            <span
              class="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-purple-500 dark:bg-gray-700 dark:peer-checked:bg-purple-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            ></span>
            <span class="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-gray-400 dark:peer-checked:bg-white"></span>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm">{{ t('compressor.keep_metadata') }}</span>
          <label for="input-keep-metadata" class="relative inline-block w-11 h-6 cursor-pointer">
            <input id="input-keep-metadata" v-model="compressorStore.keepMetadata" type="checkbox" class="sr-only peer" />
            <span
              class="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-purple-500 dark:bg-gray-700 dark:peer-checked:bg-purple-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            ></span>
            <span class="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-gray-400 dark:peer-checked:bg-white"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/2">
      <span class="font-medium mb-3">{{ t('compressor.restriction', 2) }}</span>
      <ul class="marker:text-purple-500 list-disc ps-5 space-y-1 text-sm">
        <li>
          {{ t('compressor.file_types') }}
        </li>
        <li>
          {{ t('compressor.max_files', { max_files: compressorStore.FILES_LIMIT }) }}
        </li>
        <li>
          {{ t('compressor.max_file_size', { max_file_size: prettyBytes(compressorStore.MAX_FILE_SIZE) }) }}
        </li>
        <li>
          {{ t('compressor.auto_delete') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
