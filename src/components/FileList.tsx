'use client';

import { useCompressorStore } from '@/providers/compressor-store-provider';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';
import prettyBytes from 'next/dist/lib/pretty-bytes';
import { Trash2, ArrowRight, Play } from 'lucide-react';
import { FILE_STATUS, CImage } from '@/types/cimage';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useCompress } from '@/lib/useCompress';

export default function FileList() {
  const { files, removeFile, clearFiles } = useCompressorStore((store) => store);
  const { t } = useTranslation('compressor');
  const { compressFiles } = useCompress();

  const getStatusBadge = (file: CImage) => {
    switch (file.status) {
      case FILE_STATUS.WAITING:
        return <Badge variant="secondary">{t('waiting')}</Badge>;
      case FILE_STATUS.COMPRESSING:
        return <Badge className="bg-blue-500 hover:bg-blue-600 dark:text-white">{t('compressing')}</Badge>;
      case FILE_STATUS.FINISHED:
        return <Badge className="bg-green-500 hover:bg-green-600 dark:text-white">{t('finished')}</Badge>;
      case FILE_STATUS.ERROR:
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="cursor-help" variant="destructive">
                {t('error')}
              </Badge>
            </TooltipTrigger>
            {file.errorMessage && (
              <TooltipContent>
                <p>{file.errorMessage}</p>
              </TooltipContent>
            )}
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const calculateSavings = (original: number, compressed: number) => {
    if (compressed === 0 || original === 0) return null;
    const diff = original - compressed;
    if (diff <= 0) return null;
    const percentage = ((diff / original) * 100).toFixed(1);
    return <span className="ml-2 text-xs font-medium text-green-600 dark:text-green-400">(-{percentage}%)</span>;
  };

  return (
    <div className="bg-card/50 w-full overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-15"></TableHead>
            <TableHead className="w-full">{t('file_name')}</TableHead>
            <TableHead className="min-w-36 whitespace-nowrap">{t('status')}</TableHead>
            <TableHead className="w-[1%] whitespace-nowrap">{t('size')}</TableHead>
            <TableHead className="w-[1%] pr-4 text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files?.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="pl-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                  <Image fill alt={file.file.name} className="object-cover" src={file.url} />
                </div>
              </TableCell>
              <TableCell className="max-w-50 truncate text-left font-medium" title={file.file.name}>
                {file.file.name}
              </TableCell>
              <TableCell className="text-left">{getStatusBadge(file)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{prettyBytes(file.file.size)}</span>
                  {file.status === FILE_STATUS.FINISHED && (
                    <>
                      <ArrowRight className="text-muted-foreground h-3 w-3" />
                      <span className="font-medium">{prettyBytes(file.newSize)}</span>
                      {calculateSavings(file.file.size, file.newSize)}
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="pr-4 text-right">
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
          <TableRow>
            <TableCell className="p-4" colSpan={5}>
              <div className="flex w-full items-center justify-between">
                <Button className="text-destructive hover:text-destructive hover:bg-destructive/10" variant="ghost" onClick={clearFiles}>
                  {t('clear_list')}
                </Button>
                <Button onClick={() => console.log('Download Action Not Implemented Yet')}>{t('download_all')}</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
