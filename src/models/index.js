const employee = require('./employee');
const roll = require('./roll');
const brand = require('./brand');
const color = require('./color');
const motorcycle = require('./motorcycle');
const person = require('./person');
const combo = require('./combo');
const team = require('./team');
const factura = require('./factura');
const fecha = require('./fecha');

module.exports = (sequelize) => {
  person(sequelize);
  motorcycle(sequelize);
  employee(sequelize);
  roll(sequelize);
  brand(sequelize);
  color(sequelize);
  combo(sequelize);
  team(sequelize);
  factura(sequelize);
  fecha(sequelize);
};
