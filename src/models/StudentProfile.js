const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StudentProfile = sequelize.define('StudentProfile', {
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
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  academicBackground: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fieldOfInterest: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  preferredCountries: {
    type: DataTypes.JSON,
    defaultValue: []
  }
});

module.exports = StudentProfile;