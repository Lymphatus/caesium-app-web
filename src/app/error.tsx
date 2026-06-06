'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const { t } = useTranslation('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex h-full max-w-300 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold md:text-3xl">{t('error_title')}</h1>
      <p className="text-muted-foreground max-w-md">{t('error_description')}</p>
    </div>
  );
}
