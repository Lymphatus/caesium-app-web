export class TaskPool {
  private workers: Worker[];
  private taskQueue: { message: unknown; resolve: (value: Worker) => void; reject: (reason?: unknown) => void }[];
  private activeTasks: Map<Worker, { message: unknown; resolve: (value: Worker) => void; reject: (reason?: unknown) => void }>;

  constructor(WorkerFactory: () => Worker, poolSize: number, onSuccess: (data: unknown) => unknown, onError: (data: unknown) => unknown) {
    this.workers = Array.from({ length: poolSize }, () => WorkerFactory());
    this.taskQueue = [];
    this.activeTasks = new Map();

    this.workers.forEach((worker) => {
      worker.postMessage('initLib');
      worker.onmessage = (event) => {
        if (event.data === 'initFinished') {
          return;
        }
        onSuccess(event.data);
        this.handleWorkerMessage(worker, event);
      };
      worker.onerror = (error) => {
        onError(error);
        console.error(`Worker error:`, error);
        const task = this.activeTasks.get(worker);
        if (task) {
          task.reject(error);
          this.activeTasks.delete(worker);
        }
      };
    });
  }

  private handleWorkerMessage(worker: Worker, event: MessageEvent) {
    const task = this.activeTasks.get(worker);
    if (task) {
      task.resolve(event.data); // Resolve the promise when the worker sends a response
      this.activeTasks.delete(worker);
    }

    if (this.taskQueue.length > 0) {
      const { message, resolve, reject } = this.taskQueue.shift()!;
      this.assignTask(worker, message, resolve, reject);
    }
  }

  private assignTask(worker: Worker, message: unknown, resolve: (value: Worker) => void, reject: (reason?: unknown) => void) {
    this.activeTasks.set(worker, { message, resolve, reject });
    worker.postMessage(message);
  }

  runTask(message: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const availableWorker = this.workers.find((w) => !this.activeTasks.has(w));
      if (availableWorker) {
        this.assignTask(availableWorker, message, resolve, reject);
      } else {
        this.taskQueue.push({ message, resolve, reject });
      }
    });
  }

  terminate(): void {
    this.workers.forEach((worker) => worker.terminate());
    this.taskQueue = [];
    this.activeTasks.clear();
  }
}
