import { RefObject, useEffect, useRef, useState } from 'react';

export interface CompressionResult {
  success: boolean;
  size: number;
  data: Uint8Array | null;
  errorCode: number;
  errorString: string;
  uuid: string;
}

export interface CompressionWorkerHook {
  worker: RefObject<Worker | null>;
  isInitialized: boolean;
  compress: (file: File, quality: number, keepMetadata: boolean, maxSize: number, compressionMode: number, uuid: string) => void;
}

export function useCompressionWorker(onMessage: (result: CompressionResult | string) => void): CompressionWorkerHook {
  const workerRef = useRef<Worker | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only initialize worker in browser
    if (typeof window === 'undefined') {
      return;
    }

    // Create worker as ES module
    const worker = new Worker('/wasm/compression-worker.js', { type: 'module' });

    // Handle worker messages
    worker.onmessage = (e) => {
      if (e.data === 'initFinished') {
        setIsInitialized(true);
      } else {
        onMessage(e.data as CompressionResult);
      }
    };

    // Handle worker errors
    worker.onerror = (error) => {
      console.error('Worker error:', error);
      onMessage({
        success: false,
        size: 0,
        data: null,
        errorCode: 999,
        errorString: error.message,
        uuid: '',
      });
    };

    // Initialize the WASM library
    worker.postMessage('initLib');

    workerRef.current = worker;

    // Cleanup on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [onMessage]);

  const compress = (file: File, quality: number, keepMetadata: boolean, maxSize: number, compressionMode: number, uuid: string) => {
    if (!workerRef.current) {
      console.error('Worker not initialized');
      return;
    }

    if (!isInitialized) {
      console.error('WASM not initialized yet');
      return;
    }

    // Send compression request to worker
    workerRef.current.postMessage([file, quality, keepMetadata, maxSize, compressionMode, uuid]);
  };

  return {
    worker: workerRef,
    isInitialized,
    compress,
  };
}
