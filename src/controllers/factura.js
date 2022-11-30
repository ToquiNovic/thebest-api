const {
  Factura, Motorcycle, Combo, Employee,
} = require('../db');

module.exports = {
  createFactura: async (factura) => Factura.create(factura),
  getFacturaMotoCombo: async (id) => Factura.findByPk(id, {
    attributes: ['isPaid', 'id'],
    include: [
      { model: Employee, required: false, attributes: ['names'] },
      { model: Motorcycle, required: false, attributes: ['plaque'] },
      { model: Combo, required: false, attributes: ['name', 'price', 'description'] },
    ],
  }),
};
