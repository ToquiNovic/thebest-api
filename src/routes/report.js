const reportRoute = require('express').Router();
const { getDetailDate, getAllDates } = require('../controllers/report');

reportRoute.get('/', async (req, res) => {
  res.json(await getAllDates());
});

reportRoute.get('/:id', async (req, res) => {
  res.json(await getDetailDate(req.params.id));
});

module.exports = reportRoute;
