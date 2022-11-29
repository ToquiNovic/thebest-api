const motoRouter = require('express').Router();
const { Motorcycle, Person, Factura } = require('../db');

motoRouter.get('/', async (req, res) => {
  res.json(
    await Motorcycle.findAll({
      where: {
        isActive: true,
      },
      include: [Factura, Person],
    }),
  );
});

motoRouter.get('/:plaque', async (req, res) => {
  const { plaque } = req.params;
  const moto = await Motorcycle.findOne({
    where: {
      plaque,
    },
    include: Person,
  });

  if (!moto) {
    res.status(404).json({ msg: 'No se encuentra registrada!' });
  } else {
    res.json(moto);
  }
});

module.exports = motoRouter;
