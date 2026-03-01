import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      const colorClass = ratio < 0 ? 'text-green-500' : 'text-red-500';
      const indicator = ratio > 0 ? '↑' : '↓';
      return (
        <label className={colorClass}>
          [{indicator}
          {ratio}%]
        </label>
      );
    }
    return <></>;
  };

  const className = () => {
    switch (cImage.status) {
      case FILE_STATUS.ERROR:
        return 'border-destructive';
      default:
        return 'border-transparent';
    }
  };

  return (
    <div className={`${cImage.status === FILE_STATUS.COMPRESSING ? 'animate-spin-gradient' : ''} rounded-3xl p-0.5`}>
      <Card className={`${className()} flex w-full flex-col items-stretch overflow-hidden rounded-3xl border-2 shadow-none md:flex-row`}>
        <div
          className="relative h-30 w-full shrink-0 overflow-hidden bg-cover bg-center sm:h-30 sm:w-30"
          style={{
            backgroundImage: `url(${cImage.url})`,
          }}
        ></div>
        <div className="flex w-full min-w-0 flex-col justify-between gap-2 md:gap-0">
          <CardHeader className="gap-1 p-4 pb-2 text-left">
            <CardTitle className="flex w-full min-w-0 items-center justify-between gap-1 text-base">
              <span className="min-w-0 grow truncate">{cImage.id}</span>
              <Button className="h-8 w-8 shrink-0" disabled={cImage.status === FILE_STATUS.COMPRESSING} size="icon" variant="destructive" onClick={() => removeFile(cImage.id)}>
                <Trash2 className="h-4 w-4"></Trash2>
              </Button>
            </CardTitle>
            <CardDescription>
              <span className="flex flex-col gap-2">
                <Badge className="w-fit" variant="default">
                  {getHumanFileType(cImage.file.type)}
                </Badge>
                <span>
                  <label className={cImage.newSize > 0 ? 'line-through' : ''}>{prettyBytes(cImage.file.size)}</label>
                  {cImage.newSize > 0 && <label> → {prettyBytes(cImage.newSize)}</label>}
                  &nbsp;{getCompressionRatioLabel()}
                </span>
              </span>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex w-full flex-col justify-end gap-2 p-4 pt-2 sm:flex-row">
            {cImage.status === FILE_STATUS.ERROR && <p className="text-destructive min-w-0 grow truncate text-left text-sm">{cImage.errorMessage}</p>}
            {cImage.status === FILE_STATUS.FINISHED && (
              <Button
                className="h-8 w-8"
                size="icon"
                variant="secondary"
                onClick={() => {
                  /* TODO */
                }}
              >
                <Download className="h-4 w-4"></Download>
              </Button>
            )}
            <Button className="h-8 w-full sm:w-auto" disabled={cImage.status === FILE_STATUS.COMPRESSING || !isInitialized} variant="secondary" onClick={() => compressFiles(cImage)}>
              {t('compress')}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
