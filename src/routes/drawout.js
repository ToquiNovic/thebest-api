const drawoutRouter = require('express').Router();
const { getFecha } = require('../controllers/fecha');
const { DrawOut, Fecha, Employee } = require('../db');
const { verifyToken } = require('../utils/middleware');

drawoutRouter.post('/', verifyToken, async (req, res) => {
  const { user } = req;
  const newRetiro = req.body;
  const fecha = await getFecha();

  newRetiro.FechaId = fecha.id;
  newRetiro.EmployeeId = user.id;
  res.json(await DrawOut.create(newRetiro));
});

drawoutRouter.get('/', async (req, res) => {
  res.json(
    await DrawOut.findAll({
      include: [
        { model: Fecha, required: false, attributes: ['date'] },
        {
          model: Employee,
          required: false,
          attributes: ['id', 'names', 'surnames'],
        },
      ],
      attributes: ['id', 'amount', 'description'],
    }),
  );
});

module.exports = drawoutRouter;
