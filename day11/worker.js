/*const { parentPort, workerData } = require('worker_threads');

// Simulate a heavy computation
let result = 0;

for (let i = 0; i < workerData.iterations; i++) {
    result += i;
}

// Send result back to main thread
parentPort.postMessage(result);*/

const { Worker } = require('worker_threads');
const path = require('path');

app.get('/api/worker-task', (req, res) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), {
        workerData: { iterations: 1_000_000_000 }
    });

    worker.on('message', (result) => {
        res.json({ result });
    });

    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
});