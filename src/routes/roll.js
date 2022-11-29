const rollRouter = require('express').Router();
const { getRolesMenores } = require('../controllers/roll');

rollRouter.get('/', async (req, res) => {
  res.json(await getRolesMenores());
});

module.exports = rollRouter;
