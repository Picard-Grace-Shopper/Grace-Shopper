const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  pokemon_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.kym-cdn.com/photos/images/facebook/000/879/453/52c.png',
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: true,
    },
  },
});

module.exports = Product;
