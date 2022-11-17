const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Model {}

  Person.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { sequelize, modelName: 'Person', timestamps: false });
};
