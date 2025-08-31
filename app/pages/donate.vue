<script setup lang="ts">
import { Heart } from 'lucide-vue-next';
</script>

<template>
  <div class="h-full container max-w-[1200px] mx-auto flex flex-col gap-6 py-8 dark:text-gray-100 text-gray-800 px-2 sm:px-4 justify-between">
    <div class="flex flex-col items-center gap-4">
      <img class="rounded-full w-20 h-20" src="https://avatars.githubusercontent.com/u/12133996?v=4" alt="avatar" />
      <span class="text-lg w-full sm:w-1/2 text-center font-medium">I'm Matteo, a developer from Italy.</span>
      <p class="w-full sm:w-2/3 text-center">
        I'm the creator and maintainer of the <span class="font-medium italic">Caesium Image Compressor</span> project, started more than 10 years ago.<br />If you choose to sponsor, all the funds will be used to further develop the
        project, mainly covering the costs of hardware and to maintain the <a class="hover:text-purple-500 underline underline-offset-2" href="//caesium.app">online web service</a>.
      </p>
      <h1 class="text-2xl mt-12">Select your preferred method</h1>

      <div class="flex flex-col sm:flex-row justify-center gap-10">
        <a
          href="https://github.com/sponsors/Lymphatus"
          target="_blank"
          class="items-center bg-white dark:bg-gray-800 shadow-md flex-1 flex flex-col justify-between rounded-md p-6 text-center gap-2 border-2 dark:border-gray-700 border-gray-100 hover:border-purple-600 dark:hover:border-purple-500"
        >
          <svg class="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" data-v-inspector="components/PageFooter.vue:17:11">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              data-v-inspector="components/PageFooter.vue:18:13"
            />
          </svg>
          <div class="flex flex-col gap-4 items-center">
            <p class="font-semibold text-xl mt-4">Github Sponsor</p>
            <button
              type="button"
              class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-gray-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none justify-center"
            >
              <Heart class="size-5" />
              Donate
            </button>
          </div>
        </a>

        <a
          href="https://www.paypal.com/donate/?hosted_button_id=W74TDJHTBKSAY"
          target="_blank"
          class="items-center bg-white dark:bg-gray-800 shadow-md flex-1 flex flex-col justify-between rounded-md p-6 text-center gap-2 border-2 dark:border-gray-700 border-gray-100 hover:border-purple-600 dark:hover:border-purple-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-10" viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 00-20.47 17.46l-21.84 137.84-6.18 39.07a10.86 10.86 0 009.07 12.42 10.72 10.72 0 001.7.13h75.65a18.18 18.18 0 0018-15.27l.74-3.83 14.24-90 .91-4.94a18.16 18.16 0 0118-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32 7-35.8 3.38-65.69-15.16-86.72a72.27 72.27 0 00-20.73-15.82z"
            />
            <path
              d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 00-20.54 17.48l-60.55 382a12.43 12.43 0 0010.39 14.22 12.58 12.58 0 001.94.15h89.76l22.54-142.29-.7 4.46a20.67 20.67 0 0120.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8.57-2.9 1.05-5.72 1.49-8.48 5.7-36.22-.05-60.87-19.72-83.19z"
            />
          </svg>
          <div class="flex flex-col gap-4 items-center">
            <p class="font-semibold text-xl mt-4">Paypal</p>
            <button
              type="button"
              class="transition py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-500 text-gray-100 hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none justify-center"
            >
              <Heart class="size-5" />
              Donate
            </button>
          </div>
        </a>
      </div>
      <p>
        Want another method?
        <a class="hover:text-purple-600 dark:hover:text-purple-500 underline underline-offset-2" href="//saerasoft.com/caesium#contacts" target="_blank">Contact me!</a>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
