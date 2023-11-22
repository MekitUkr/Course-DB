const Sequelize = require('sequelize')

const sequelize = new Sequelize('course-work', 'root', 'rootroot', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize
