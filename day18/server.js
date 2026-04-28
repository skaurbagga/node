const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Attach Socket.IO to HTTP server
const io = new Server(server);

const PORT = 3000;

/* ---------------- HTTP ROUTE ---------------- */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});


/* ---------------- WEBSOCKET CONNECTION ---------------- */
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send welcome message
    socket.emit('message', 'Welcome to MeetMux Chat');

    // Listen for client messages
    socket.on('sendMessage', (data) => {
        console.log('Message received:', data);

        // Broadcast to ALL clients
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


/* ---------------- SERVER ---------------- */
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});