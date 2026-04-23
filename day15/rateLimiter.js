const client = require('./redisClient');

const BUCKET_SIZE = 5;        // max requests
const LEAK_RATE = 1;          // per second

module.exports = async (req, res, next) => {
    const ip = req.ip;
    const key = `bucket:${ip}`;

    try {
        let bucket = await client.get(key);

        if (!bucket) {
            bucket = {
                tokens: 0,
                lastLeak: Date.now()
            };
        } else {
            bucket = JSON.parse(bucket);
        }

        const now = Date.now();

        // Calculate leaked tokens
        const elapsed = (now - bucket.lastLeak) / 1000;
        const leaked = Math.floor(elapsed * LEAK_RATE);

        bucket.tokens = Math.max(0, bucket.tokens - leaked);
        bucket.lastLeak = now;

        // Add new request
        bucket.tokens += 1;

        if (bucket.tokens > BUCKET_SIZE) {
            return res.status(429).json({
                error: 'Too Many Requests'
            });
        }

        // Save updated bucket
        await client.set(key, JSON.stringify(bucket), {
            EX: 60
        });

        next();

    } catch (err) {
        res.status(500).json({ error: 'Rate limiter error' });
    }
};