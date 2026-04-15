/*const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// 🔥 Wrap Express inside HTTP server
const server = http.createServer(app);

// 🔥 Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// 🔥 Socket connection
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Listen for message event
    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Broadcast to all users
        io.emit('message_broadcast', data);
    });

    // On disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Basic route
app.get('/', (req, res) => {
    res.send("Socket Server Running");
});

// Start server
server.listen(5000, () => {
    console.log('Server running on port 5000');
});*/

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

mongoose.connect('mongodb://localhost:27017/day10_db')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("No token, Unauthorized"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user data to socket
        socket.user = decoded.user;

        next();
    } catch (err) {
        next(new Error("Unauthorized"));
    }
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

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });

    } catch (err) {
        res.status(500).send("Error");
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ msg: "User registered" });

    } catch (err) {
        res.status(500).send("Error");
    }
});

// 🔥 SOCKET LOGIC WITH ROOMS
/*io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // ✅ JOIN ROOM
    socket.on('join_activity', (activityId) => {
        socket.join(activityId);
        console.log(`User joined room: ${activityId}`);
    });

    // ✅ SEND MESSAGE TO ROOM ONLY
    socket.on('send_activity_chat', (data) => {
        console.log(`Message in room ${data.activityId}: ${data.message}`);

        io.to(data.activityId).emit('new_chat', data.message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});*/

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    console.log(`User ID from token: ${socket.user.id}`);

    socket.on('join_activity', (activityId) => {
        socket.join(activityId);
        console.log(`User joined room: ${activityId}`);
    });

    socket.on('send_activity_chat', (data) => {
        io.to(data.activityId).emit('new_chat', {
            message: data.message,
            user: socket.user.id // 🔥 who sent it
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req, res) => {
    res.send("Room Server Running");
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
});