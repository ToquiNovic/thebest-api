const { Register, Factura } = require('../db');

module.exports = {
  getRegisters: async () => Register.findAll({ include: Factura }),
  addRegister: async (register) => (await Register.create(register)).dataValues,
};
