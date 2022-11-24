const { Roll, Employee } = require('../db');

module.exports = {
  getOperarios: async () => Employee.findAll({
    include: Roll,
  }),
};
