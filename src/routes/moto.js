const motoRouter = require('express').Router();
const { addMotocycle } = require('../controllers/moto');
const { addPerson } = require('../controllers/person');
const {
  Motorcycle,
  Person,
  Employee,
  Team,
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
  const { moto, person, factura } = req.body;

  const user = await addPerson(person);

  const motocycle = await addMotocycle({ ...moto, PersonId: user.dataValues.id });

  const team = await Team.findByPk(factura.TeamId, {
    include: Employee,
  });

  res.json({
    team,
    user,
    motocycle,
  });
});

module.exports = motoRouter;
