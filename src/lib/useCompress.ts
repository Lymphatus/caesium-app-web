import { useCompressorStore } from '@/providers/compressor-store-provider';
import { useCompressionWorker } from '@/lib/useCompressionWorker';
import { FILE_STATUS, CImage } from '@/types/cimage';
import { useMemo } from 'react';

export function useCompress() {
  const { files, quality, lossless, keepMetadata, maxSize, maxSizeUnit, compressionMode, setFileStatus, handleCompressionResult } = useCompressorStore((store) => store);

  const { isInitialized, compress: workerCompress } = useCompressionWorker((result) => {
    if (typeof result === 'string') {
      console.log('Worker message:', result);
    } else {
      handleCompressionResult(result);
    }
  });

  const compressFiles = (filesToCompress: CImage | CImage[]) => {
    if (!isInitialized) {
      console.error('Worker not initialized');
      return;
    }

    // Normalize to an array so we can handle both a single file or multiple
    const filesArray = Array.isArray(filesToCompress) ? filesToCompress : [filesToCompress];

    filesArray.forEach((file) => {
      // Prevent double-compression
      if (file.status !== FILE_STATUS.COMPRESSING) {
        // 1. Set the individual file to 'COMPRESSING'
        setFileStatus(file.id, FILE_STATUS.COMPRESSING);

        // 2. Send it to the WASM worker
        workerCompress(file.file, quality, lossless, keepMetadata, maxSize * maxSizeUnit, compressionMode, file.id);
      }
    });
  };

  const isCompressionDone = files !== null && files.length > 0 && files.every((f) => f.status === FILE_STATUS.FINISHED || f.status === FILE_STATUS.ERROR);

  const compressionReport = useMemo(() => {
    if (!isCompressionDone) return null;
    const totalOriginalSize = files.reduce((acc, file) => acc + file.file.size, 0);
    const totalNewSize = files.reduce((acc, file) => acc + file.newSize, 0);
    const totalSavedSize = totalOriginalSize - totalNewSize;
    const totalSavedPercentage = (totalSavedSize / totalOriginalSize) * 100;
    return {
      totalOriginalSize,
      totalNewSize,
      totalSavedSize,
      totalSavedPercentage,
    };
  }, [files, isCompressionDone]);

  return {
    isInitialized,
    compressFiles,
    isCompressionDone,
    compressionReport,
  };
}
