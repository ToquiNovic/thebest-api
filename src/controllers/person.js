const { Person } = require('../db');

module.exports = {
  addPerson: async ({ phone, fullName }) => {
    const user = await Person.findOne({
      where: {
        phone,
      },
    });

    if (!user) {
      return Person.create({ phone, fullName });
    }

    return user.update({ phone, fullName });
  },
};
