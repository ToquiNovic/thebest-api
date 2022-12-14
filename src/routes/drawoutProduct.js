const drawoutproductRouter = require('express').Router();

const {
  DrawOutProduct, Fecha, Employee, Product,
} = require('../db');
const { getFecha } = require('../controllers/fecha');
const { verifyToken } = require('../utils/middleware');

drawoutproductRouter.get('/', async (req, res) => {
  const data = await Product.findAll({
    include: [
      {
        model: DrawOutProduct,
        required: false,
        attributes: ['id', 'amount'],
        include: [
          { model: Fecha, required: false, attributes: ['date'] },
          {
            model: Employee,
            required: false,
            attributes: ['names', 'surnames', 'id'],
          },
        ],
      },
    ],
    attributes: ['id', 'quantityUnit', 'name', 'measure'],
  });

  res.json(data);
});

drawoutproductRouter.post('/', verifyToken, async (req, res) => {
  const { user } = req;
  const newDrawOut = req.body;

  if (user.role === 'OPERA') {
    res.json({ msg: 'No tienes permiso para hacer esto' });
  } else {
    const fecha = await getFecha();

    newDrawOut.EmployeeId = user.id;
    newDrawOut.FechaId = fecha.id;
    res.json(await DrawOutProduct.create(newDrawOut));
  }
});

module.exports = drawoutproductRouter;
