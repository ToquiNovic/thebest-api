const employeeRouter = require('express').Router();
const { Employee, Factura } = require('../db');
const { decrypt } = require('../utils/encrypt');

employeeRouter.get('/', async (req, res) => {
  const employees = await Employee.findAll({ include: Factura });
  res.json(employees);
});

employeeRouter.get('/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  employee.dataValues.password = decrypt(employee.dataValues.password);
  res.json(employee);
});

module.exports = employeeRouter;
