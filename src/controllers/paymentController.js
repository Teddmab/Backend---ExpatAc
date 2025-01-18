const PaymentService = require('../services/paymentService');
const Transaction = require('../models/Transaction');
const logger = require('../utils/logger');

const initiatePayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const reference = `PAY-${Date.now()}-${req.user.id}`;

    const payment = await PaymentService.initiatePayment(amount, currency, reference);
    
    await Transaction.create({
      userId: req.user.id,
      amount,
      currency,
      reference,
      status: 'pending'
    });

    logger.info('Payment initiated', { userId: req.user.id, reference });
    res.json(payment);
  } catch (error) {
    logger.error('Payment initiation failed', { error: error.message });
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

const getTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    logger.error('Transaction status fetch failed', { error: error.message });
    res.status(500).json({ error: 'Failed to fetch transaction status' });
  }
};

const initiateRefund = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!transaction || transaction.status !== 'completed') {
      return res.status(400).json({ error: 'Invalid transaction for refund' });
    }

    const refund = await PaymentService.processRefund(transaction.id, transaction.amount);
    
    transaction.status = 'refunded';
    await transaction.save();

    logger.info('Refund initiated', { transactionId: transaction.id });
    res.json(refund);
  } catch (error) {
    logger.error('Refund initiation failed', { error: error.message });
    res.status(500).json({ error: 'Failed to initiate refund' });
  }
};

const handleCallback = async (req, res) => {
  try {
    const { reference, status } = req.body;
    
    const transaction = await Transaction.findOne({
      where: { reference }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    transaction.status = status;
    await transaction.save();

    logger.info('Payment callback processed', { reference, status });
    res.json({ message: 'Callback processed successfully' });
  } catch (error) {
    logger.error('Payment callback processing failed', { error: error.message });
    res.status(500).json({ error: 'Failed to process payment callback' });
  }
};

module.exports = {
  initiatePayment,
  getTransactionStatus,
  initiateRefund,
  handleCallback
};