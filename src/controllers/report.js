const {
  Fecha, Factura, Combo, Motorcycle,
} = require('../db');

module.exports = {
  getAllDates: async () => Fecha.findAll(),
  getDetailDate: async (id) => {
    const data = await Fecha.findByPk(id, {
      include: [
        {
          model: Factura,
          required: false,
          attributes: ['id', 'total', 'isPaid'],
          include: [
            { model: Combo, required: false, attributes: ['id', 'name'] },
            {
              model: Motorcycle,
              required: false,
              attributes: ['id', 'plaque'],
            },
          ],
        },
      ],
    });
    return data;
  },
};
