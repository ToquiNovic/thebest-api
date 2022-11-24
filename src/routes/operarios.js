const routerOperarios = require('express').Router();
const { getOperarios } = require('../controllers/operarios');

routerOperarios.get('/', async (req, res) => {
  res.json(await getOperarios());
});

module.exports = routerOperarios;
