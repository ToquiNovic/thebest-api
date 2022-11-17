const employee = require('./employee');
const roll = require('./roll');
const brand = require('./brand');
const color = require('./color');

module.exports = (sequelize) => {
  employee(sequelize);
  roll(sequelize);
  brand(sequelize);
  color(sequelize);
};
