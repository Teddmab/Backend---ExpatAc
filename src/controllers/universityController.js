const University = require('../models/University');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getUniversities = async (req, res, next) => {
  try {
    const { location, tuitionFee, fieldOfStudy } = req.query;
    const where = {};
    
    if (location) where.location = location;
    if (tuitionFee) where.tuitionFee = { [Op.lte]: tuitionFee };
    
    const universities = await University.findAll({ where });
    res.json(universities);
  } catch (error) {
    next(error);
  }
};

const getUniversity = async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (!university) {
      throw new AppError('University not found', 404);
    }
    res.json(university);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUniversities,
  getUniversity
};