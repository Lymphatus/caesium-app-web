'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus, PlusCircle, PlusSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { COMPRESSION_MODE, FILES_LIMIT, MAX_FILE_SIZE } from '@/types/utils';

export default function DropArea({ className }: { className?: string }) {
  const { triggerFileSelect, addFiles } = useCompressorStore((state) => state);
  const { t } = useTranslation('compressor');

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={cn('flex h-full min-h-60 w-full items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-all duration-500', isDragOver ? 'border-primary bg-primary/10' : 'border-border bg-background', className)}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-4">
        <h2 className="text-xl">
          {t('drop_here')} {t('or').toLocaleLowerCase()}
        </h2>
        <div className="flex w-full max-w-full items-center justify-center gap-2">
          <Button className="pointer-events-auto" size="lg" onClick={triggerFileSelect}>
            <PlusCircle />
            {t('add_dots')}
          </Button>
        </div>
        <span className="text-sm">
          {t('file_types')}. {t('max_file_size', { max_file_size: prettyBytes(MAX_FILE_SIZE) })}.
        </span>
      </div>
    </div>
  );
}
