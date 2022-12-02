const personRouter = require('express').Router();
const { getPersonID } = require('../controllers/person');

personRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const person = await getPersonID(id);

  if (!person) {
    res.status(404).json({ msg: 'No se encontro a este Cliente' });
  } else {
    res.json(person);
  }
});

module.exports = personRouter;
