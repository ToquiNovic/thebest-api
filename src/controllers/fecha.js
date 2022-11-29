const { Fecha } = require('../db');

module.exports = {
  getFecha: async () => {
    const dateNow = new Date();

    const date = await Fecha.findOne({
      where: {
        date: dateNow.toLocaleDateString('es-CO'),
      },
    });

    if (!date) {
      return Fecha.create({ date: dateNow.toLocaleDateString('es-CO') });
    }

    return date;
  },
};
