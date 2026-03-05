'use client';

import { useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { CImage } from '@/types/cimage';
import { useTranslation } from 'react-i18next';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface ImageComparisonModalProps {
  file: CImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImageComparisonModal({ file, open, onOpenChange }: ImageComparisonModalProps) {
  const { t } = useTranslation('compressor');
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleLayoutChange = useCallback((layout: Record<string, number>) => {
    const values = Object.values(layout);
    if (values.length > 0) {
      setSliderPosition(values[0]);
    }
  }, []);

  if (!file || !file.outputImageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="flex h-screen w-screen max-w-screen flex-col gap-0 overflow-hidden rounded-none p-0 md:h-[95vh] md:w-[95vw] md:min-w-[95vw] md:rounded-xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="truncate">{file.file.name}</DialogTitle>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={`${t('compressed')} - ${file.file.name}`} className="absolute inset-0 h-full w-full object-contain" draggable={false} src={file.outputImageUrl} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={`${t('original')} - ${file.file.name}`} className="h-full w-full object-contain" draggable={false} src={file.url} />
          </div>

          <ResizablePanelGroup className="absolute inset-0 z-10" orientation="horizontal" onLayoutChange={handleLayoutChange}>
            <ResizablePanel defaultSize={50} minSize={5} />
            <ResizableHandle withHandle className="w-0.5 bg-white/80 shadow-[0_0_6px_rgba(0,0,0,0.5)] after:w-3! [&>div]:h-6 [&>div]:w-5 [&>div]:rounded-md [&>div]:bg-white [&>div]:shadow-sm" />
            <ResizablePanel defaultSize={50} minSize={5} />
          </ResizablePanelGroup>

          <div className="pointer-events-none absolute top-4 left-4 z-20">
            <span className="bg-background/60 text-foreground rounded-md px-2 py-1 text-sm font-medium">{t('original')}</span>
          </div>
          <div className="pointer-events-none absolute top-4 right-4 z-20">
            <span className="bg-background/60 text-foreground rounded-md px-2 py-1 text-sm font-medium">{t('compressed')}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
