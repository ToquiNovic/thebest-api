const { Roll } = require('../db');

module.exports = {
  getRoles: async () => Roll.findAll(),
  getRolesMenores: async () => {
    const roles = await Roll.findAll();
    return roles.filter(({ role }) => role !== 'ADMIN');
  },
};
