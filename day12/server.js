/*const express = require('express');
const User = require('./db');
const redis = require('./redisClient');

const app = express();
app.use(express.json());

const PORT = 5000;

// CREATE USER (for testing)
app.post('/api/user', async (req, res) => {
    const user = await User.create(req.body);

    res.json({
        success: true,
        data: user
    });
});


// CACHE-ASIDE IMPLEMENTATION
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // 1. Check Redis (Cache)
        const cachedUser = await redis.get(userId);

        if (cachedUser) {
            console.log('Cache HIT');
            return res.json({
                source: 'cache',
                data: JSON.parse(cachedUser)
            });
        }

        // 2. Cache Miss → Fetch from MongoDB
        console.log('Cache MISS');

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 3. Store in Redis (Cache)
        await redis.set(userId, JSON.stringify(user), 'EX', 60); // expires in 60 sec

        // 4. Return Response
        res.json({
            source: 'database',
            data: user
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE USER (Important for cache invalidation)
app.put('/api/user/:id', async (req, res) => {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        req.body,
        { new: true }
    );

    // Remove old cache
    await redis.del(userId);

    res.json({
        success: true,
        data: updatedUser
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/

/*const express = require('express');
const Post = require('./db');
const client = require('./redisClient');

const app = express();
app.use(express.json());

const PORT = 5000;

app.post('/api/posts', async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.json({
            success: true,
            data: post
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Check Redis
        const cachedPost = await client.get(id);

        if (cachedPost) {
            console.log('Cache HIT');
            return res.json({
                source: 'cache',
                data: JSON.parse(cachedPost)
            });
        }

        // 2. Fetch from MongoDB
        console.log('Cache MISS');
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // 3. Store in Redis (TTL = 1 hour)
        await client.setEx(id, 3600, JSON.stringify(post));

        // 4. Return response
        res.json({
            source: 'database',
            data: post
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});


app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        // Delete cache
        await client.del(id);

        res.json({
            success: true,
            data: updatedPost
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/


const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
app.use(express.json());

const PORT = 5000;

/* ---------------- MONGODB CONNECTION ---------------- */
mongoose.connect('mongodb://127.0.0.1:27017/cacheDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

/* ---------------- MODEL ---------------- */
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

/* ---------------- REDIS CLIENT ---------------- */
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.error('Redis Error:', err));

(async () => {
    await client.connect();
    console.log('Redis Connected');
})();

/* ---------------- CREATE POST ---------------- */
app.post('/api/posts', async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.json({
            success: true,
            data: post
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- GET POST (CACHE-ASIDE) ---------------- */
app.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Check Redis
        const cachedPost = await client.get(id);

        if (cachedPost) {
            console.log('Cache HIT');
            return res.json({
                source: 'cache',
                data: JSON.parse(cachedPost)
            });
        }

        // 2. Fetch from MongoDB
        console.log('Cache MISS');
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // 3. Store in Redis (TTL = 1 hour)
        await client.setEx(id, 3600, JSON.stringify(post));

        res.json({
            source: 'database',
            data: post
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

/* ---------------- UPDATE POST (CACHE INVALIDATION) ---------------- */
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // 🔥 CRITICAL: Delete old cache
        await client.del(id);

        console.log('Cache invalidated');

        res.json({
            success: true,
            data: post
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});