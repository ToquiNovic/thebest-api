const { Roll, Employee } = require('../db');

module.exports = {
  getRoles: async () => Roll.findAll(),
  getEmployeesRoll: async (id) => Roll.findByPk(id, { include: Employee }),
};
