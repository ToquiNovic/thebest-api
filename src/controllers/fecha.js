const { Fecha, Factura, Motorcycle } = require('../db');

module.exports = {
  getFecha: async () => {
    const dateNow = new Date();

    const date = await Fecha.findOne({
      where: {
        date: dateNow.toLocaleDateString('es-CO'),
      },
    });

    if (!date) {
      return Fecha.create({ date: dateNow.toLocaleDateString('es-CO') });
    }

    return date;
  },
  getFechaFacturas: async () => {
    const dateNow = new Date();

    const date = await Fecha.findOne({
      where: {
        date: dateNow.toLocaleDateString('es-CO'),
      },
      include: [
        {
          model: Factura,
          required: false,
          attributes: ['id', 'isPaid'],
          include: [
            {
              model: Motorcycle,
              required: false,
              attributes: ['id', 'plaque', 'isActive'],
            },
          ],
        },
      ],
    });

    return date;
  },
};
