'use client';

import { useCompressorStore } from '@/providers/compressor-store-provider';
import DropArea from '@/components/DropArea';
import { useTranslation } from 'react-i18next';
import FileList from '@/components/FileList';
import CompressionControls from '@/components/CompressionControls';
import ToastHandler from '@/components/ToastHandler';
import { cn } from '@/lib/utils';
import { useCompress } from '@/lib/useCompress';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

export default function Compressor() {
  const { files } = useCompressorStore((store) => store);
  const hasFiles = files != null && files?.length > 0;
  const { t } = useTranslation(['common', 'compressor']);
  const { isInitialized, compressFiles } = useCompress();
  return (
    <>
      <ToastHandler />

      <div className="flex h-full flex-col px-4">
        {/* <h1 className="shrink-0 py-8 text-2xl font-semibold md:text-3xl">{t('app_name')}</h1> */}

        <div className="flex h-full w-full flex-wrap gap-4 lg:flex-nowrap">
          <div className="flex w-full flex-col gap-2 lg:w-2/3">
            <div className={cn('transition-all duration-300', hasFiles ? 'min-h-60 flex-none' : 'h-full min-h-60 flex-1')}>
              <DropArea className={hasFiles ? 'min-h-40 py-4' : ''} />
            </div>

            <div className={cn('flex w-full flex-col justify-between', hasFiles ? 'mt-4 overflow-y-auto opacity-100' : 'h-0 w-0 flex-none overflow-hidden opacity-0')}>{hasFiles && <FileList />}</div>
            {files !== null && files.length > 0 && (
              <Button
                className="w-full lg:hidden"
                disabled={!isInitialized}
                variant="default"
                onClick={() => {
                  compressFiles(files);
                }}
              >
                <Play></Play>
                {t('compress', { ns: 'compressor' })}
              </Button>
            )}
          </div>

          <div className="w-full shrink-0 lg:w-1/3">
            <CompressionControls />
          </div>
        </div>
      </div>
    </>
  );
}
