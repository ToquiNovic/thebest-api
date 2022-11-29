const routerFactura = require('express').Router();
const { Factura } = require('../db');

routerFactura.get('/', async (req, res) => {
  res.json(await Factura.findAll());
});

routerFactura.post('/', async (req, res) => {
  const { moto, factura, persona } = req.body;
  res.json({ moto, factura, persona });
});

module.exports = routerFactura;
