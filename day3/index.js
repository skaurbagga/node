/*const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("Server running");
});

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});*/

const express = require('express');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

const users = [
    { id: 1, name: "Alice", status: "Active" },
    { id: 2, name: "Bob", status: "Away" },
    { id: 3, name: "Charlie", status: "Offline" }
];

app.get('/about', (req, res) => {
    res.send('This is the About API — Backend logic is active.');
});

app.get('/user', (req, res) => {
    res.json({
        name: "Sahaj",
        age: 22,
        role: "Developer"
    });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});