const jwt = require('jsonwebtoken');
const { JWT_KEY, URL_FROND } = require('../config');

module.exports = {
  unknownEndPoint: (req, res) => {
    res.status(404).json({ msg: 'Ruta desconocida' });
  },

  errorHandler: (error, req, res, next) => {
    if (error.name === 'SequelizeDatabaseError') {
      res.status(400).send({ msg: 'Error en la base de datos!' });
    } else if (error.name === 'CastError') {
      res.status(400).send({ msg: 'Formato en el ID incorrecto!' });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ msg: 'Error al intentar ingresar un dato repetido!' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ msg: 'Tokken invalido o no existe!' });
    } else if (error.name === 'Created Error') {
      res.status(404).json({ msg: 'Ya existe esa entidad!' });
    }
    next(error);
  },

  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      res.status(403).json({ msg: 'Auth Error' });
    } else {
      jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) {
          res.status(404).json({ msg: 'Token Error' });
        } else {
          req.user = user;
          next();
        }
      });
    }
  },

  allowOrigin: (req, res, next) => {
    res.header('Access-Control-Allow-Origin', URL_FROND);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
  },
};
