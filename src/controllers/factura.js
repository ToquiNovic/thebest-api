const { Factura } = require('../db');

module.exports = {
  addFactura: async (factura) => (await Factura.create(factura)).dataValues,
};
