const { parentPort, workerData } = require('worker_threads');

// Simulate CPU-heavy task
let result = 0;

for (let i = 0; i < workerData.iterations; i++) {
    result += i;
}

// Send result back to main thread
parentPort.postMessage(result);