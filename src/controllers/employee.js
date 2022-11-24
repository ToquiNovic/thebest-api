const { Roll, Employee } = require('../db');

module.exports = {
  getAllEmployee: async (idRoll) => Roll.findByPk(idRoll, { include: Employee }),
};
