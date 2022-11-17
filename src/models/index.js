const employee = require('./employee');
const roll = require('./roll');
const brand = require('./brand');
const color = require('./color');
const motorcycle = require('./motorcycle');
const person = require('./person');

module.exports = (sequelize) => {
  person(sequelize);
  motorcycle(sequelize);
  employee(sequelize);
  roll(sequelize);
  brand(sequelize);
  color(sequelize);
};
