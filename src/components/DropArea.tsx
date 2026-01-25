'use client';

import Image from 'next/image';
import { Button, Separator } from '@heroui/react';
import { FolderOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCompressorStore } from '@/providers/compressor-store-provider';

export default function DropArea() {
  const { t } = useTranslation('compressor');
  const { addFiles } = useCompressorStore((state) => state);
  const triggerFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/jpeg,image/png,image/webp,image/gif';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        console.log(files);
        addFiles(files);
      }
    };
    input.click();
  };

  return (
    <div className="bg-background-secondary h-full w-full rounded-xl border-2 border-dashed">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Image alt="center logo" className="opacity-30" height={144} src="/images/logo.png" width={144}></Image>
        <h2 className="text-2xl">{t('drop_here')}</h2>
        <div className="flex w-full max-w-full items-center justify-center gap-2">
          <Separator className="w-1/3"></Separator>
          <span className="text-sm uppercase">{t('or')}</span>
          <Separator className="w-1/3"></Separator>
        </div>
        <Button onPress={() => triggerFileSelect()}>
          <FolderOpen />
          {t('browse_dots')}
        </Button>
      </div>
    </div>
  );
}
