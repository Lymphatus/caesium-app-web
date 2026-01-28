import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { CImage, FILE_STATUS } from '@/types/cimage';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export type CompressorState = {
  files: CImage[] | null;
};

export type CompressorActions = {
  addFiles: (files: FileList) => void;
};

export type CompressorStore = CompressorState & CompressorActions;

export const defaultInitState: CompressorState = {
  files: null,
};

const FILES_LIMIT: number = 10; // TODO conf
const MAX_FILE_SIZE: number = 10_000_000; // TODO conf
const NAMESPACE = '31e0ba23-9ce1-4c1f-a879-802230c27d63';

export const createCompressorStore = (initState: CompressorState = defaultInitState) => {
  return createStore<CompressorStore>()(
    devtools((set, get) => ({
      ...initState,
      addFiles: (fileList: FileList) => {
        // resetGeneralMessage();
        const supportedFiles = Array.from(fileList).filter((f) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.type));
        const files = get().files || [];
        if (files.length + supportedFiles.length > FILES_LIMIT) {
          //TODO
          // generalMessage.value = {
          //   level: MESSAGE_LEVEL.ERROR,
          //   message: useNuxtApp().$i18n.t('errors.max_files_reached', { max_files: FILES_LIMIT }),
          //   visible: true,
          //   timeout: 3000,
          // };
          // return;
        }

        const validFiles = supportedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
        if (validFiles.length !== supportedFiles.length) {
          //TODO
          // generalMessage.value = {
          //   level: MESSAGE_LEVEL.ERROR,
          //   message: useNuxtApp().$i18n.t('errors.files_over_size'),
          //   visible: true,
          //   timeout: 3000,
          // };
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

        set({ files });
      },
    })),
  );
};
