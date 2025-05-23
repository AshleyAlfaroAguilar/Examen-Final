const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
