const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Employee extends Model {}
  Employee.init({
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
  }, { sequelize, modelName: 'Employee', timestamps: false });
};
