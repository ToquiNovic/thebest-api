const drawoutproductRouter = require('express').Router();

const { DrawOutProduct } = require('../db');
const { getFecha } = require('../controllers/fecha');
const { verifyToken } = require('../utils/middleware');

drawoutproductRouter.get('/', async (req, res) => {
  res.json(await DrawOutProduct.findAll());
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
