const moment = require('moment-timezone');
const saleRoute = require('express').Router();

const { Fecha, Factura, Employee } = require('../db');

saleRoute.get('/', async (req, res) => {
  const dateNow = moment.tz('America/Bogota').format('YYYY/MM/DD');

  const data = await Fecha.findOne({
    where: {
      date: dateNow,
    },
    include: [
      {
        model: Factura,
        required: false,
        attributes: ['total'],
        include: [
          {
            model: Employee,
            required: false,
            attributes: ['id', 'names', 'surnames', 'commission'],
          },
        ],
      },
    ],
  });

  const facturas = data.Facturas.map(({ total, Employees }) => [
    ...Employees.map(({
      id, names, surnames, commission,
    }) => ({
      id,
      names,
      surnames,
      commission,
      totalFactura: total * (commission / Employees.length / 100),
    })),
  ]);

  const respon = {};

  for (let i = 0; i < facturas.length; i += 1) {
    const employees = facturas[i];
    for (let j = 0; j < employees.length; j += 1) {
      respon[employees[j].id] = {
        names: employees[j].names,
        surnames: employees[j].surnames,
        commission: employees[j].commission,
        total:
          respon[employees[j].id]?.total === undefined
            ? 0
            : respon[employees[j].id].total + employees[j].totalFactura,
      };
    }
  }

  res.json(respon);
});

module.exports = saleRoute;
