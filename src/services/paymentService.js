const axios = require('axios');

class PaymentService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.PAWAPAY_API_URL,
      headers: {
        Authorization: `Bearer ${process.env.PAWAPAY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async initiatePayment(amount, currency, reference) {
    try {
      const response = await this.api.post('/deposits', {
        amount,
        currency,
        reference,
        callback_url: `${process.env.API_URL}/api/payments/callback`
      });
      return response.data;
    } catch (error) {
      throw new Error('Payment initiation failed');
    }
  }

  async processRefund(transactionId, amount) {
    try {
      const response = await this.api.post('/refunds', {
        transaction_id: transactionId,
        amount
      });
      return response.data;
    } catch (error) {
      throw new Error('Refund processing failed');
    }
  }
}

module.exports = new PaymentService();