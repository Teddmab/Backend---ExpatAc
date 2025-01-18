const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visaController');

/**
 * @swagger
 * /api/visa/status:
 *   get:
 *     summary: Get visa application status
 *     tags: [Visa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Visa application status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisaApplication'
 * 
 * /api/visa:
 *   post:
 *     summary: Create new visa application
 *     tags: [Visa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *             properties:
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visa application created successfully
 */

router.get('/status', visaController.getVisaStatus);
router.post('/', visaController.createVisaApplication);

/**
 * @swagger
 * components:
 *   schemas:
 *     VisaApplication:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         country:
 *           type: string
 *         applicationDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 */

module.exports = router;