'use client';

import { Play, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { useCompress } from '@/lib/useCompress';

export default function ListControls() {
  const { t } = useTranslation('compressor');
  const { files, clearFiles, triggerFileSelect } = useCompressorStore((store) => store);
  const { isInitialized, compressFiles } = useCompress();

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Button className="w-full md:w-fit" size="sm" variant="destructive" onClick={clearFiles}>
        <Trash2 className="mr-2 h-4 w-4" />
        {t('clear_list')}
      </Button>

      <Button
        className="w-full md:w-fit"
        disabled={!isInitialized}
        size="lg"
        onClick={() => {
          if (files !== null) {
            compressFiles(files);
          } else {
          }
        }}
      >
        <Play className="mr-2 h-4 w-4" />
        {t('compress')}
      </Button>
      <Button size="sm" variant="ghost" onClick={triggerFileSelect}>
        <Plus className="mr-2 h-4 w-4" />
        {t('add_dots')}
      </Button>
    </div>
  );
}
