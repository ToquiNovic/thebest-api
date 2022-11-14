const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Employee extends Model {}
  Employee.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  }, { sequelize, modelName: 'User', timestamps: false });
};
