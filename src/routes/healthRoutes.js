const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/db');
const logger = require('../utils/logger');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check system health
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 database:
 *                   type: string
 *                 uptime:
 *                   type: number
 */
router.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    
    res.json({
      status: 'healthy',
      database: 'connected',
      uptime: process.uptime()
    });

    logger.info('Health check performed successfully');
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      uptime: process.uptime()
    });
  }
});

module.exports = router;