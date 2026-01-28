'use client';

import { useCompressorStore } from '@/providers/compressor-store-provider';
import DropArea from '@/components/DropArea';
import i18n from '@/lib/i18n/client';
import { I18nextProvider } from 'react-i18next';
import FileList from '@/components/FileList';
import CompressionControls from '@/components/CompressionControls';

export default function Compressor() {
  const { files } = useCompressorStore((store) => store);
  const hasFiles = files != null && files?.length > 0;
  return (
    <I18nextProvider i18n={i18n}>
      {(hasFiles && (
        <div>
          <FileList />
          <CompressionControls />
        </div>
      )) || <DropArea />}
    </I18nextProvider>
  );
}
