const { Brand } = require('../db');

module.exports = {
  getBrands: async () => Brand.findAll(),
};
