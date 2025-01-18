const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

/**
 * @swagger
 * /api/timeline:
 *   get:
 *     summary: Get user's timeline
 *     tags: [Timeline]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of timeline milestones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Timeline'
 * 
 * /api/timeline/{id}/progress:
 *   put:
 *     summary: Update milestone progress
 *     tags: [Timeline]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Milestone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - progress
 *             properties:
 *               progress:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       200:
 *         description: Progress updated successfully
 */

router.get('/', timelineController.getTimeline);
router.put('/:id/progress', timelineController.updateProgress);

/**
 * @swagger
 * components:
 *   schemas:
 *     Timeline:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         milestone:
 *           type: string
 *         deadline:
 *           type: string
 *           format: date-time
 *         progress:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 */

module.exports = router;