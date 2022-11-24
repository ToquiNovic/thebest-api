const routerOperarios = require('express').Router();
const { Employee, Roll } = require('../db');

routerOperarios.get('/', async (req, res) => {
  const operarios = await Roll.findOne({
    where: {
      role: 'OPERA',
    },
    include: Employee,
  });

  res.json(
    operarios.Employees.map(({
      id, dni, names, surnames,
    }) => ({
      id,
      dni,
      names,
      surnames,
      role: operarios.role,
    })),
  );
});

module.exports = routerOperarios;
