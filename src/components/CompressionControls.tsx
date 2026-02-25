'use client';

import { Button, Description, InputGroup, Label, ListBox, Select, Separator, Slider, Surface, Switch, Tabs, TextField } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { COMPRESSION_MODE, FILES_LIMIT, MAX_FILE_SIZE } from '@/types/utils';
import { Play, Plus, Trash2 } from 'lucide-react';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { useCompressionWorker } from '@/lib/useCompressionWorker';
import { FILE_STATUS } from '@/types/cimage';
import { useCompress } from '@/lib/useCompress';

export default function CompressionControls() {
  const { t } = useTranslation('compressor');
  const { files, quality, keepMetadata, compressionMode, maxSize, clearFiles, triggerFileSelect, setLossless, maxSizeUnit, setMaxSizeUnit, handleCompressionResult, setQuality, setKeepMetadata, setCompressionMode, setMaxSize } =
    useCompressorStore((store) => store);

  const { isInitialized, compressFiles } = useCompress();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-4">
        <Button className="w-full md:w-fit" size="sm" variant="danger-soft" onPress={clearFiles}>
          <Trash2></Trash2>
          {t('clear_list')}
        </Button>

        <Button className="w-full md:w-fit" isDisabled={!isInitialized} size="lg" onPress={() => { if (files !== null) { compressFiles(files) } else { } }}>
          <Play></Play>
          {t('compress')}
        </Button>
        <Button size="sm" variant="ghost" onPress={triggerFileSelect}>
          <Plus></Plus>
          {t('add_dots')}
        </Button>
      </div>
      <Separator />
      <Surface className="flex flex-col gap-1 rounded-3xl p-4" variant="default">
        <div className="flex w-full gap-2">
          <Tabs
            className="w-full pr-2 md:w-1/2"
            selectedKey={compressionMode === COMPRESSION_MODE.QUALITY ? 'quality' : 'size'}
            onSelectionChange={(value) => {
              setCompressionMode(value.toString() === 'quality' ? COMPRESSION_MODE.QUALITY : COMPRESSION_MODE.SIZE);
            }}
          >
            <Tabs.ListContainer>
              <Tabs.List>
                <Tabs.Tab id="quality">
                  {t('quality')}
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="size">
                  {t('size')}
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="quality">
              <div className="flex flex-col gap-4">
                <Slider className="w-full" maxValue={100} minValue={0} value={quality} onChange={(value) => setQuality(Array.isArray(value) ? value[0] : value)}>
                  <Label>{t('quality')}</Label>
                  <Slider.Output />
                  <Slider.Track className="h-2">
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>
                <Switch className="w-full justify-between" onChange={(val) => setLossless(val)}>
                  <Label>{t('lossless_compression')}</Label>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="size">
              <div className="flex flex-col gap-4">
                <TextField className="w-full">
                  <Label className="text-left">{t('max_size')}</Label>
                  <InputGroup variant="secondary">
                    <InputGroup.Input className="pr-0" type="number" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} />
                    <InputGroup.Suffix className="pr-0">
                      <Select aria-label={t('max_size')} className="min-w-24" defaultValue={maxSizeUnit.toString()} variant="secondary" onChange={(key) => setMaxSizeUnit(key != null ? Number(key) : 1)}>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="1" textValue="Bytes">
                              Bytes
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="1000" textValue="Kb">
                              Kb
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="1000000" textValue="Mb">
                              Mb
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <Description className="h-2 text-left">&nbsp;</Description>
                </TextField>
              </div>
            </Tabs.Panel>
            <div className="w-full px-2">
              <Switch className="w-full justify-between" isSelected={keepMetadata} onChange={setKeepMetadata}>
                <Label>{t('keep_metadata')}</Label>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
          </Tabs>
          <div className="w-full pl-2 text-left md:w-1/2">
            <h4 className="font-semibold">{t('restriction')}</h4>
            <ul className="list-disc text-sm">
              <li>{t('file_types')}</li>
              <li>{t('max_files', { max_files: FILES_LIMIT })}</li>
              <li>{t('max_file_size', { max_file_size: prettyBytes(MAX_FILE_SIZE) })}</li>
              <li>{t('auto_delete')}</li>
            </ul>
          </div>
        </div>
      </Surface>
    </div>
  );
}
