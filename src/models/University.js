const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const University = sequelize.define('University', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tuitionFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  degreeType: {
    type: DataTypes.ENUM('Bachelor', 'Master'),
    allowNull: false
  },
  languageOfInstruction: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = University;