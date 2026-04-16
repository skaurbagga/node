/*const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');

const app = express();
const PORT = 5000;

app.get('/api/heavy-task', (req, res) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), {
        workerData: { iterations: 100000000 } // reduced for testing
    });

    worker.on('message', (result) => {
        res.json({ success: true, result });
    });

    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/


const express = require('express');
const { myQueue } = require('./queue');

const app = express();
app.use(express.json());

app.post('/api/add-task', async (req, res) => {
    const { number } = req.body;

    await myQueue.add('heavyTask', { number });

    res.json({
        success: true,
        message: 'Job added to queue'
    });
});

/*app.get('/api/block', (req, res) => {
    let result = 0;

    for (let i = 0; i < 1_000_000_000; i++) {
        result += i;
    }

    res.json({ result });
});*/

app.listen(5000, () => {
    console.log('Server running on port 5000');
});