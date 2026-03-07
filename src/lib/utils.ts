import { CImage, FILE_STATUS } from '@/types/cimage';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHumanFileType(fileType: string) {
  switch (fileType) {
    case 'image/jpeg':
      return 'JPEG';
    case 'image/png':
      return 'PNG';
    case 'image/webp':
      return 'WEBP';
    case 'image/gif':
      return 'GIF';
    default:
      return fileType;
  }
}
