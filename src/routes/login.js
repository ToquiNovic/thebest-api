const routerLogin = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');
const { Employee, Roll, Register } = require('../db');
const { decrypt } = require('../utils/encrypt');
const { verifyToken } = require('../utils/middleware');

routerLogin.post('/login', async (req, res) => {
  const { dni, password } = req.body;
  const user = await Employee.findOne({
    where: {
      dni,
    },
    include: Roll,
  });

  if (!user) {
    res.status(404).json({ msg: 'El usuario no existe!' });
  } else if (password !== decrypt(user.password)) {
    res.status(400).json({ msg: 'Contraseña incorrecta' });
  } else {
    const { id, names } = user;
    const { role } = user.dataValues.Roll;
    jwt.sign({ id, names, role }, JWT_KEY, (err, token) => {
      if (err) {
        res.status(400).json({ msg: 'Error' });
      } else {
        res.json({
          id,
          names,
          role,
          token,
        });
      }
    });
  }
});

routerLogin.post('/signup', verifyToken, async (req, res) => {
  const employee = req.body;

  if (req.user.role !== 'ADMIN') {
    res.status(400).json({ msg: 'No tienes permisos para esta accion' });
  } else {
    const user = await Employee.findOne({
      where: {
        dni: employee.dni,
      },
    });

    if (!user) {
      const defaultRoll = await Roll.findOne({
        where: {
          role: 'OPERA',
        },
      });
      const register = await Register.create();
      const newEmploye = await Employee.create({
        ...employee,
        RollId: defaultRoll.id,
        RegisterId: register.dataValues.id,
      });

      res.json(newEmploye);
    } else {
      res.status(400).json({ msg: 'Ya se encuentra registrado!' });
    }
  }
});

module.exports = routerLogin;
