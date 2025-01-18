const Timeline = require('../models/Timeline');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getTimeline = async (req, res, next) => {
  try {
    const timeline = await Timeline.findAll({
      where: { userId: req.user.id },
      order: [['deadline', 'ASC']]
    });
    res.json(timeline);
  } catch (error) {
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    
    if (progress < 0 || progress > 100) {
      throw new AppError('Progress must be between 0 and 100', 400);
    }
    
    const milestone = await Timeline.findOne({
      where: { id, userId: req.user.id }
    });
    
    if (!milestone) {
      throw new AppError('Milestone not found', 404);
    }
    
    milestone.progress = progress;
    await milestone.save();
    
    logger.info('Timeline progress updated', { milestoneId: id, progress });
    res.json(milestone);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTimeline,
  updateProgress
};