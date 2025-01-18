const Document = require('../models/Document');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.findAll({
      where: { userId: req.user.id }
    });
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const document = await Document.findOne({
      where: { id, userId: req.user.id }
    });
    
    if (!document) {
      throw new AppError('Document not found', 404);
    }
    
    document.status = status;
    await document.save();
    
    logger.info('Document status updated', { documentId: id, status });
    res.json(document);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDocuments,
  updateDocument
};