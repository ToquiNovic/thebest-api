const { Color, Motorcycle } = require('../db');

module.exports = {
  getColors: async () => Color.findAll({ include: Motorcycle }),
};
