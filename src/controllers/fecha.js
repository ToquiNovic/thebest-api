const moment = require('moment-timezone');
const {
  Fecha, Factura, Motorcycle, Employee,
} = require('../db');

module.exports = {
  getFecha: async () => {
    const dateNow = moment.tz('America/Bogota').format('YYYY/MM/DD');
    const date = await Fecha.findOne({
      where: {
        date: dateNow,
      },
    });

    if (!date) {
      return Fecha.create({ date: dateNow });
    }

    return date;
  },
  getFechaFacturas: async () => {
    const dateNow = moment.tz('America/Bogota').format('YYYY/MM/DD');

    const date = await Fecha.findOne({
      where: {
        date: dateNow,
      },
      include: [
        {
          model: Factura,
          required: false,
          attributes: ['id', 'isPaid'],
          include: [
            { model: Employee, required: false, attributes: ['id'] },
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
