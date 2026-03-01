'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { MESSAGE_LEVEL } from '@/types/utils';

export default function ToastHandler() {
  const { t } = useTranslation(['error', 'compressor']);
  const { generalMessage, setGeneralMessage } = useCompressorStore((store) => store);

  useEffect(() => {
    if (!generalMessage) return;

    const message = t(generalMessage.translationKey, {
      ns: generalMessage.translationNs,
      ...generalMessage.translationParams,
    });

    if (generalMessage.level === MESSAGE_LEVEL.ERROR) {
      toast.error(t('error:generic_error'), {
        description: message,
        duration: generalMessage.timeout || 4000,
      });
    } else if (generalMessage.level === MESSAGE_LEVEL.SUCCESS) {
      toast.success(message, {
        duration: generalMessage.timeout || 4000,
      });
    } else if (generalMessage.level === MESSAGE_LEVEL.WARNING) {
      toast.warning(message, {
        duration: generalMessage.timeout || 4000,
      });
    } else {
      toast(message, {
        duration: generalMessage.timeout || 4000,
      });
    }

    setGeneralMessage(null);
  }, [generalMessage, setGeneralMessage, t]);

  return <Toaster richColors position="bottom-right" />;
}
