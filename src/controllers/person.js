const {
  Person,
  Motorcycle,
  Factura,
  Brand,
  Color,
  Fecha,
  Combo,
  Employee,
  Team,
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
            attributes: ['id', 'total', 'paymentMethod'],
            include: [
              { model: Fecha, required: false, attributes: ['date'] },
              { model: Combo, required: false, attributes: ['name', 'price'] },
              {
                model: Employee,
                required: false,
                attributes: ['names'],
                include: [{ model: Team, required: false, attributes: ['name'] }],
              },
            ],
          },
        ],
      },
    });
    return persona;
  },
};
