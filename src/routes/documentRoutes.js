const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get user's documents
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 * 
 * /api/documents/{id}:
 *   put:
 *     summary: Update document status
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Document updated successfully
 */

router.get('/', documentController.getDocuments);
router.put('/:id', documentController.updateDocument);

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, completed]
 */

module.exports = router;