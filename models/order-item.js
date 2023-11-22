const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: Sequelize.INTEGER
})

module.exports = OrderItem
