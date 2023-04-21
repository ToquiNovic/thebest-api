const moment = require('moment-timezone');
const {
  Fecha, Factura, Motorcycle, Employee, Team,
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
          attributes: ['id', 'isPaid', 'total'],
          include: [
            {
              model: Employee,
              required: false,
              attributes: ['id'],
              include: [{ model: Team, required: false, attributes: ['name'] }],
            },
            {
              model: Motorcycle,
              required: false,
              attributes: ['id', 'plaque', 'isActive', 'PersonId'],
            },
          ],
        },
      ],
    });

    if (date) {
      date.dataValues.motorcycleWashing = date.dataValues.Facturas.length;
    }

    return date;
  },
  getFacturasEmployee: async (id, date) => {
    const employee = await Employee.findByPk(id, {
      attributes: ['names', 'surnames', 'commission', 'dni'],
      include: {
        model: Factura,
        required: false,
        attributes: ['total'],
        include: [
          {
            model: Fecha,
            required: false,
            attributes: ['date'],
          },
          {
            model: Employee,
            required: false,
            attributes: ['id'],
          },
        ],
      },
    });

    const dataFactura = employee.dataValues.Facturas.map((elem) => ({
      total: elem.total,
      countEmployees: elem.Employees.length,
      date: elem.Fecha.date,
    })).filter((elem) => elem.date === date);

    const {
      names, surnames, commission, dni,
    } = employee.dataValues;

    const percent = commission / 100;
    return {
      id,
      dni,
      names,
      surnames,
      commission,
      gananciasDia: dataFactura.reduce(
        (acc, cur) => acc + (cur.total / cur.countEmployees) * percent,
        0,
      ),
      dataFactura,
      motorcycleWashing: dataFactura.length,
    };
  },
};
