'use client';

import { useCompressorStore } from '@/providers/compressor-store-provider';
import DropArea from '@/components/DropArea';
import i18n from '@/lib/i18n/client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import FileList from '@/components/FileList';
import CompressionControls from '@/components/CompressionControls';
import ToastHandler from '@/components/ToastHandler';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

export default function Compressor() {
  const { files } = useCompressorStore((store) => store);
  const hasFiles = files != null && files?.length > 0;
  const { t } = useTranslation('common');

  return (
    <I18nextProvider i18n={i18n}>
      <ToastHandler />

      <div className="flex h-full flex-col overflow-hidden px-4 md:px-0">
        <h1 className="shrink-0 py-8 text-3xl font-semibold">{t('app_name')}</h1>

        <div className={cn('w-full transition-all duration-300', hasFiles ? 'h-40 min-h-40 flex-none' : 'min-h-60 flex-1')}>
          <DropArea className={hasFiles ? 'min-h-40 py-4' : ''} />
        </div>

        <div className={cn('flex w-full flex-col justify-between transition-all duration-300', hasFiles ? 'mt-4 overflow-y-auto opacity-100' : 'h-0 flex-none overflow-hidden opacity-0')}>{hasFiles && <FileList />}</div>

        <Separator className="my-4 shrink-0" />
        <div className="shrink-0">
          <CompressionControls />
        </div>
      </div>
    </I18nextProvider>
  );
}
