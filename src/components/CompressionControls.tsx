'use client';

import { useTranslation } from 'react-i18next';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { COMPRESSION_MODE, FILES_LIMIT, MAX_FILE_SIZE } from '@/types/utils';
import { ChevronDown, Play, Plus, Settings, Trash2 } from 'lucide-react';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { FILE_STATUS } from '@/types/cimage';
import { useCompress } from '@/lib/useCompress';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function CompressionControls() {
  const { t } = useTranslation('compressor');
  const { files, quality, keepMetadata, lossless, compressionMode, maxSize, clearFiles, triggerFileSelect, setLossless, maxSizeUnit, setMaxSizeUnit, setQuality, setKeepMetadata, setCompressionMode, setMaxSize } = useCompressorStore(
    (store) => store,
  );

  const { isInitialized, compressFiles } = useCompress();
  const [settingsOpen, setSettingsOpen] = useState(true);

  return (
    <Collapsible className="w-full rounded-xl border transition-all" open={settingsOpen} onOpenChange={setSettingsOpen}>
      <CollapsibleTrigger className={cn('w-full overflow-hidden', settingsOpen ? 'rounded-t-xl' : 'rounded-xl')}>
        <div className="hover:bg-secondary flex w-full items-center justify-between p-4 transition-all">
          <span className="flex items-center gap-2">
            <Settings className="size-5" /> {t('settings', { ns: 'compressor' })}
          </span>
          <ChevronDown className={cn('size-5 transition-all', settingsOpen ? 'rotate-180' : '')} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full border-t">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-xl p-4">
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <Tabs
                className="w-full pr-2"
                value={compressionMode === COMPRESSION_MODE.QUALITY ? 'quality' : 'size'}
                onValueChange={(value) => {
                  setCompressionMode(value === 'quality' ? COMPRESSION_MODE.QUALITY : COMPRESSION_MODE.SIZE);
                }}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="quality">{t('quality')}</TabsTrigger>
                  <TabsTrigger value="size">{t('size')}</TabsTrigger>
                </TabsList>
                <TabsContent className="space-y-4 pt-4" value="quality">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{t('quality')}</Label>
                      <span className="text-sm font-medium">{quality}</span>
                    </div>
                    <Slider className="w-full" max={100} min={1} step={1} value={[quality]} onValueChange={(value) => setQuality(value[0])} />

                    <div className="flex items-center justify-between space-x-2 pt-2">
                      <Label htmlFor="lossless">{t('lossless_compression')}</Label>
                      <Switch checked={lossless} id="lossless" onCheckedChange={setLossless} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent className="space-y-4 pt-4" value="size">
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
      </CollapsibleContent>
    </Collapsible>
  );
}
