const Budget = require('../models/Budget');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findOne({
      where: { userId: req.user.id }
    });
    
    if (!budget) {
      throw new AppError('Budget not found', 404);
    }

    res.json(budget);
  } catch (error) {
    next(error);
  }
};

const createBudget = async (req, res, next) => {
  try {
    const { tuitionFee, livingExpenses, travelCost } = req.body;
    
    const budget = await Budget.create({
      userId: req.user.id,
      tuitionFee,
      livingExpenses,
      travelCost
    });

    logger.info('Budget created', { userId: req.user.id });
    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBudget,
  createBudget
};