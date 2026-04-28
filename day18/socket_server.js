/*const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// ---------------- BASIC ROUTE ---------------- 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});


// ---------------- SOCKET CONNECTION ---------------- 
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // 1. Listen for join event
    socket.on('join_activity', (data) => {
        console.log(`User joined activity: ${data.activityName}`);

        // 2. Broadcast to others (not sender)
        socket.broadcast.emit('new_participant', {
            message: `A new user has joined ${data.activityName}!`
        });
    });

    // 3. Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


// ---------------- START SERVER ---------------- 
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

/* ---------------- ROUTE ---------------- */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});


/* ---------------- SOCKET LOGIC ---------------- */
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    /* -------- JOIN ROOM -------- */
    socket.on('subscribe_to_event', (eventId) => {
        socket.join(eventId);

        console.log(`Socket ${socket.id} joined room: ${eventId}`);

        // Send message ONLY to that room
        io.to(eventId).emit('notification',
            `Live update for Event ${eventId}: The organizer has arrived!`
        );
    });

    /* -------- DISCONNECT -------- */
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


/* ---------------- START SERVER ---------------- */
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});