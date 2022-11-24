const rollRouter = require('express').Router();
const { Roll } = require('../db');

rollRouter.get('/', async (req, res) => {
  res.json(await Roll.findAll());
});

module.exports = rollRouter;
