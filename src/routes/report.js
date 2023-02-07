const reportRoute = require('express').Router();
const { getDetailDate, getAllData } = require('../controllers/report');

reportRoute.get('/', async (req, res) => {
  const { date } = req.query;
  res.json(await getAllData(date));
});

reportRoute.get('/:id', async (req, res) => {
  res.json(await getDetailDate(req.params.id));
});

module.exports = reportRoute;
