const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
  'agenda_servicos',
  'root',
  'Michel123',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  } 
);

module.exports = sequelize;










