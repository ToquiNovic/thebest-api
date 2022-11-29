const auxiliarRoute = require('express').Router();
const { getAuxiliares } = require('../controllers/employee');

auxiliarRoute.get('/', async (req, res) => {
  res.json(await getAuxiliares());
});

module.exports = auxiliarRoute;
