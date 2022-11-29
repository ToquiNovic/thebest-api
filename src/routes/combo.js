const comboRouter = require('express').Router();
const { Combo } = require('../db');

comboRouter.get('/', async (req, res) => {
  res.json(await Combo.findAll());
});

comboRouter.get('/:id', async (req, res) => {
  res.json(await Combo.findByPk(req.params.id));
});

comboRouter.post('/', async (req, res) => {
  const newCombo = req.body;

  const combo = await Combo.findOne({
    where: {
      title: newCombo.title,
    },
  });

  if (!combo) {
    res.json(await Combo.create(newCombo));
  } else {
    res.status(400).json({ msg: 'Ya existe un combo con ese nombre' });
  }
});

comboRouter.delete('/:id', async (req, res) => {
  const combo = await Combo.findByPk(req.params.id);
  res.json(await combo.destroy());
});

module.exports = comboRouter;
