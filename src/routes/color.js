const routerColor = require('express').Router();
const { Color } = require('../db');

routerColor.get('/', async (req, res) => {
  res.json(await Color.findAll());
});

module.exports = routerColor;
