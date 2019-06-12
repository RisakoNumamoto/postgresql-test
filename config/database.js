const Sequelize = require('sequelize');


module.exports = new Sequelize('GearUp', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});
