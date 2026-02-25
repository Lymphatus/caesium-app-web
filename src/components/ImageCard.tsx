import { Button, Card, Chip } from '@heroui/react';
import { Download, Trash2 } from 'lucide-react';
import { CImage, FILE_STATUS } from '@/types/cimage';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { useTranslation } from 'react-i18next';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { useCompress } from '@/lib/useCompress';
import { getHumanFileType } from '@/lib/utils';

export default function ImageCard({ cImage }: { cImage: CImage }) {
  const { t } = useTranslation('compressor');

  const { removeFile } = useCompressorStore((store) => store);
  const { isInitialized, compressFiles } = useCompress();

  const getCompressionRatioLabel = () => {
    if (cImage.newSize > 0) {
      const ratio = Math.round((cImage.newSize / cImage.file.size) * 100) - 100;
      const colorClass = ratio < 0 ? 'text-success' : 'text-danger';
      const indicator = ratio > 0 ? '↑' : '↓';
      return (<label className={colorClass}>[{indicator}{ratio}%]</label>);
    }
    return (<></>);
  };

  const className = () => {
    switch (cImage.status) {
      case FILE_STATUS.ERROR:
        return 'border-danger';
      default:
        return 'border-transparent';
    }
  };

  return (
    <div className={`${cImage.status === FILE_STATUS.COMPRESSING ? 'animate-spin-gradient' : ''} rounded-3xl p-0.5`}>
      <Card className={`${className()} w-full items-stretch rounded-3xl md:flex-row border-2`}>
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
              <span className="flex flex-col gap-2">
                <Chip variant="primary" size="sm" className="w-fit" color="accent">{getHumanFileType(cImage.file.type)}</Chip>
                <span>
                  <label className={cImage.newSize > 0 ? 'line-through' : ''}>{prettyBytes(cImage.file.size)}</label>
                  {cImage.newSize > 0 && <label> → {prettyBytes(cImage.newSize)}</label>}
                  &nbsp;{getCompressionRatioLabel()}
                </span>
              </span>
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full flex-col justify-end gap-2 sm:flex-row">
            {cImage.status === FILE_STATUS.ERROR && <p className="text-sm text-danger text-left min-w-0 grow truncate">{cImage.errorMessage}</p>}
            {cImage.status === FILE_STATUS.FINISHED && <Button variant="secondary" size="sm" isIconOnly onPress={() => { /* TODO */ }}><Download></Download></Button>}
            <Button className="w-full sm:w-auto" isDisabled={cImage.status === FILE_STATUS.COMPRESSING || !isInitialized} size="sm" variant="secondary" onPress={() => compressFiles(cImage)}>
              {t('compress')}
            </Button>
          </Card.Footer>
        </div>
      </Card>
    </div >
  );
}
