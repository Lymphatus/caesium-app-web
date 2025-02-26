import { defineStore } from 'pinia';
import { computed, reactive, type Ref, ref } from 'vue';
import { APP_THEME, type CImage, COMPRESSION_MODE, COMPRESSION_STATUS, FILE_STATUS, type GeneralMessage, MAX_SIZE_UNIT, MESSAGE_LEVEL } from '@/utils/utils';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import CompressionWorker from 'assets/workers/compression-worker?worker';
import JSZip from 'jszip';
import moment from 'moment';
import FileSaver from 'file-saver';
import prettyBytes from 'pretty-bytes';
import { TaskPool } from '~/utils/task-pool';

const NAMESPACE = '31e0ba23-9ce1-4c1f-a879-802230c27d63';
export const useCompressorStore = defineStore(
  'compressor',
  () => {
    const FILES_LIMIT: number = useRuntimeConfig().public.compressorMaxFiles as number;
    const MAX_FILE_SIZE: number = useRuntimeConfig().public.compressorMaxFileSize as number;
    let maxConcurrency = 1;
    let pool: TaskPool | null = null;
    if (import.meta.client) {
      maxConcurrency = window.navigator.hardwareConcurrency - 1 || 1;
      pool = new TaskPool(() => new CompressionWorker(), maxConcurrency, onWorkerSuccess, onWorkerError);
    }

    const quality: Ref<number> = ref(80);
    const keepMetadata: Ref<boolean> = ref(true);
    const lossless: Ref<boolean> = ref(false);
    const compressionMode: Ref<COMPRESSION_MODE> = ref(COMPRESSION_MODE.QUALITY);
    const maxSizeValue: Ref<number> = ref(500);
    const maxSizeUnit: Ref<MAX_SIZE_UNIT> = ref(MAX_SIZE_UNIT.KILOBYTE);
    const groupId: Ref<string> = ref(uuidv4());
    const sessionId = uuidv4();
    const appTheme: Ref<APP_THEME> = ref(APP_THEME.SYSTEM);

    const files: CImage[] = reactive([]);
    const generalMessage: Ref<GeneralMessage> = ref({
      level: MESSAGE_LEVEL.INFO,
      message: '',
      visible: false,
      timeout: 0,
    });

    const maxSize = computed(() => {
      return maxSizeValue.value * maxSizeUnit.value;
    });

    const filesCompleted = computed(() => {
      const initialValue = 0;
      return files.reduce((carry, f) => {
        return carry + (f.status === FILE_STATUS.FINISHED ? 1 : 0);
      }, initialValue);
    });

    const filesFailed = computed(() => {
      const initialValue = 0;
      return files.reduce((carry, f) => {
        return carry + (f.status === FILE_STATUS.ERROR ? 1 : 0);
      }, initialValue);
    });

    const compressionStatus = computed(() => {
      const filesWaiting = files.every((f) => f.status === FILE_STATUS.WAITING);
      if (filesWaiting) {
        return COMPRESSION_STATUS.WAITING;
      }
      if (filesFailed.value === files.length) {
        return COMPRESSION_STATUS.FINISHED_ALL_ERRORS;
      }
      if (filesFailed.value + filesCompleted.value === files.length) {
        return COMPRESSION_STATUS.FINISHED;
      }
      return COMPRESSION_STATUS.COMPRESSING;
    });

    watch(compressionStatus, async (newStatus) => {
      if (newStatus === COMPRESSION_STATUS.FINISHED) {
        let totalOriginalSize = 0;
        let totalCompressedSize = 0;

        files.forEach((f) => {
          totalOriginalSize += f.file.size;
          totalCompressedSize += f.newSize === 0 ? f.file.size : f.newSize;
        });
        const isBigger = totalCompressedSize > totalOriginalSize;
        const level = isBigger ? MESSAGE_LEVEL.WARNING : MESSAGE_LEVEL.SUCCESS;
        generalMessage.value = {
          level,
          message: useNuxtApp().$i18n.t('compressor.saved_bytes', {
            size: prettyBytes(totalOriginalSize - totalCompressedSize),
            percentage: (isBigger ? '+' : '') + (Math.round((totalCompressedSize / totalOriginalSize) * 100) - 100),
          }),
          visible: true,
          timeout: 3000,
        };
      }
    });

    watch(appTheme, (newTheme) => {
      const forceDark = newTheme === APP_THEME.DARK || (newTheme === APP_THEME.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('cc--darkmode', forceDark);
      document.documentElement.classList.toggle('dark', forceDark);
      localStorage.setItem('appTheme', newTheme);
    });

    function addFiles() {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = 'image/jpeg,image/png,image/webp';
      input.click();

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (!target.files) {
          return;
        }
        onFilesAdded(target.files);
      };
      input.remove();
    }

    function onFilesAdded(files: FileList | null | undefined) {
      if (!files || files.length === 0) {
        return;
      }
      importFiles(files);
    }

    function importFiles(fileList: FileList) {
      resetGeneralMessage();
      const supportedFiles = Array.from(fileList).filter((f) => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type));
      if (files.length + supportedFiles.length > FILES_LIMIT) {
        generalMessage.value = {
          level: MESSAGE_LEVEL.ERROR,
          message: useNuxtApp().$i18n.t('errors.max_files_reached', { max_files: FILES_LIMIT }),
          visible: true,
          timeout: 3000,
        };
        return;
      }

      const validFiles = supportedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
      if (validFiles.length !== supportedFiles.length) {
        generalMessage.value = {
          level: MESSAGE_LEVEL.ERROR,
          message: useNuxtApp().$i18n.t('errors.files_over_size'),
          visible: true,
          timeout: 3000,
        };
      }

      const cImages = validFiles.map((file) => {
        const cImage: CImage = {
          file: file,
          url: URL.createObjectURL(file),
          status: FILE_STATUS.WAITING,
          id: uuidv4(),
          newSize: 0,
          errorMessage: null,
          key: uuidv5(`${file.name}|${file.lastModified}|${file.size}|${file.type}`, NAMESPACE),
          outputImageArray: null,
          outputImageUrl: null,
        };
        return cImage;
      });

      cImages.forEach((cImage) => {
        const alreadyPresent = files.findIndex((item) => item.key === cImage.key) >= 0;
        if (alreadyPresent) {
          return;
        }
        files.push(cImage);
      });
    }

    function removeFile(key: string) {
      const index = files.findIndex((item) => item.key === key);
      if (index >= 0) {
        files.splice(index, 1);
      }
    }

    function reset() {
      files.splice(0, files.length);
      groupId.value = uuidv4();
      resetGeneralMessage();
    }

    function recompress() {
      for (const file of files.values()) {
        file.status = FILE_STATUS.WAITING;
        file.newSize = 0;
        file.outputImageArray = null;
        file.id = uuidv4();
      }
      startCompress();
    }

    function startCompress() {
      resetGeneralMessage();
      resetErrors();
      if (!pool) {
        return;
      }

      const tasks = [];
      for (const cImage of files.values()) {
        cImage.status = FILE_STATUS.COMPRESSING;
        tasks.push([cImage.file, lossless.value ? 0 : quality.value, keepMetadata.value, maxSize.value, compressionMode.value, cImage.id]);
      }
      Promise.all(tasks.map((task) => pool.runTask(task)))
        .then((results) => {
          results.forEach((r) => {
            const result = r as CompressionResult;
            if (!result.success) {
              onWorkerError(result);
            }
          });
        })
        .catch((e) => {
          const compressionResult = {
            success: false,
            size: 0,
            data: null,
            errorCode: 100,
            errorString: e.message,
            uuid: '',
          } as CompressionResult;
          onWorkerError(compressionResult);
        });
      //            .finally(() => pool.terminate());
    }

    function onWorkerSuccess(d: unknown) {
      const data = d as CompressionResult;
      const newSize = data.size;
      const dataArray = data.data;
      const cImage = files.find((i) => i.id === data.uuid);
      if (!cImage || !dataArray) {
        return;
      }
      cImage.status = FILE_STATUS.FINISHED;
      cImage.newSize = newSize;
      cImage.outputImageArray = dataArray;
      cImage.outputImageUrl = URL.createObjectURL(new Blob([cImage.outputImageArray]));

      if (useRuntimeConfig().public.sendUsageReport) {
        storeCompressionResult(cImage);
      }
    }

    function onWorkerError(d: unknown) {
      const data = d as CompressionResult;
      const errorCode = data.errorCode;
      const errorString = data.errorString;
      const compressionOptions = {
        quality: lossless.value ? 0 : quality.value,
        metadata: keepMetadata.value,
        maxSize: maxSize.value,
        mode: compressionMode.value,
      };
      const cImage = files.find((i) => i.id === data.uuid);
      if (!cImage) {
        return;
      }
      setAsError(cImage, `Worker responded false. Code: ${errorCode}. JS error: ${errorString}. File: ${cImage.file.name}. Size: ${cImage.file.size}. Mime: ${cImage.file.type}. Options: ${JSON.stringify(compressionOptions)}`);
    }

    function setAsError(cImage: CImage, e: MessageEvent<never> | string | unknown) {
      cImage.status = FILE_STATUS.ERROR;
      cImage.errorMessage = useNuxtApp().$i18n.t('errors.generic_error');

      fetch(useRuntimeConfig().public.apiHost + '/api/v1/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: 'error',
          message: e?.toString().slice(0, 2048),
        }),
      }).then();
    }

    function storeCompressionResult(cImage: CImage) {
      const data = {
        session_id: sessionId,
        group_id: groupId.value,
        uuid: cImage.id,
        original_size: cImage.file.size,
        compressed_size: cImage.newSize,
        mime_type: cImage.file.type,
        quality: compressionMode.value === COMPRESSION_MODE.QUALITY && !lossless.value ? quality.value : null,
        keep_metadata: keepMetadata.value,
        lossless: lossless.value,
        max_output_size: compressionMode.value === COMPRESSION_MODE.SIZE ? maxSize.value : null,
        compression_mode: compressionMode.value === 0 ? 'quality' : 'size',
      };

      fetch(useRuntimeConfig().public.apiHost + '/api/v1/compressor/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then();
    }

    function downloadAll() {
      const finishedFiles = files.filter((f) => f.status === FILE_STATUS.FINISHED);
      const zip = new JSZip();
      finishedFiles.forEach((cImage) => {
        if (cImage.outputImageArray) {
          zip.file(cImage.file.name, cImage.outputImageArray);
        }
      });

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        const timestamp = moment().format('YYYYMMDD_HHmmss');
        FileSaver.saveAs(content, `caesium_${timestamp}.zip`);
      });
    }

    function resetGeneralMessage() {
      generalMessage.value = {
        level: MESSAGE_LEVEL.INFO,
        message: '',
        visible: false,
        timeout: 0,
      };
    }

    function resetErrors() {
      files.forEach((f) => (f.errorMessage = null));
    }

    return {
      quality,
      keepMetadata,
      lossless,
      maxSizeValue,
      maxSizeUnit,
      compressionMode,
      generalMessage,
      compressionStatus,
      filesCompleted,
      filesFailed,
      addFiles,
      onFilesAdded,
      removeFile,
      reset,
      startCompress,
      downloadAll,
      recompress,
      files,
      appTheme,
      FILES_LIMIT,
      MAX_FILE_SIZE,
    };
  },
  {
    persist: {
      pick: ['compressionMode', 'keepMetadata', 'lossless', 'maxSizeValue', 'maxSizeUnit', 'quality', 'appTheme'],
    },
  },
);
