const employee = require('./employee');
const roll = require('./roll');

module.exports = (sequelize) => {
  employee(sequelize);
  roll(sequelize);
};
