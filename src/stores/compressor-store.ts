import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';

export type CompressorState = {
  files: FileList | null;
};

export type CompressorActions = {
  addFiles: (files: FileList) => void;
};

export type CompressorStore = CompressorState & CompressorActions;

export const defaultInitState: CompressorState = {
  files: null,
};

export const createCompressorStore = (initState: CompressorState = defaultInitState) => {
  return createStore<CompressorStore>()(
    devtools((set) => ({
      ...initState,
      addFiles: (files: FileList) => set({ files }),
    })),
  );
};
