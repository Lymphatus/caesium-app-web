<script setup lang="ts">
import { type GeneralMessage, MESSAGE_LEVEL } from '@/utils/utils';
import { ref, watchEffect } from 'vue';
import { CircleAlert, CircleCheck, CircleX, Info, X } from 'lucide-vue-next';

const props = defineProps<{
  generalMessage: GeneralMessage;
}>();

const visible = ref(false);
watchEffect(() => (visible.value = props.generalMessage.visible));
const colorClasses = computed(() => {
  if (props.generalMessage?.level === MESSAGE_LEVEL.SUCCESS) {
    return {
      alert: 'bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500',
      dismiss: 'text-teal-500 hover:bg-teal-100 focus:bg-teal-100 dark:text-teal-600 dark:hover:bg-teal-800/50 dark:focus:bg-teal-800/50',
    };
  } else if (props.generalMessage?.level === MESSAGE_LEVEL.ERROR) {
    return {
      alert: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500',
      dismiss: 'text-red-500 hover:bg-red-100 focus:bg-red-100 dark:text-red-600 dark:hover:bg-red-800/50 dark:focus:bg-red-800/50',
    };
  } else if (props.generalMessage?.level === MESSAGE_LEVEL.WARNING) {
    return {
      alert: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500',
      dismiss: 'text-yellow-500 hover:bg-yellow-100 focus:bg-yellow-100 dark:text-yellow-600 dark:hover:bg-yellow-800/50 dark:focus:bg-yellow-800/50',
    };
  }
  return {
    alert: 'bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-800/10 dark:border-sky-900 dark:text-sky-500',
    dismiss: 'text-sky-500 hover:bg-sky-100 focus:bg-sky-100 dark:text-sky-600 dark:hover:bg-sky-800/50 dark:focus:bg-sky-800/50',
  };
});
</script>

<template>
  <div v-if="visible" class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 border text-sm rounded-lg p-4" role="alert" :class="colorClasses.alert" tabindex="-1">
    <div class="flex items-center">
      <div class="shrink-0">
        <Info v-if="generalMessage.level === MESSAGE_LEVEL.INFO" class="size-5" />
        <CircleAlert v-if="generalMessage.level === MESSAGE_LEVEL.WARNING" class="size-5" />
        <CircleX v-if="generalMessage.level === MESSAGE_LEVEL.ERROR" class="size-5" />
        <CircleCheck v-if="generalMessage.level === MESSAGE_LEVEL.SUCCESS" class="size-5" />
      </div>
      <div class="ms-2">
        <h3 id="hs-dismiss-button-label" class="text-sm font-medium">
          {{ props.generalMessage.message }}
        </h3>
      </div>
      <div class="ps-3 ms-auto">
        <div class="-mx-1.5 -my-1.5">
          <button type="button" class="inline-flex bg-teal-50 rounded-lg p-1.5 focus:outline-hidden dark:bg-transparent" @click="visible = false">
            <X class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
