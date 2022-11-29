const routerRegister = require('express').Router();
const { getRegisters, addRegister } = require('../controllers/register');

routerRegister.get('/', async (req, res) => {
  res.json(await getRegisters());
});

routerRegister.post('/', async (req, res) => {
  res.json(await addRegister(req.body));
});

module.exports = routerRegister;
