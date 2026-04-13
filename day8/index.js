require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());

connectDB();

app.post('/user', async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
});

app.post('/post', async (req, res) => {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.json(savedPost);
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ msg: "User registered" });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

const Post = require('./models/Post');

app.post('/api/posts', auth, async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        });

        const post = await newPost.save();
        res.status(201).json(post);

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.get('/', (req, res) => {
    res.send("Day 8 Server Running");
});

app.get('/protected', auth, (req, res) => {
    res.json({
        msg: "Protected route accessed",
        user: req.user
    });
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', ['username', 'email']);
        res.json(posts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});