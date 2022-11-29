const { Motorcycle } = require('../db');

module.exports = {
  getMotocycle: async ({
    plaque,
    ColorId,
    BrandId,
    PersonId,
  }) => {
    const moto = await Motorcycle.findOne({
      where: {
        plaque,
      },
    });

    if (!moto) {
      return Motorcycle.create({
        plaque, ColorId, BrandId, PersonId,
      });
    }

    return moto.update({ PersonId, ColorId });
  },
};
