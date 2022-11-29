const {
  Factura, Motorcycle, Combo,
} = require('../db');

module.exports = {
  createFactura: async (factura) => Factura.create(factura),
  getFacturaMotoCombo: async (id) => Factura.findByPk(id, { include: [Motorcycle, Combo] }),
};
