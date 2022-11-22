const { Model, DataTypes } = require('sequelize');
const { PASS_DEFAULT } = require('../config');
const { encrypt } = require('../utils/encrypt');

module.exports = (sequelize) => {
  class Employee extends Model {}
  Employee.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      dni: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: encrypt(PASS_DEFAULT),
        set(value) {
          if (!value) {
            this.setDataValue('password', encrypt(PASS_DEFAULT));
          } else {
            this.setDataValue('password', encrypt(value));
          }
        },
      },
      names: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      surnames: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
      },
    },
    { sequelize, modelName: 'Employee', timestamps: false },
  );
};
