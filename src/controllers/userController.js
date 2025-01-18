const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errorHandler');

const getProfile = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({
      where: { userId: req.user.id },
      include: [{
        model: User,
        attributes: ['name', 'email', 'role']
      }]
    });

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { 
      name, 
      nationality, 
      academicBackground, 
      fieldOfInterest, 
      budget, 
      preferredCountries 
    } = req.body;

    const [profile] = await StudentProfile.upsert({
      userId: req.user.id,
      nationality,
      academicBackground,
      fieldOfInterest,
      budget,
      preferredCountries
    });

    if (name) {
      await User.update({ name }, { 
        where: { id: req.user.id } 
      });
    }

    logger.info('Profile updated', { userId: req.user.id });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};