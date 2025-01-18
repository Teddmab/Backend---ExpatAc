const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get system analytics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 * 
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 * 
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 * 
 * /api/admin/universities:
 *   post:
 *     summary: Add a new university
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       201:
 *         description: University added successfully
 * 
 * /api/admin/universities/{id}:
 *   put:
 *     summary: Update university details
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       200:
 *         description: University updated successfully
 *   delete:
 *     summary: Delete a university
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: University deleted successfully
 */

router.get('/analytics', adminAuth, adminController.getAnalytics);
router.get('/users', adminAuth, adminController.getUsers);
router.delete('/users/:id', adminAuth, adminController.deleteUser);
router.post('/universities', adminAuth, adminController.addUniversity);
router.put('/universities/:id', adminAuth, adminController.updateUniversity);
router.delete('/universities/:id', adminAuth, adminController.deleteUniversity);

module.exports = router;