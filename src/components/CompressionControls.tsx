'use client';

import { useCompress } from '@/lib/useCompress';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { COMPRESSION_MODE } from '@/types/utils';
import { Play, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export default function CompressionControls() {
  const { t } = useTranslation('compressor');
  const { files, quality, keepMetadata, lossless, compressionMode, maxSize, setLossless, maxSizeUnit, setMaxSizeUnit, setQuality, setKeepMetadata, setCompressionMode, setMaxSize, _hasHydrated } = useCompressorStore((store) => store);

  const { isInitialized, compressFiles } = useCompress();

  if (!_hasHydrated)
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>

        <CardContent>
          <Skeleton className="aspect-video w-full" />
        </CardContent>
      </Card>
    );

  return (
    <Card className="bg-muted/30 flex w-full flex-col shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Settings className="size-5" /> {t('settings', { ns: 'compressor' })}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-4 pb-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <Tabs
                className="w-full pr-2"
                value={compressionMode === COMPRESSION_MODE.QUALITY ? 'quality' : 'size'}
                onValueChange={(value) => {
                  setCompressionMode(value === 'quality' ? COMPRESSION_MODE.QUALITY : COMPRESSION_MODE.SIZE);
                }}
              >
                <TabsList className="grid grid-cols-2 self-end">
                  <TabsTrigger value="quality">{t('quality')}</TabsTrigger>
                  <TabsTrigger value="size">{t('size')}</TabsTrigger>
                </TabsList>
                <div className="relative w-full">
                  <TabsContent
                    forceMount
                    className="space-y-4 pt-4 data-[state=inactive]:pointer-events-none data-[state=inactive]:invisible data-[state=inactive]:absolute data-[state=inactive]:top-0 data-[state=inactive]:left-0 data-[state=inactive]:w-full data-[state=inactive]:opacity-0"
                    value="quality"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label className={cn(lossless ? 'text-foreground/50' : '')}>{t('quality')}</Label>
                        <span className={cn('text-sm font-medium', lossless ? 'text-foreground/50' : '')}>{quality}</span>
                      </div>
                      <Slider className="w-full" disabled={lossless} max={100} min={1} step={1} value={[quality]} onValueChange={(value) => setQuality(value[0])} />

                      <div className="flex items-center justify-between space-x-2 pt-2">
                        <Label htmlFor="lossless">{t('lossless_compression')}</Label>
                        <Switch checked={lossless} id="lossless" onCheckedChange={setLossless} />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    forceMount
                    className="space-y-4 pt-4 data-[state=inactive]:pointer-events-none data-[state=inactive]:invisible data-[state=inactive]:absolute data-[state=inactive]:top-0 data-[state=inactive]:left-0 data-[state=inactive]:w-full data-[state=inactive]:opacity-0"
                    value="size"
                  >
                    <div className="space-y-2">
                      <Label className="text-left">{t('max_size')}</Label>
                      <div className="flex w-full items-center space-x-2">
                        <Input className="flex-1" type="number" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} />
                        <Select defaultValue={maxSizeUnit.toString()} onValueChange={(val) => setMaxSizeUnit(Number(val))}>
                          <SelectTrigger className="w-25">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Bytes</SelectItem>
                            <SelectItem value="1000">Kb</SelectItem>
                            <SelectItem value="1000000">Mb</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </div>
                <div className="mt-4 w-full border-t pt-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="keepMetadata">{t('keep_metadata')}</Label>
                    <Switch checked={keepMetadata} id="keepMetadata" onCheckedChange={setKeepMetadata} />
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4">
        <Button
          className="hidden w-full lg:flex"
          disabled={!isInitialized || files?.length === 0 || files === null}
          variant="default"
          onClick={() => {
            if (files === null) {
              return;
            }
            compressFiles(files);
          }}
        >
          <Play></Play>
          {t('compress', { ns: 'compressor' })}
        </Button>
      </CardFooter>
    </Card>
  );
}
