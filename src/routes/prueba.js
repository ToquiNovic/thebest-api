const routerPrueba = require('express').Router();
const { Roll, Employee, Team } = require('../db');

routerPrueba.get('/', async (req, res) => {
  res.json(await Team.findAll({ include: Employee }));
});

routerPrueba.post('/', async (req, res) => {
  const roll = await Roll.findOne({
    where: {
      role: 'ADMIN',
    },
  });

  res.json(await Employee.create({
    dni: 1117531976, names: 'Dairo', phone: 3222255497, surnames: 'Garcia', commission: 0, RollId: roll.id,
  }));
});

module.exports = routerPrueba;
