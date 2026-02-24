import { Button, Card } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { CImage, FILE_STATUS } from '@/types/cimage';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { useTranslation } from 'react-i18next';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { useCompress } from '@/lib/useCompress';

export default function ImageCard({ cImage }: { cImage: CImage }) {
  const { t } = useTranslation('compressor');

  const { removeFile } = useCompressorStore((store) => store);
  const { isInitialized, compressFiles } = useCompress();

  return (
    <div className={`${cImage.status === FILE_STATUS.COMPRESSING ? 'animate-spin-gradient' : ''} rounded-3xl p-0.5`}>
      <Card className="w-full items-stretch rounded-3xl md:flex-row">
        <div
          className="relative h-30 w-full shrink-0 overflow-hidden rounded-2xl bg-cover bg-center sm:h-30 sm:w-30"
          style={{
            backgroundImage: `url(${cImage.url})`,
          }}
        ></div>
        <div className="flex w-full min-w-0 flex-col justify-between gap-2 md:gap-0">
          <Card.Header className="gap-1 text-left">
            <Card.Title className="flex w-full min-w-0 items-center gap-1">
              <span className="min-w-0 grow truncate">{cImage.id}</span>
              <Button isIconOnly className="shrink-0" isDisabled={cImage.status === FILE_STATUS.COMPRESSING} size="sm" variant="danger-soft" onPress={() => removeFile(cImage.id)}>
                <Trash2></Trash2>
              </Button>
            </Card.Title>
            <Card.Description>
              <label className={cImage.newSize > 0 ? 'line-through' : ''}>{prettyBytes(cImage.file.size)}</label>
              {cImage.newSize > 0 && <label>&nbsp;{prettyBytes(cImage.newSize)}</label>}
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full flex-col justify-end gap-1 sm:flex-row">
            <Button className="w-full sm:w-auto" isDisabled={cImage.status === FILE_STATUS.COMPRESSING || !isInitialized} size="sm" variant="secondary" onPress={() => compressFiles(cImage)}>
              {t('compress')}
            </Button>
          </Card.Footer>
        </div>
      </Card>
    </div>
  );
}
