'use client';

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Toast, ToastContent, ToastContentValue, ToastDescription, ToastQueue, ToastTitle } from '@heroui/react';
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
        title: generalMessage.level === MESSAGE_LEVEL.ERROR ? t('error:generic_error') : message,
        description: generalMessage.level === MESSAGE_LEVEL.ERROR ? message : null,
      },
      {
        timeout: generalMessage.timeout,
      },
    );

    setGeneralMessage(null);
  }, [generalMessage, queue, setGeneralMessage, t]);

  const backgroundColor = (variant: "danger" | "success" | "warning" | "default" | "accent" | undefined) => {
    switch (variant) {
      case 'danger':
        return 'border border-danger';
      case 'success':
        return 'border border-success';
      case 'warning':
        return 'border border-warning';
      case 'accent':
        return 'border border-accent';
      default:
        return '';
    }
  };
  return (
    <Toast.Provider className="mb-24 mr-8" placement="bottom" queue={queue}>
      {({ toast: toastItem }) => {
        const content = toastItem.content as ToastContentValue;
        return (
          <Toast
            toast={toastItem}
            variant={content.variant}
            className={backgroundColor(content.variant)}
          >
            <Toast.Indicator />
            <div className='flex flex-col gap-1'>
              <p className='text-left'>{content.title && <ToastTitle>{content.title}</ToastTitle>}</p>
              <p className='text-left'>{content.description && <ToastDescription>{content.description}</ToastDescription>}</p>
            </div>

            <Toast.CloseButton />
          </Toast >
        );
      }}
    </Toast.Provider >
  );
}
