const { Color } = require('../db');

module.exports = {
  getColors: async () => Color.findAll(),
};
