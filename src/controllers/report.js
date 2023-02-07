const { Op } = require('sequelize');
const {
  Fecha,
  Factura,
  Combo,
  DrawOut,
  Employee,
  Motorcycle,
  Person,
  Color,
  Brand,
} = require('../db');

module.exports = {
  getAllDates: async () => Fecha.findAll(),
  getDetailDate: async (id) => {
    const data = await Fecha.findByPk(id, {
      include: [
        {
          model: Factura,
          required: false,
          attributes: ['total'],
          include: [
            { model: Combo, required: false, attributes: ['name'] },
            { model: Employee, required: false, attributes: ['commission'] },
          ],
        },
        { model: DrawOut, required: false, attributes: ['amount'] },
      ],
    });

    const { Facturas, DrawOuts } = data.dataValues;
    const result = {};

    result.count = Facturas.length;
    result.total = 0;
    result.cobroEmpleados = 0;
    result.combos = {};

    for (let i = 0; i < Facturas.length; i += 1) {
      const element = Facturas[i];
      result.total += Number(element.total);
      result.combos[element.Combo.name] = !result.combos[element.Combo.name]
        ? 1
        : result.combos[element.Combo.name] + 1;

      for (let j = 0; j < element.Employees.length; j += 1) {
        result.cobroEmpleados
          += (Number(element.total) * (element.Employees[j].commission / 100))
          / element.Employees.length;
      }
    }

    result.retiros = DrawOuts.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );

    result.gananciaNeta = result.total - (result.cobroEmpleados + result.retiros);

    return result;
  },
  getAllData: async () => {
    const data = await Fecha.findAll({
      where: {
        date: {
          [Op.startsWith]: ['2023/01/15'],
        },
      },
      attributes: ['date'],
      include: [
        {
          model: Factura,
          required: false,
          attributes: [
            'total',
            'isPaid',
            'description',
            'date',
            'paymentMethod',
          ],
          include: [
            {
              model: Employee,
              required: false,
              attributes: [
                'dni',
                'names',
                'surnames',
                'phone',
                'birthDate',
                'commission',
              ],
            },
            {
              model: Motorcycle,
              required: false,
              attributes: ['plaque'],
              include: [
                {
                  model: Person,
                  required: false,
                  attributes: ['fullName', 'phone'],
                },
                { model: Color, required: false, attributes: ['color'] },
                { model: Brand, required: false, attributes: ['brand'] },
              ],
            },
          ],
        },
      ],
    });

    return data;
  },
};
