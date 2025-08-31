<script setup lang="ts">
import DropArea from '~/components/DropArea.vue';
import CompressionOptions from '~/components/CompressionOptions.vue';
import FileList from '~/components/FileList.vue';
import { useCompressorStore } from '~/stores/compressor';

const compressorStore = useCompressorStore();
</script>

<template>
  <div class="h-full container max-w-[1200px] mx-auto flex flex-col gap-6 py-8 dark:text-gray-100 text-gray-800 px-2 sm:px-4 justify-between">
    <AlertMessage :general-message="compressorStore.generalMessage" />
    <DropArea v-if="compressorStore.files.length === 0" />
    <FileList v-else />
    <CompressionOptions />
  </div>
</template>

<style scoped></style>
