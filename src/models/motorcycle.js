const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Motorcycle extends Model {}
  Motorcycle.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    plaque: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, { sequelize, modelName: 'Motorcycle', timestamps: false });
};
