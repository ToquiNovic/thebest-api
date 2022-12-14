const employeeRouter = require('express').Router();
const { Employee, Factura } = require('../db');
const { decrypt } = require('../utils/encrypt');
const { verifyToken } = require('../utils/middleware');

employeeRouter.get('/', async (req, res) => {
  const employees = await Employee.findAll({ include: Factura });
  res.json(employees);
});

employeeRouter.get('/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  employee.dataValues.password = decrypt(employee.dataValues.password);
  res.json(employee);
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
