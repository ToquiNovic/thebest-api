const motoRouter = require('express').Router();
const {
  Motorcycle, Person,
} = require('../db');

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
    res.status(404).json({ msg: 'No se encuentra registrada!' });
  } else {
    res.json(moto);
  }
});

motoRouter.post('/', async (req, res) => {
  const { moto, person } = req.body;

  let user = await Person.findOne({
    where: {
      phone: person.phone,
    },
  });

  if (!user) {
    user = await Person.create(person);
  }

  let motocycle = await Motorcycle.findOne({
    where: {
      plaque: moto.plaque,
    },
  });

  if (!motocycle) {
    motocycle = await Motorcycle.create({
      ...moto,
      PersonId: user.dataValues.id,
    });
  }

  res.json({ user, motocycle });
});

module.exports = motoRouter;
