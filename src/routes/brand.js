const routerBrand = require('express').Router();
const { Brand } = require('../db');

routerBrand.get('/', async (req, res) => {
  res.json(await Brand.findAll());
});

module.exports = routerBrand;
