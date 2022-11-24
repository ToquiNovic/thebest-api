const rollRouter = require('express').Router();
const { getRoles, getEmployeesRoll } = require('../controllers/roll');

rollRouter.get('/', async (req, res) => {
  res.json(await getRoles());
});

rollRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await getEmployeesRoll(id));
});

module.exports = rollRouter;
