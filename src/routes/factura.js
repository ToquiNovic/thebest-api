const routerFactura = require('express').Router();
const { addFactura } = require('../controllers/factura');
const { Factura } = require('../db');

routerFactura.get('/', async (req, res) => {
  res.json(await Factura.findAll());
});

routerFactura.post('/', async (req, res) => {
  res.json(await addFactura(req.body));
});

module.exports = routerFactura;
