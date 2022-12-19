const employeeRouter = require('express').Router();
const { Employee, Factura } = require('../db');
const { verifyToken } = require('../utils/middleware');

employeeRouter.get('/', async (req, res) => {
  const employees = await Employee.findAll({ include: Factura });
  res.json(employees);
});

employeeRouter.get('/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id, {
    attributes: ['names', 'surnames', 'dni', 'RollId', 'commission', 'phone'],
  });
  res.json(employee);
});

employeeRouter.put('/:id', verifyToken, async (req, res) => {
  const { user } = req;
  const data = req.body;

  const employee = await Employee.findByPk(req.params.id);

  if (user.role !== 'ADMIN') {
    res.status(400).json({ msg: 'No tienes permiso' });
  } else {
    employee.update(data);
    employee.save();
    res.json({ msg: 'Success' });
  }
});

employeeRouter.delete('/:id', verifyToken, async (req, res) => {
  const { user } = req;

  if (user.role !== 'ADMIN') {
    res
      .status(400)
      .json({ msg: 'No tienes permiso para hacer esa transaccion' });
  } else {
    const employe = await Employee.findByPk(req.params.id);

    if (!employe) {
      res.status(400).json({ msg: 'Ese empleado no se encuentra registrado' });
    } else {
      employe.destroy();
      res.json({ msg: 'Done!' });
    }
  }
});

module.exports = employeeRouter;
