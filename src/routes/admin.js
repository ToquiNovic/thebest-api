const adminRoute = require('express').Router();

adminRoute.get('/', async (req, res) => {
  res.json({});
});

module.exports = adminRoute;
