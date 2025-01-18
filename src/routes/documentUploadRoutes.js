const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const logger = require('../utils/logger');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Upload a document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               documentType:
 *                 type: string
 *                 enum: [passport, transcript, certificate]
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *       400:
 *         description: Invalid file type or size
 */
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    logger.info('Document uploaded', {
      userId: req.user.id,
      filename: req.file.filename,
      type: req.body.documentType
    });

    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    logger.error('Document upload failed', {
      userId: req.user.id,
      error: error.message
    });
    res.status(500).json({ error: 'File upload failed' });
  }
});