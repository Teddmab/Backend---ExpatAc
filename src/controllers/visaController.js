const VisaApplication = require('../models/VisaApplication');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getVisaStatus = async (req, res, next) => {
  try {
    const visaApplication = await VisaApplication.findOne({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    if (!visaApplication) {
      throw new AppError('No visa application found', 404);
    }
    
    res.json(visaApplication);
  } catch (error) {
    next(error);
  }
};

const createVisaApplication = async (req, res, next) => {
  try {
    const { country } = req.body;
    
    if (!country) {
      throw new AppError('Country is required', 400);
    }
    
    const visaApplication = await VisaApplication.create({
      userId: req.user.id,
      country,
      applicationDate: new Date()
    });

    logger.info('Visa application created', { 
      userId: req.user.id, 
      country 
    });
    
    res.status(201).json(visaApplication);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVisaStatus,
  createVisaApplication
};