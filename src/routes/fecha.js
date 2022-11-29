const routerFecha = require('express').Router();
const { getFecha, getFechaFacturas } = require('../controllers/fecha');

routerFecha.post('/', async (req, res) => {
  res.json(await getFecha());
});

routerFecha.get('/', async (req, res) => {
  res.json(await getFechaFacturas());
});

module.exports = routerFecha;
