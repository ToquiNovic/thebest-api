const reportRoute = require('express').Router();
const {
  getDetailDate, getAllData, getDataDrawout, getDataDrawoutProduct,
} = require('../controllers/report');

reportRoute.get('/', async (req, res) => {
  const { date } = req.query;
  res.json(await getAllData(date));
});

reportRoute.get('/drawout', async (req, res) => {
  const { date } = req.query;
  res.json(await getDataDrawout(date));
});

reportRoute.get('/drawoutProduct', async (req, res) => {
  const { date } = req.query;
  res.json(await getDataDrawoutProduct(date));
});

reportRoute.get('/:id', async (req, res) => {
  res.json(await getDetailDate(req.params.id));
});

module.exports = reportRoute;
