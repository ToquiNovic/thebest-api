const auxiliarRoute = require('express').Router();
const { Roll, Employee } = require('../db');

auxiliarRoute.get('/', async (req, res) => {
  const auxiliares = await Roll.findOne({
    include: Employee,
    where: {
      role: 'AUXIL',
    },
  });

  res.json(
    auxiliares.Employees.map(({
      id, dni, names, surnames,
    }) => ({
      id,
      dni,
      names,
      surnames,
      role: auxiliares.role,
    })),
  );
});

module.exports = auxiliarRoute;
