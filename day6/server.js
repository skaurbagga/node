const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.send("Server Running");
});


// ✅ REGISTER ROUTE (Password gets hashed automatically)
app.post('/register', async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ username, email, password });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});


/*// ✅ LOGIN ROUTE (Password comparison)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/

require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
