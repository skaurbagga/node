const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Worker } = require('worker_threads');

const Activity = require('./db');
const client = require('./redisClient');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;

/* ---------------- SOCKET CONNECTION ---------------- */
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
});

/* ---------------- CREATE ACTIVITY ---------------- */
app.post('/api/activity', async (req, res) => {
    const activity = await Activity.create({
        ...req.body,
        availableSlots: req.body.totalSlots
    });

    await client.del('activities'); // invalidate cache

    res.json(activity);
});

/* ---------------- GET ACTIVITIES (CACHE) ---------------- */
app.get('/api/activities', async (req, res) => {
    const cached = await client.get('activities');

    if (cached) {
        console.log('Cache HIT');
        return res.json(JSON.parse(cached));
    }

    console.log('Cache MISS');

    const activities = await Activity.find();

    await client.setEx('activities', 60, JSON.stringify(activities));

    res.json(activities);
});

/* ---------------- REGISTER USER (RACE CONDITION SAFE) ---------------- */
app.post('/api/register/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Atomic operation → prevents race condition
        const activity = await Activity.findOneAndUpdate(
            { _id: id, availableSlots: { $gt: 0 } },
            { $inc: { availableSlots: -1 } },
            { new: true }
        );

        if (!activity) {
            return res.status(400).json({ message: 'No slots available' });
        }

        // Invalidate cache
        await client.del('activities');

        // Emit real-time update
        io.emit('userJoined', {
            activityId: id,
            remainingSlots: activity.availableSlots
        });

        // Worker thread for heavy task
        const worker = new Worker('./worker.js', {
            workerData: { userId: req.body.userId }
        });

        worker.on('message', msg => {
            console.log(msg);
        });

        res.json({
            success: true,
            remainingSlots: activity.availableSlots
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- START SERVER ---------------- */
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});