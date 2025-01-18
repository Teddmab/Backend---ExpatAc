const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

/**
 * @swagger
 * /api/budget:
 *   get:
 *     summary: Get user's budget
 *     tags: [Budget]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's budget details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Budget'
 *   post:
 *     summary: Create a new budget
 *     tags: [Budget]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tuitionFee
 *               - livingExpenses
 *               - travelCost
 *             properties:
 *               tuitionFee:
 *                 type: number
 *               livingExpenses:
 *                 type: number
 *               travelCost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Budget created successfully
 */

router.get('/', budgetController.getBudget);
router.post('/', budgetController.createBudget);

/**
 * @swagger
 * components:
 *   schemas:
 *     Budget:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         tuitionFee:
 *           type: number
 *         livingExpenses:
 *           type: number
 *         travelCost:
 *           type: number
 */

module.exports = router;