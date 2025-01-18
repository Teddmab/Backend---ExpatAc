const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * /api/payment/initiate:
 *   post:
 *     summary: Initiate a payment transaction
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 * 
 * /api/payment/status/{id}:
 *   get:
 *     summary: Get payment transaction status
 *     tags: [Payments]
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
 *         description: Transaction status retrieved
 * 
 * /api/payment/refund/{id}:
 *   post:
 *     summary: Initiate a refund
 *     tags: [Payments]
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
 *         description: Refund initiated successfully
 */

router.post('/initiate', auth, paymentController.initiatePayment);
router.get('/status/:id', auth, paymentController.getTransactionStatus);
router.post('/refund/:id', auth, paymentController.initiateRefund);
router.post('/callback', paymentController.handleCallback);

module.exports = router;