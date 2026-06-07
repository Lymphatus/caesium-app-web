'use client';

import { useTranslation } from 'react-i18next';
import { Upload, Settings, Download } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation(['common']);

  const steps = [
    {
      icon: <Upload className="text-primary h-8 w-8" />,
      title: t('how_step1_title'),
      description: t('how_step1_desc'),
    },
    {
      icon: <Settings className="text-primary h-8 w-8" />,
      title: t('how_step2_title'),
      description: t('how_step2_desc'),
    },
    {
      icon: <Download className="text-primary h-8 w-8" />,
      title: t('how_step3_title'),
      description: t('how_step3_desc'),
    },
  ];

  return (
    <section className="bg-muted/20 mt-8 mb-8 w-full rounded-2xl border py-12">
      <h2 className="mb-12 text-center text-3xl font-semibold">{t('how_it_works_heading')}</h2>
      <div className="grid grid-cols-1 gap-12 px-6 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col items-center text-center">
            <div className="bg-primary/10 border-primary/20 relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full border shadow-sm">{step.icon}</div>
            {idx < steps.length - 1 && <div className="bg-border absolute top-10 left-[60%] z-0 hidden h-[2px] w-[80%] md:block"></div>}
            <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
            <p className="text-muted-foreground max-w-62.5 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
