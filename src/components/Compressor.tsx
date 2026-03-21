'use client';

import CompressionControls from '@/components/CompressionControls';
import DropArea from '@/components/DropArea';
import FileList from '@/components/FileList';
import ToastHandler from '@/components/ToastHandler';
import { useCompress } from '@/lib/useCompress';
import { cn } from '@/lib/utils';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { Play, ShieldCheck } from 'lucide-react';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardTitle } from './ui/card';

export default function Compressor() {
  const { files, downloadAll } = useCompressorStore((store) => store);
  const hasFiles = files != null && files?.length > 0;
  const { t } = useTranslation(['common', 'compressor']);
  const { isInitialized, compressFiles, compressionReport } = useCompress();

  useEffect(() => {
    if (compressionReport) {
      toast.success(t('saved_bytes', { size: prettyBytes(compressionReport.totalSavedSize), percentage: Math.round(compressionReport.totalSavedPercentage), ns: 'compressor' }), {
        position: 'top-center',
        duration: 5000,
      });

      //downloadAll();
    }
  }, [compressionReport, t, downloadAll]);

  return (
    <>
      <ToastHandler />

      <div className="flex h-full flex-col px-4">
        <div className="shrink-0 py-8">
          <h1 className="text-primary text-3xl font-semibold md:text-4xl">CAESIUM</h1>
          <h2 className="text-2xl font-semibold md:text-3xl">Image Compressor</h2>
        </div>

        <div className="flex h-full w-full flex-wrap gap-4 lg:flex-nowrap">
          <div className="flex w-full flex-col lg:w-2/3">
            <div className={cn('transition-all duration-300', hasFiles ? 'min-h-60 flex-none' : 'h-full min-h-60 flex-1')}>
              <DropArea className={hasFiles ? 'min-h-40 py-4' : ''} />
            </div>

            <div className={cn('flex w-full flex-col justify-between pb-4 md:pb-0', hasFiles ? 'mt-4 overflow-y-auto opacity-100' : 'h-0 w-0 flex-none overflow-hidden opacity-0')}>{hasFiles && <FileList />}</div>
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

          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-1/3">
            <CompressionControls />
          </div>
        </div>
      </div>
    </>
  );
}
