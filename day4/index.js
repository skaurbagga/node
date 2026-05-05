const express = require('express');
require('dotenv').config(); // Load variables from .env

const app = express();

// Import controller
const userController = require('./controllers/userController');

const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;

app.get('/status', (req, res) => {
  res.json({
    message: "System Online",
    environment_port: port,
    auth_status: apiKey ? "Securely Loaded" : "Missing Key"
  });
});

// New route using controller
app.get('/api/users', userController.getUsers);

app.use(express.json());

app.post('/api/register', (req, res) => {
  console.log("req.body:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password are required!" });
  }

  res.status(201).json({
    message: "User Registered Successfully",
    user: username
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));