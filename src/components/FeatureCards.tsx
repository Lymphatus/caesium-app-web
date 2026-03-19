'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FeatureCards() {
  const { t } = useTranslation(['common']);

  const features = [
    {
      icon: <ShieldCheck className="text-primary mb-2 h-10 w-10" />,
      title: t('features_secure_title'),
      description: t('features_secure_desc'),
    },
    {
      icon: <Zap className="text-primary mb-2 h-10 w-10" />,
      title: t('features_fast_title'),
      description: t('features_fast_desc'),
    },
    {
      icon: <HeartHandshake className="text-primary mb-2 h-10 w-10" />,
      title: t('features_free_title'),
      description: t('features_free_desc'),
    },
  ];

  return (
    <section className="mt-8 w-full py-12">
      <h2 className="mb-8 text-center text-3xl font-semibold">{t('features_heading')}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, idx) => (
          <Card key={idx} className="bg-muted/30 shadow-none">
            <CardHeader className="flex flex-col items-center pb-2 text-center">
              {feature.icon}
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
