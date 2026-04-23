/*const express = require('express');
const rateLimiter = require('./rateLimiter');

const app = express();
const PORT = 5000;

// ---------------- PROTECTED ROUTE ---------------- 
app.get('/api/test', rateLimiter, (req, res) => {
    res.json({ message: 'Request successful' });
});

// ---------------- NORMAL ROUTE ---------------- 
app.get('/', (req, res) => {
    res.send('Server Running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/

/*const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

const PORT = 5000;

// ---------------- GLOBAL API LIMIT ---------------- 
// 10 requests per 1 minutes
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply to all /api routes
app.use('/api/', apiLimiter);


// ---------------- STRICT LOGIN LIMIT ---------------- 
// 5 requests per 1 hour
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: 'Too many login attempts. Account locked for 1 hour.'
});

// Apply only to login route
app.use('/api/auth/login', loginLimiter);


// ---------------- TEST ROUTES ---------------- 

// Normal API
app.get('/api/test', (req, res) => {
    res.json({ message: 'API working' });
});

// Login route (protected strictly)
app.post('/api/auth/login', (req, res) => {
    res.json({ message: 'Login attempt recorded' });
});

// Home
app.get('/', (req, res) => {
    res.send('Server Running');
});


// ---------------- SERVER ---------------- 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
app.use(express.json());

const PORT = 5000;

/* ---------------- HELMET (SECURITY HEADERS) ---------------- */
// Must be used early
app.use(helmet());


/* ---------------- RATE LIMITERS ---------------- */

// Global API limiter
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

//app.use('/api/', apiLimiter);


// Strict login limiter
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Account locked for 1 hour.'
});

app.use('/api/auth/login', loginLimiter);


/* ---------------- ROUTES ---------------- */

app.get('/', (req, res) => {
    res.send('Server Running Securely');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Secure API working' });
});

app.post('/api/auth/login', (req, res) => {
    res.json({ message: 'Login attempt recorded' });
});


/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});