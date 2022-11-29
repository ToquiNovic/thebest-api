const { Roll, Employee } = require('../db');

module.exports = {
  getAuxiliares: async () => Roll.findOne({
    where: {
      role: 'AUXIL',
    },
    include: [Employee],
  }),
};
