import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { CImage, FILE_STATUS } from '@/types/cimage';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { COMPRESSION_MODE, FILES_LIMIT, GeneralMessage, MAX_FILE_SIZE, MESSAGE_LEVEL } from '@/types/utils';
import { CompressionResult } from '@/lib/useCompressionWorker';

export type CompressorState = {
  files: CImage[] | null;
  quality: number;
  keepMetadata: boolean;
  lossless: boolean;
  compressionMode: COMPRESSION_MODE;
  maxSize: number;
  maxSizeUnit: number;
  generalMessage: GeneralMessage | null;
};

export type CompressorActions = {
  addFiles: (files: FileList) => void;
  clearFiles: () => void;
  handleCompressionResult: (result: CompressionResult) => void;
  setQuality: (quality: number) => void;
  setLossless: (lossless: boolean) => void;
  setKeepMetadata: (keepMetadata: boolean) => void;
  setCompressionMode: (mode: COMPRESSION_MODE) => void;
  setMaxSize: (size: number) => void;
  setMaxSizeUnit: (unit: number) => void;
  setGeneralMessage: (message: GeneralMessage | null) => void;
  removeFile: (id: string) => void;
  triggerFileSelect: () => void;
  setFileStatus: (id: string, status: FILE_STATUS) => void;
};

export type CompressorStore = CompressorState & CompressorActions;

export const defaultInitState: CompressorState = {
  files: null,
  quality: 80,
  lossless: false,
  keepMetadata: false,
  compressionMode: COMPRESSION_MODE.QUALITY,
  maxSize: 1,
  maxSizeUnit: 1000000,
  generalMessage: null,
};

const NAMESPACE = '31e0ba23-9ce1-4c1f-a879-802230c27d63';

export const createCompressorStore = (initState: CompressorState = defaultInitState) => {
  return createStore<CompressorStore>()(
    devtools((set, get) => ({
      ...initState,
      addFiles: (fileList: FileList) => {
        set({ generalMessage: null });
        const supportedFiles = Array.from(fileList).filter((f) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.type));
        const files = get().files || [];
        if (files.length + supportedFiles.length > FILES_LIMIT) {
          set({
            generalMessage: {
              level: MESSAGE_LEVEL.ERROR,
              translationKey: 'max_files_reached',
              translationNs: 'error',
              translationParams: { max_files: FILES_LIMIT },
              timeout: 5000,
            },
          });
          return;
        }

        const validFiles = supportedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
        if (validFiles.length !== supportedFiles.length) {
          set({
            generalMessage: {
              level: MESSAGE_LEVEL.ERROR,
              translationKey: 'files_over_size',
              translationNs: 'error',
              timeout: 5000,
            },
          });
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
      clearFiles: () => {
        const files = get().files;
        if (files) {
          files.forEach((f) => {
            URL.revokeObjectURL(f.url);
            if (f.outputImageUrl) {
              URL.revokeObjectURL(f.outputImageUrl);
            }
          });
        }
        set({ files: null });
      },
      handleCompressionResult: (result: CompressionResult) => {
        const files = get().files;
        if (!files) return;

        const fileIndex = files.findIndex((f) => f.id === result.uuid);
        if (fileIndex === -1) return;

        const file = files[fileIndex];

        if (result.success && result.data) {
          const blob = new Blob([result.data], { type: file.file.type });
          const outputUrl = URL.createObjectURL(blob);

          const updatedFile = {
            ...file,
            status: FILE_STATUS.FINISHED,
            newSize: result.size,
            outputImageArray: result.data,
            outputImageUrl: outputUrl,
            errorMessage: null,
          };

          const updatedFiles = [...files];
          updatedFiles[fileIndex] = updatedFile;
          set({ files: updatedFiles });
        } else {
          // Handle error
          const updatedFile = {
            ...file,
            status: FILE_STATUS.ERROR,
            errorMessage: result.errorString || `Error code: ${result.errorCode}`,
          };

          const updatedFiles = [...files];
          updatedFiles[fileIndex] = updatedFile;
          set({ files: updatedFiles });
        }
      },
      setQuality: (quality: number) => set({ quality }),
      setKeepMetadata: (keepMetadata: boolean) => set({ keepMetadata }),
      setCompressionMode: (mode: COMPRESSION_MODE) => set({ compressionMode: mode }),
      setMaxSize: (size: number) => set({ maxSize: size }),
      setMaxSizeUnit: (unit: number) => set({ maxSizeUnit: unit }),
      setGeneralMessage: (message: GeneralMessage | null) => set({ generalMessage: message }),
      setLossless: (lossless: boolean) => set({ lossless }),
      removeFile: (id: string) => {
        const files = get().files;
        if (!files) return;

        const fileIndex = files.findIndex((f) => f.id === id);
        if (fileIndex === -1) return;

        const file = files[fileIndex];
        URL.revokeObjectURL(file.url);
        if (file.outputImageUrl) {
          URL.revokeObjectURL(file.outputImageUrl);
        }

        const updatedFiles = [...files];
        updatedFiles.splice(fileIndex, 1);
        set({ files: updatedFiles });
      },
      triggerFileSelect: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/jpeg,image/png,image/webp,image/gif';
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files;
          if (files && files.length > 0) {
            get().addFiles(files);
          }
        };
        input.click();
      },
      setFileStatus: (id: string, status: FILE_STATUS) => {
        const files = get().files;
        if (!files) return;

        const fileIndex = files.findIndex((f) => f.id === id);
        if (fileIndex === -1) return;

        const file = files[fileIndex];
        const updatedFile = { ...file, status };
        const updatedFiles = [...files];
        updatedFiles[fileIndex] = updatedFile;
        set({ files: updatedFiles });
      },
    })),
  );
};
