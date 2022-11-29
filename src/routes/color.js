const routerColor = require('express').Router();
const {
  getColors,
  getColorByID,
  getColorIncludeMoto,
  addColor,
  getColorsIncludeMotos,
} = require('../controllers/color');

routerColor.get('/', async (req, res) => {
  const { moto } = req.query;

  if (moto === 'true') {
    res.json(await getColorsIncludeMotos());
  } else {
    res.json(await getColors());
  }
});

routerColor.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { moto } = req.query;

  if (moto === 'true') {
    res.json(await getColorIncludeMoto(id));
  } else {
    res.json(await getColorByID(id));
  }
});

routerColor.post('/', async (req, res) => {
  res.json(await addColor(req.body));
});

module.exports = routerColor;
