const routerFecha = require('express').Router();
const { getFecha } = require('../controllers/fecha');

routerFecha.post('/', async (req, res) => {
  res.json(await getFecha());
});

module.exports = routerFecha;
