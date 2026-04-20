const { parentPort, workerData } = require('worker_threads');

// Simulate heavy PDF generation
let result = 0;
for (let i = 0; i < 1e8; i++) {
    result += i;
}

parentPort.postMessage(`PDF generated for user ${workerData.userId}`);