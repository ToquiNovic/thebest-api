const {
  Factura, Motorcycle, Combo, Employee, Fecha,
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
  getGanaciasTotales: async () => {
    const fechas = await Fecha.findAll({ include: [{ model: Factura, required: false, attributes: ['total', 'paymentMethod'] }] });

    return fechas.map(({ dataValues }) => {
      const info = {
        Nequi: 0,
        Efectivo: 0,
        total: 0,
      };
      dataValues.Facturas.forEach(({ total, paymentMethod }) => {
        const tot = +total;
        if (paymentMethod === 'Nequi') {
          info.Nequi += tot;
        } else {
          info.Efectivo += tot;
        }
        info.total += tot;
      });

      return ({ id: dataValues.id, date: dataValues.date, detail: info });
    });
  },
};
