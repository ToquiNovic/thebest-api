const reportRoute = require('express').Router();
const { getDetailDate, getAllData } = require('../controllers/report');

reportRoute.get('/', async (req, res) => {
  res.json(await getAllData('2023/01/15'));
});

reportRoute.get('/:id', async (req, res) => {
  res.json(await getDetailDate(req.params.id));
});

module.exports = reportRoute;
