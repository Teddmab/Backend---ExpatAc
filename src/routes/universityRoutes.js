const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

/**
 * @swagger
 * /api/universities:
 *   get:
 *     summary: Get list of universities
 *     tags: [Universities]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *       - in: query
 *         name: tuitionFee
 *         schema:
 *           type: number
 *         description: Maximum tuition fee
 *     responses:
 *       200:
 *         description: List of universities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/University'
 */
router.get('/', universityController.getUniversities);

/**
 * @swagger
 * /api/universities/{id}:
 *   get:
 *     summary: Get university by ID
 *     tags: [Universities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: University ID
 *     responses:
 *       200:
 *         description: University details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/University'
 *       404:
 *         description: University not found
 */
router.get('/:id', universityController.getUniversity);

/**
 * @swagger
 * components:
 *   schemas:
 *     University:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         tuitionFee:
 *           type: number
 *         degreeType:
 *           type: string
 *           enum: [Bachelor, Master]
 *         languageOfInstruction:
 *           type: string
 */

module.exports = router;