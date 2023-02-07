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
  getAllData: async (startDate) => {
    const data = await Fecha.findAll({
      where: {
        date: {
          [Op.startsWith]: [startDate],
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
            {
              model: Combo,
              required: false,
              attributes: ['name', 'price'],
            },
          ],
        },
      ],
    });

    const newData = [
      [
        'Fecha',
        'Total Factura',
        'Pago',
        'Descripción',
        'Metodo de pago',
        'Hora',
        'Combo',
        'Precio Combo',
        'Placa',
        'Color',
        'Marca',
        'Nombre Dueño',
        'Telefono Dueño',
        'Identificación Empleado 1',
        'Nombres Empleado 1',
        'Apellidos Empleado 1',
        'Comisión Empleado 1',
        'Identificación Empleado 2',
        'Nombres Empleado 2',
        'Apellidos Empleado 2',
        'Comisión Empleado 2',
      ],
    ];
    data.forEach((item) => {
      item.Facturas.forEach((factura) => {
        const objet = {};
        objet.date = item.date;
        objet.total = factura.total;
        objet.isPaid = factura.isPaid ? 'SI' : 'NO';
        objet.description = factura.description;
        objet.paymentMethod = factura.paymentMethod;
        objet.hora = factura.date;
        objet.comboName = factura.Combo.name;
        objet.comboPrice = factura.Combo.price;
        objet.plaque = factura.Motorcycle.plaque;
        objet.color = factura.Motorcycle.Color.color;
        objet.brand = factura.Motorcycle.Brand.brand;
        objet.nameD = factura.Motorcycle.Person.fullName;
        objet.phoneD = factura.Motorcycle.Person.phone;

        if (factura.Employees.length === 0) {
          objet.employee1Dni = '';
          objet.employee1Names = '';
          objet.employee1Surnames = '';
          objet.employee1Commission = '';

          objet.employee2Dni = '';
          objet.employee2Names = '';
          objet.employee2Surnames = '';
          objet.employee2Commission = '';
        } else if (factura.Employees.length === 1) {
          objet.employee1Dni = !factura.Employees[0].dni
            ? ''
            : factura.Employees[0].dni;
          objet.employee1Names = !factura.Employees[0].names
            ? ''
            : factura.Employees[0].names;
          objet.employee1Surnames = !factura.Employees[0].surnames
            ? ''
            : factura.Employees[0].surnames;
          objet.employee1Commission = !factura.Employees[0].commission
            ? ''
            : factura.Employees[0].commission;

          objet.employee2Dni = '';
          objet.employee2Names = '';
          objet.employee2Surnames = '';
          objet.employee2Commission = '';
        } else {
          objet.employee1Dni = !factura.Employees[0].dni
            ? ''
            : factura.Employees[0].dni;
          objet.employee1Names = !factura.Employees[0].names
            ? ''
            : factura.Employees[0].names;
          objet.employee1Surnames = !factura.Employees[0].surnames
            ? ''
            : factura.Employees[0].surnames;
          objet.employee1Commission = !factura.Employees[0].commission
            ? ''
            : factura.Employees[0].commission;

          objet.employee2Dni = !factura.Employees[1].dni
            ? ''
            : factura.Employees[1].dni;
          objet.employee2Names = !factura.Employees[1].names
            ? ''
            : factura.Employees[1].names;
          objet.employee2Surnames = !factura.Employees[1].surnames
            ? ''
            : factura.Employees[1].surnames;
          objet.employee2Commission = !factura.Employees[1].commission
            ? ''
            : factura.Employees[1].commission;
        }

        newData.push(objet);
      });
    });
    return newData.map((dat) => Object.values(dat));
  },
};
