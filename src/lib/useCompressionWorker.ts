import { useEffect, useRef, useState } from 'react';

export interface CompressionResult {
  success: boolean;
  size: number;
  data: Uint8Array | null;
  errorCode: number;
  errorString: string;
  uuid: string;
}

export interface CompressionWorkerHook {
  isInitialized: boolean;
  compress: (file: File, quality: number, lossless: boolean, keepMetadata: boolean, maxSize: number, compressionMode: number, uuid: string) => void;
}

interface Job {
  file: File;
  quality: number;
  lossless: boolean;
  keepMetadata: boolean;
  maxSize: number;
  compressionMode: number;
  uuid: string;
}

export function useCompressionWorker(onMessage: (result: CompressionResult | string) => void): CompressionWorkerHook {
  // We manage an array of workers
  const workersRef = useRef<Worker[]>([]);
  // We keep track of how many workers have finished initializing their WASM module
  const [initializedCount, setInitializedCount] = useState(0);

  // Determine how many workers we should spawn based on available cores.
  const poolSize = typeof navigator !== 'undefined' ? Math.max(1, Math.min((navigator.hardwareConcurrency || 2) - 1, 4)) : 1;
  const isInitialized = initializedCount === poolSize;

  const onMessageRef = useRef(onMessage);

  // Queue of worker indices that are currently completely idle
  const idleWorkersRef = useRef<number[]>([]);
  // Queue of jobs waiting to be processed when all workers are busy
  const jobQueueRef = useRef<Job[]>([]);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Spawn the worker pool
    const pool: Worker[] = [];
    const initialIdle: number[] = [];

    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker('/wasm/compression-worker.js', { type: 'module' });

      worker.onmessage = (e) => {
        if (e.data === 'initFinished') {
          // Increment our initialized counter
          setInitializedCount((prev) => prev + 1);
        } else {
          // Worker finished a task! Send the result back
          onMessageRef.current(e.data);

          // Check if there are ANY pending jobs in the queue
          if (jobQueueRef.current.length > 0) {
            const nextJob = jobQueueRef.current.shift();
            if (nextJob) {
              // Immediately assign the next pending job to this newly freed worker
              worker.postMessage([nextJob.file, nextJob.quality, nextJob.lossless, nextJob.keepMetadata, nextJob.maxSize, nextJob.compressionMode, nextJob.uuid]);
            }
          } else {
            // No pending jobs, this worker is completely idle now
            idleWorkersRef.current.push(i);
          }
        }
      };

      worker.onerror = (error) => {
        console.error(`Worker ${i} error:`, error);
        onMessageRef.current({
          success: false,
          size: 0,
          data: null,
          errorCode: 999,
          errorString: error.message,
          uuid: '',
        });

        // Even on error, we must free the worker up or assign it the next task
        // otherwise it stays permanently "busy" in our virtual state
        if (jobQueueRef.current.length > 0) {
          const nextJob = jobQueueRef.current.shift();
          if (nextJob) {
            worker.postMessage([nextJob.file, nextJob.quality, nextJob.lossless, nextJob.keepMetadata, nextJob.maxSize, nextJob.compressionMode, nextJob.uuid]);
          }
        } else {
          idleWorkersRef.current.push(i);
        }
      };

      // Initialize the WASM library
      worker.postMessage('initLib');

      pool.push(worker);
      initialIdle.push(i); // All workers start idle
    }

    workersRef.current = pool;
    idleWorkersRef.current = initialIdle;

    // Cleanup all workers on unmount
    return () => {
      pool.forEach((worker) => {
        worker.terminate();
      });
      workersRef.current = [];
      idleWorkersRef.current = [];
      jobQueueRef.current = [];
    };
  }, [poolSize]);

  const compress = (file: File, quality: number, lossless: boolean, keepMetadata: boolean, maxSize: number, compressionMode: number, uuid: string) => {
    if (workersRef.current.length === 0) {
      console.error('No workers initialized');
      return;
    }

    if (!isInitialized) {
      console.error('WASM not fully initialized across the worker pool yet');
      return;
    }

    const job: Job = { file, quality, lossless, keepMetadata, maxSize, compressionMode, uuid };

    // Check if there are any completely idle workers available immediately
    if (idleWorkersRef.current.length > 0) {
      // Pull an available idle worker (shift takes from the front of the queue)
      const workerIndex = idleWorkersRef.current.shift()!;
      const worker = workersRef.current[workerIndex];

      worker.postMessage([job.file, job.quality, job.lossless, job.keepMetadata, job.maxSize, job.compressionMode, job.uuid]);
    } else {
      // All workers are currently busy processing other images.
      // Push this job to the queue where the VERY NEXT freed worker will pick it up.
      jobQueueRef.current.push(job);
    }
  };

  return {
    isInitialized,
    compress,
  };
}
