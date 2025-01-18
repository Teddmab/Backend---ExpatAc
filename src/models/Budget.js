const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Budget = sequelize.define('Budget', {
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
  tuitionFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  livingExpenses: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  travelCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Budget;