const employeeRouter = require('express').Router();
const { Employee, Roll } = require('../db');

employeeRouter.get('/', async (req, res) => {
  res.json(await Employee.findAll({ include: Roll }));
});

module.exports = employeeRouter;
