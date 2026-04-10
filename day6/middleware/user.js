const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 🔒 Protected Route
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        res.json({
            msg: "Profile accessed",
            userId: req.user.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;