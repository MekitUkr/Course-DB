const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true
  },
  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Order
