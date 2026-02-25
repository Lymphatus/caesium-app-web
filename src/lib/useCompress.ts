import { useCompressorStore } from '@/providers/compressor-store-provider';
import { useCompressionWorker } from '@/lib/useCompressionWorker';
import { FILE_STATUS, CImage } from '@/types/cimage';

export function useCompress() {
    const {
        quality,
        lossless,
        keepMetadata,
        maxSize,
        compressionMode,
        setFileStatus,
        handleCompressionResult
    } = useCompressorStore((store) => store);

    // Initialize the worker once and route its messages to Zustand
    const { isInitialized, compress: workerCompress } = useCompressionWorker((result) => {
        if (typeof result === 'string') {
            console.log('Worker message:', result);
        } else {
            handleCompressionResult(result);
        }
    });

    // Reusable function to compress an array of files or a single file
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
                workerCompress(
                    file.file,
                    lossless ? 0 : quality,
                    keepMetadata,
                    maxSize,
                    compressionMode,
                    file.id
                );
            }
        });
    };

    return {
        isInitialized,
        compressFiles,
    };
}
