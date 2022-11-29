const { Factura } = require('../db');

module.exports = {
  createFactura: async (factura) => Factura.create(factura),
};
