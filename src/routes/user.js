const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = userRouter;
