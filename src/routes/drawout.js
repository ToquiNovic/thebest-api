const drawoutRouter = require('express').Router();
const { getFecha } = require('../controllers/fecha');
const { DrawOut } = require('../db');
const { verifyToken } = require('../utils/middleware');

drawoutRouter.post('/', verifyToken, async (req, res) => {
  const { user } = req;
  const newRetiro = req.body;
  const fecha = await getFecha();

  newRetiro.FechaId = fecha.id;
  newRetiro.EmployeeId = user.id;
  res.json(await DrawOut.create(newRetiro));
});

module.exports = drawoutRouter;
