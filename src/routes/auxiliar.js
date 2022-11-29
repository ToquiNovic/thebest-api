const auxiliarRoute = require('express').Router();
const { Roll, Employee } = require('../db');

auxiliarRoute.get('/', async (req, res) => {
  const auxiliares = await Roll.findOne({
    include: Employee,
    attributes: ['id', 'dni', 'names', 'surnames'],
    where: {
      role: 'AUXIL',
      attribute: ['role'],
    },
  });

  res.json(auxiliares);
});

module.exports = auxiliarRoute;
