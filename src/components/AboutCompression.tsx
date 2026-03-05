'use client';

import { Zap, ShieldCheck, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function AboutCompression() {
  const { t } = useTranslation('compressor');

  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <Card className="bg-primary/5 border-none shadow-none">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-semibold">{t('about_lightning_fast_title')}</h3>
          <p className="text-muted-foreground text-sm">{t('about_lightning_fast_description')}</p>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-none shadow-none">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-semibold">{t('about_secure_title')}</h3>
          <p className="text-muted-foreground text-sm">{t('about_secure_description')}</p>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-none shadow-none">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-semibold">{t('about_batch_title')}</h3>
          <p className="text-muted-foreground text-sm">{t('about_batch_description')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
