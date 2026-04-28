const express = require('express');
const client = require('./redisClient');

const app = express();
const PORT = 3000;

/* ---------------- FAKE DATABASE ---------------- */
const fakeDB = [
    { id: 1, name: 'Hackathon' },
    { id: 2, name: 'Chess Tournament' },
    { id: 3, name: 'Coding Contest' }
];

/* ---------------- ROUTE WITH CACHING ---------------- */
app.get('/api/activities', async (req, res) => {
    const cacheKey = 'popular_activities';

    try {
        // 1. CHECK REDIS (Cache Hit)
        const cachedData = await client.get(cacheKey);

        if (cachedData) {
            console.log('Cache HIT');
            return res.json(JSON.parse(cachedData));
        }

        // 2. CACHE MISS → Simulate slow DB
        console.log('Cache MISS → Fetching from DB...');

        await new Promise(r => setTimeout(r, 200)); // simulate DB delay

        const data = fakeDB;

        // 3. SAVE TO REDIS (TTL = 60 sec)
        await client.setEx(cacheKey, 60, JSON.stringify(data));

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});


/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});