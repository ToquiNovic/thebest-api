const routerColor = require('express').Router();
const { getColors } = require('../controllers/color');

routerColor.get('/', async (req, res) => {
  res.json(await getColors());
});

module.exports = routerColor;
