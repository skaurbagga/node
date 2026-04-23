const express = require('express');

const app = express();
const PORT = 3000;

/* ---------------- SAMPLE DATA ---------------- */
const activities = [
    { id: 1, name: 'Hackathon' },
    { id: 2, name: 'Workshop' },
    { id: 3, name: 'Seminar' }
];

/* ---------------- ROUTE TO TEST ---------------- */
/*app.get('/api/activities', async (req, res) => {
    // Simulate small delay (real-world DB/API)
    await new Promise(resolve => setTimeout(resolve, 100));

    res.json({
        success: true,
        data: activities
    });
});*/


//To see error
app.get('/api/activities', (req, res) => {
    console.log('Request received');

    let sum = 0;
    for (let i = 0; i < 1e8; i++) {
        sum += i;
    }

    res.json({ success: true, sum });
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});