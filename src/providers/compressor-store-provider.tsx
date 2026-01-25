'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import { useStore } from 'zustand';

import { CompressorStore, createCompressorStore } from '@/stores/compressor-store';

export type CompressorStoreApi = ReturnType<typeof createCompressorStore>;

export const CompressorStoreContext = createContext<CompressorStoreApi | undefined>(undefined);

export interface CompressorStoreProviderProps {
  children: ReactNode;
}

export const CompressorStoreProvider = ({ children }: CompressorStoreProviderProps) => {
  const [store] = useState(() => createCompressorStore());
  return <CompressorStoreContext.Provider value={store}>{children}</CompressorStoreContext.Provider>;
};

export const useCompressorStore = <T,>(selector: (store: CompressorStore) => T): T => {
  const compressorStoreContext = useContext(CompressorStoreContext);
  if (!compressorStoreContext) {
    throw new Error(`useCompressorStore must be used within CompressorStoreProvider`);
  }

  return useStore(compressorStoreContext, selector);
};
