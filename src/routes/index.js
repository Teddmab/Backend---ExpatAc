const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const universityRoutes = require('./universityRoutes');
const documentRoutes = require('./documentRoutes');
const documentUploadRoutes = require('./documentUploadRoutes');
const timelineRoutes = require('./timelineRoutes');
const visaRoutes = require('./visaRoutes');
const budgetRoutes = require('./budgetRoutes');
const paymentRoutes = require('./paymentRoutes');
const healthRoutes = require('./healthRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminAuth, adminRoutes);
router.use('/universities', universityRoutes);
router.use('/documents', auth, [documentRoutes, documentUploadRoutes]);
router.use('/timeline', auth, timelineRoutes);
router.use('/visa', auth, visaRoutes);
router.use('/budget', auth, budgetRoutes);
router.use('/payment', paymentRoutes);
router.use('/health', healthRoutes);

module.exports = router;