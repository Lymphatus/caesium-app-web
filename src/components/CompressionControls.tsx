'use client';

import { Label, Separator, Slider, Surface, Switch, Tabs } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function CompressionControls() {
  const { t } = useTranslation('compressor');

  return (
    <div className="flex flex-col gap-4">
      <Separator />
      <Surface className="flex flex-col gap-1 rounded-3xl p-4" variant="default">
        <div className="flex w-full gap-2">
          <Tabs className="w-full md:w-1/2">
            <Tabs.ListContainer>
              <Tabs.List>
                <Tabs.Tab className="h-6" id="quality">
                  {t('quality')}
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab className="h-6" id="size">
                  {t('size')}
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="quality">
              <div className="flex flex-col gap-4">
                <Slider className="w-full" defaultValue={80}>
                  <Label>{t('quality')}</Label>
                  <Slider.Output />
                  <Slider.Track className="h-2">
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>
                <Switch className="w-full justify-between">
                  <Label>{t('lossless_compression')}</Label>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
                <Switch className="w-full justify-between">
                  <Label>{t('keep_metadata')}</Label>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="size">
              <p>TODO</p>
            </Tabs.Panel>
          </Tabs>
          <div>TODO!</div>
        </div>
      </Surface>
    </div>
  );
}
