const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const VisaApplication = sequelize.define('VisaApplication', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
});

module.exports = VisaApplication;