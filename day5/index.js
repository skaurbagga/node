console.log("THIS FILE IS RUNNING");
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

app.use(express.json());

connectDB();

// ✅ TEST ROUTE (add this first)
app.get('/', (req, res) => {
    res.send("Server working");
});

// ✅ POST ROUTE
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        return res.status(201).json(savedUser); // ✅ ADD return

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// app.use((req, res) => {
//    res.send("Catch All Route Hit");
//});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});