/*const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');

const app = express();
const PORT = 3000;

// ---------------- BLOCKING ROUTE (BAD) ---------------- 
app.get('/api/block', (req, res) => {
    let result = 0;

    for (let i = 0; i < 1e9; i++) {
        result += i;
    }

    res.json({ result });
});


// ---------------- WORKER THREAD ROUTE (GOOD) ---------------- 
app.get('/api/worker', (req, res) => {

    const worker = new Worker(path.join(__dirname, 'worker.js'), {
        workerData: { iterations: 1e9 }
    });

    worker.on('message', (result) => {
        res.json({ result });
    });

    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });

});


// ---------------- NORMAL ROUTE ---------------- 
app.get('/', (req, res) => {
    res.send('Server Running');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/

const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');

const app = express();
const PORT = 3000;

/* ---------------- WORKER API ---------------- */
app.get('/api/fibonacci', (req, res) => {

    const worker = new Worker(path.join(__dirname, 'heavy_task.js'), {
        workerData: 40
    });

    worker.on('message', (result) => {
        res.json({ result });
    });

    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });

});


/* ---------------- NORMAL ROUTE ---------------- */
app.get('/', (req, res) => {
    res.send('Server Running');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});