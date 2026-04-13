const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import files
const User = require('./models/User');
const auth = require('./middleware/auth');

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* =========================
   1. REGISTER ROUTE
========================= */
app.post('/register', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // DEBUG

    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ username, email, password });
    await user.save();

    res.json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err.message); // IMPORTANT
    res.status(500).send(err.message);
  }
});
/* =========================
   2. LOGIN ROUTE (GET JWT)
========================= */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3. Create JWT
    const payload = {
      id: user._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

/* =========================
   3. PROTECTED ROUTE
========================= */
app.get('/dashboard', auth, (req, res) => {
  res.send("Welcome to the Private Dashboard");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));