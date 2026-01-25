'use client';

import { CompressorStoreProvider } from '@/providers/compressor-store-provider';
import DropArea from '@/components/DropArea';

export default function DropAreaContainer() {
  return (
    <CompressorStoreProvider>
      <DropArea />
    </CompressorStoreProvider>
  );
}
