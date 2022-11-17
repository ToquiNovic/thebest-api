const { Roll } = require('../db');

module.exports = {
  getRoles: async () => Roll.findAll(),
};
