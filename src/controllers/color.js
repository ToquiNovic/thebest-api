const { Color, Motorcycle } = require('../db');

module.exports = {
  getColors: async () => Color.findAll(),
  getColorsIncludeMotos: async () => Color.findAll({ include: Motorcycle }),
  getColorByID: async (id) => Color.findByPk(id),
  getColorIncludeMoto: async (id) => Color.findByPk(id, { include: Motorcycle }),
  addColor: async ({ color }) => Color.create({ color }),
};
