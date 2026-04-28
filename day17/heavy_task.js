const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // MAIN THREAD
    const worker = new Worker(__filename, { workerData: 40 });

    worker.on('message', (result) => {
        console.log(`Calculation Finished: ${result}`);
    });

    worker.on('error', (err) => {
        console.error('Worker Error:', err);
    });

    console.log("Main Thread is free to handle other requests!");

} else {
    // WORKER THREAD
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    const result = fibonacci(workerData);

    parentPort.postMessage(result);
}