const motoRouter = require('express').Router();
const { Motorcycle, Person } = require('../db');

motoRouter.get('/', async (req, res) => {
  res.json(await Motorcycle.findAll());
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
    res.status(404).json({ msg: 'No esta registrada!' });
  } else {
    res.json(moto);
  }
});

motoRouter.post('/', async (req, res) => {
  const { plaque } = req.body;
  const moto = await Motorcycle.findOne({
    where: {
      plaque,
    },
  });

  if (!moto) {
    res.json(await Motorcycle.create({ plaque }));
  } else {
    res.status(400).json({ msg: 'Ya se encuentra registrada' });
  }
});

module.exports = motoRouter;
