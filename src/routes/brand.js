const routerBrand = require('express').Router();
const { getBrands } = require('../controllers/brand');

routerBrand.get('/', async (req, res) => {
  res.json(await getBrands());
});

module.exports = routerBrand;
