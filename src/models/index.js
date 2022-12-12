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
const product = require('./Producto');
const drawout = require('./drawout');
const drawoutproduct = require('./drawoutproduct');

module.exports = (sequelize) => {
  drawoutproduct(sequelize);
  drawout(sequelize);
  product(sequelize);
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
