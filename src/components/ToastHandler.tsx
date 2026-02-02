'use client';

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Toast, ToastQueue } from '@heroui/react';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { MESSAGE_LEVEL } from '@/types/utils';

export default function ToastHandler() {
  const { t } = useTranslation(['error', 'compressor']);
  const { generalMessage, setGeneralMessage } = useCompressorStore((store) => store);
  const queue = useMemo(() => new ToastQueue({ maxVisibleToasts: 3 }), []);
  useEffect(() => {
    if (!generalMessage) return;

    const variant = generalMessage.level === MESSAGE_LEVEL.ERROR ? 'danger' : generalMessage.level === MESSAGE_LEVEL.SUCCESS ? 'success' : generalMessage.level === MESSAGE_LEVEL.WARNING ? 'warning' : 'default';

    const message = t(generalMessage.translationKey, {
      ns: generalMessage.translationNs,
      ...generalMessage.translationParams,
    });

    queue.add(
      {
        variant,
        title: message,
      },
      {
        timeout: generalMessage.timeout,
      },
    );

    setGeneralMessage(null);
  }, [generalMessage, queue, setGeneralMessage, t]);

  return <Toast.Container className="mt-14 mr-8" placement="top end" queue={queue}></Toast.Container>;
}
