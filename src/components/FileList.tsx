'use client';

import ImageComparisonModal from '@/components/ImageComparisonModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompress } from '@/lib/useCompress';
import { cn } from '@/lib/utils';
import { useCompressorStore } from '@/providers/compressor-store-provider';
import { CImage, FILE_STATUS } from '@/types/cimage';
import { ArrowDown, ArrowRight, ArrowUp, Download, ListX, LoaderCircle, Play, Trash2 } from 'lucide-react';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FileList() {
  const { files, removeFile, clearFiles, downloadAll } = useCompressorStore((store) => store);
  const { t } = useTranslation('compressor');
  const { compressFiles } = useCompress();
  const [selectedFile, setSelectedFile] = useState<CImage | null>(null);

  const getStatusBadge = (file: CImage) => {
    switch (file.status) {
      case FILE_STATUS.WAITING:
        return <Badge variant="secondary">{t('waiting')}</Badge>;
      case FILE_STATUS.COMPRESSING:
        return (
          <Badge variant="default">
            <LoaderCircle className="animate-spin"></LoaderCircle>
            {t('compressing')}
          </Badge>
        );
      case FILE_STATUS.FINISHED:
        return <Badge variant="success">{t('finished')}</Badge>;
      case FILE_STATUS.ERROR:
        return (
          <div className="flex flex-col gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="cursor-help" variant="destructive">
                  {t('error')}
                </Badge>
              </TooltipTrigger>
              {file.errorMessage && (
                <TooltipContent className="hidden md:block">
                  <p>{file.errorMessage}</p>
                </TooltipContent>
              )}
            </Tooltip>
            <span className="text-destructive text-xs md:hidden">{file.errorMessage}</span>
          </div>
        );
      default:
        return null;
    }
  };

  const calculateSavings = (original: number, compressed: number) => {
    if (compressed === 0 || original === 0) return null;
    const diff = original - compressed;
    const percentage = ((diff / original) * -100).toFixed(1);
    if (diff > 0) {
      return (
        <span className="text-success flex items-center text-xs">
          (<ArrowDown className="size-3"></ArrowDown>
          {percentage}%)
        </span>
      );
    }
    return (
      <span className="text-destructive flex items-center text-xs">
        (<ArrowUp className="size-3"></ArrowUp>
        {percentage}%)
      </span>
    );
  };

  const canDownload = () => {
    return files == null || files?.length === 0 || files.filter((f) => [FILE_STATUS.WAITING, FILE_STATUS.COMPRESSING].includes(f.status)).length > 0;
  };

  const footerButtons = (
    <>
      <Button className="text-destructive hover:text-destructive hover:bg-destructive/10" size="sm" variant="ghost" onClick={clearFiles}>
        <ListX></ListX>
        {t('clear_list')}
      </Button>
      <Button
        disabled={canDownload()}
        size="sm"
        variant="secondary"
        onClick={() => {
          if (files === null) return;
          downloadAll();
        }}
      >
        <Download></Download>
        {t('download_all')}
      </Button>
    </>
  );

  return (
    <div className="bg-card/50 w-full overflow-hidden rounded-md border">
      <div className="hidden w-full overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-15"></TableHead>
              <TableHead className="w-full">{t('file_name')}</TableHead>
              <TableHead className="w-[1%] whitespace-nowrap">{t('size')}</TableHead>
              <TableHead className="min-w-36 whitespace-nowrap">{t('status')}</TableHead>
              <TableHead className="w-[1%] pr-4 text-right whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files?.map((file) => (
              <TableRow key={file.id} className={cn(file.status === FILE_STATUS.FINISHED && 'cursor-pointer')} onClick={() => file.status === FILE_STATUS.FINISHED && setSelectedFile(file)}>
                <TableCell className="pl-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                    <Image fill alt={file.file.name} className="object-cover" src={file.url} />
                  </div>
                </TableCell>
                <TableCell className="max-w-50 truncate text-left font-medium" title={file.file.name}>
                  {file.file.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <span className={cn('text-muted-foreground', file.status === FILE_STATUS.FINISHED && 'line-through')}>{prettyBytes(file.file.size)}</span>
                    {file.status === FILE_STATUS.FINISHED && (
                      <>
                        <ArrowRight className="text-muted-foreground h-3 w-3" />
                        <span className="font-medium">{prettyBytes(file.newSize)}</span>
                        {calculateSavings(file.file.size, file.newSize)}
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-left">{getStatusBadge(file)}</TableCell>
                <TableCell className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <Button asChild={file.status === FILE_STATUS.FINISHED} className="text-muted-foreground hover:text-primary" disabled={file.status !== FILE_STATUS.FINISHED} size="icon" variant="ghost">
                    {file.status === FILE_STATUS.FINISHED && file.outputImageUrl ? (
                      <a download={file.file.name} href={file.outputImageUrl} rel="noreferrer" target="_blank">
                        <Download className="size-4" />
                      </a>
                    ) : (
                      <Download className="size-4" />
                    )}
                  </Button>
                  <Button className="text-muted-foreground hover:text-primary" size="icon" variant="ghost" onClick={() => compressFiles(file)}>
                    <Play className="size-4" />
                  </Button>
                  <Button className="text-muted-foreground hover:text-destructive" size="icon" variant="ghost" onClick={() => removeFile(file.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="hover:bg-transparent">
              <TableCell className="px-4 py-2" colSpan={5}>
                <div className="flex w-full items-center justify-between">{footerButtons}</div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="block w-full divide-y md:hidden">
        {files?.map((file) => (
          <div key={file.id} className={cn('flex flex-col gap-3 p-4', file.status === FILE_STATUS.FINISHED && 'cursor-pointer')} onClick={() => file.status === FILE_STATUS.FINISHED && setSelectedFile(file)}>
            <div className="flex w-full items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border">
                <Image fill alt={file.file.name} className="object-cover" src={file.url} />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="truncate text-left text-sm font-medium" title={file.file.name}>
                  {file.file.name}
                </span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <span className={cn('text-muted-foreground', file.status === FILE_STATUS.FINISHED && 'line-through')}>{prettyBytes(file.file.size)}</span>
                    {file.status === FILE_STATUS.FINISHED && (
                      <>
                        <ArrowRight className="text-muted-foreground h-3 w-3" />
                        <span className="font-medium">{prettyBytes(file.newSize)}</span>
                        {calculateSavings(file.file.size, file.newSize)}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {getStatusBadge(file)}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
              <Button asChild={file.status === FILE_STATUS.FINISHED} className="text-primary hover:bg-primary/10 hover:text-primary" disabled={file.status !== FILE_STATUS.FINISHED} size="sm" variant="outline">
                {file.status === FILE_STATUS.FINISHED && file.outputImageUrl ? (
                  <a download={file.file.name} href={file.outputImageUrl} rel="noreferrer" target="_blank">
                    <Download className="size-4" />
                  </a>
                ) : (
                  <Download className="size-4" />
                )}
              </Button>
              <Button className="flex-1" size="sm" variant="outline" onClick={() => compressFiles(file)}>
                <Play className="mr-2 size-4" />
                {t('compress')}
              </Button>
              <Button className="text-destructive hover:bg-destructive/10 hover:text-destructive" size="sm" variant="outline" onClick={() => removeFile(file.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Mobile Footer Actions */}
        <div className="bg-muted/20 flex flex-col gap-2 p-4">{footerButtons}</div>
      </div>

      <ImageComparisonModal file={selectedFile} open={selectedFile !== null} onOpenChange={(open) => !open && setSelectedFile(null)} />
    </div>
  );
}
