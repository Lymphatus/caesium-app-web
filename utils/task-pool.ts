export class TaskPool {
  concurrency = 2;
  queue: Function[] = [];
  running = 0;

  constructor(concurrency:number) {
    this.concurrency = concurrency; // Maximum number of concurrent tasks
    this.queue = []; // Queue to hold tasks waiting to run
    this.running = 0; // Number of currently running tasks
  }

  async run(task: Function) {
    return new Promise((resolve, reject) => {
      const runTask = async () => {
        try {
          this.running++;
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.running--;
          this.processQueue(); // Process next task in the queue
        }
      };

      if (this.running < this.concurrency) {
        // Run task immediately if below concurrency limit
        runTask();
      } else {
        // Push task to the queue if concurrency limit reached
        this.queue.push(runTask);
      }
    });
  }

  processQueue() {
    if (this.queue.length > 0 && this.running < this.concurrency) {
      const nextTask = this.queue.shift();
      if (nextTask) {
        nextTask();
      }
    }
  }
}