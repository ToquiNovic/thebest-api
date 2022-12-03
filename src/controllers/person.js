const {
  Person,
  Motorcycle,
  Factura,
  Brand,
  Color,
  Fecha,
  Combo,
} = require('../db');

module.exports = {
  getPerson: async ({ phone, fullName }) => {
    const user = await Person.findOne({
      where: {
        phone,
      },
    });

    if (!user) {
      return Person.create({ phone, fullName });
    }

    return user.update({ fullName });
  },
  getPersonID: async (id) => {
    const persona = await Person.findByPk(id, {
      include: {
        model: Motorcycle,
        required: false,
        attributes: ['id', 'plaque', 'isActive'],
        include: [
          { model: Brand, required: false, attributes: ['brand'] },
          { model: Color, required: false, attributes: ['color'] },
          {
            model: Factura,
            required: false,
            attributes: [
              'id',
              'description',
              'total',
              'isPaid',
              'paymentMethod',
            ],
            include: [
              { model: Fecha, required: false, attributes: ['date'] },
              { model: Combo, required: false },
            ],
          },
        ],
      },
    });
    return persona;
  },
};
