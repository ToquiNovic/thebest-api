const rollRouter = require('express').Router();
const { getRoles } = require('../controllers/roll');

rollRouter.get('/', async (req, res) => {
  res.json(await getRoles());
});

module.exports = rollRouter;
