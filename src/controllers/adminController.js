const User = require('../models/User');
const University = require('../models/University');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errorHandler');

const getAnalytics = async (req, res, next) => {
  try {
    const userCount = await User.count();
    const studentCount = await User.count({ where: { role: 'student' } });
    const universityCount = await University.count();

    res.json({
      totalUsers: userCount,
      totalStudents: studentCount,
      totalUniversities: universityCount
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    
    if (!result) {
      throw new AppError('User not found', 404);
    }
    
    logger.info('User deleted', { userId: id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const addUniversity = async (req, res, next) => {
  try {
    const university = await University.create(req.body);
    logger.info('University added', { universityId: university.id });
    res.status(201).json(university);
  } catch (error) {
    next(error);
  }
};

const updateUniversity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await University.update(req.body, { 
      where: { id } 
    });
    
    if (!updated) {
      throw new AppError('University not found', 404);
    }
    
    const university = await University.findByPk(id);
    logger.info('University updated', { universityId: id });
    res.json(university);
  } catch (error) {
    next(error);
  }
};

const deleteUniversity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await University.destroy({ where: { id } });
    
    if (!result) {
      throw new AppError('University not found', 404);
    }
    
    logger.info('University deleted', { universityId: id });
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics,
  getUsers,
  deleteUser,
  addUniversity,
  updateUniversity,
  deleteUniversity
};