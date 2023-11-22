const Sequelize = require ('sequelize')

const sequelize = require('../util/database')

const Supplier = sequelize.define('supplier', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contactInfo: {
    type: Sequelize.STRING,
    allowNull: false
  }
}) 

module.exports = Supplier
