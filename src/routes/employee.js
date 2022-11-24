const employeeRouter = require('express').Router();
const { getAllEmployee } = require('../controllers/employee');

employeeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await getAllEmployee(id));
});

module.exports = employeeRouter;
