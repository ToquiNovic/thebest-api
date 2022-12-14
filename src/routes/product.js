const productRouter = require('express').Router();

const { Product } = require('../db');
const { verifyToken } = require('../utils/middleware');

productRouter.post('/', async (req, res) => {
  const newProduct = req.body;
  res.json(await Product.create(newProduct));
});

productRouter.get('/', async (req, res) => {
  res.json(await Product.findAll({ attributes: ['id', 'name', 'quantityUnit', 'measure'] }));
});

productRouter.delete('/:id', verifyToken, async (req, res) => {
  const { user } = req;
  if (user.role !== 'ADMIN') {
    res.status(400).json({ msg: 'No tienes permisos para hacer esto' });
  } else {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(400).json({ msg: 'Ese producto ya no existe' });
    } else {
      product.destroy();
      res.json({ msg: 'Done!' });
    }
  }
});

module.exports = productRouter;
