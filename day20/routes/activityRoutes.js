const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities
 *     description: Fetch list of activities
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/activities', (req, res) => {
  res.json([
    { id: 1, name: 'Hackathon' },
    { id: 2, name: 'Chess Club' },
  ]);
});

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create new activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Coding Contest
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/activities', (req, res) => {
  const { name } = req.body;

  res.status(201).json({
    id: Date.now(),
    name,
  });
});

module.exports = router;