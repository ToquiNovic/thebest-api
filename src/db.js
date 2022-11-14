const { Sequelize } = require('sequelize');
const models = require('./models');
const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = require('./config');
const logger = require('./utils/logger');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate().then(() => {
  logger.inf('Coneccion establecida con exito a la base de datos!');
  models(sequelize);
}).catch((error) => {
  logger.err('Error al conectarse a la base de datos: ', error);
});

module.exports = sequelize;
