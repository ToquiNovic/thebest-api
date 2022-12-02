const routerOperarios = require('express').Router();
const { getFacturasEmployee } = require('../controllers/fecha');
const { Employee, Roll } = require('../db');

routerOperarios.get('/', async (req, res) => {
  const operarios = await Roll.findOne({
    where: {
      role: 'OPERA',
    },
    include: {
      model: Employee,
      required: false,
      attributes: ['id', 'dni', 'names', 'surnames'],
    },
  });

  res.json(operarios.dataValues.Employees);
});

routerOperarios.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  const employee = await getFacturasEmployee(id, date);

  if (!employee) {
    res.status(400).json({ msg: 'No se encontro' });
  } else {
    res.json(employee);
  }
});

module.exports = routerOperarios;
