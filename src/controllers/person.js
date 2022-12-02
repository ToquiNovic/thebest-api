const { Person, Motorcycle } = require('../db');

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
        attributes: ['id', 'plaque'],
      },
    });
    return persona;
  },
};
