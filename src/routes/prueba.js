const routerPrueba = require('express').Router();
const {
  Factura, DetailsFactura, Combo, Motorcycle, Team, Employee,
} = require('../db');

routerPrueba.get('/', async (req, res) => {
  res.json(await Factura.findAll({ include: Employee }));
});

module.exports = routerPrueba;
