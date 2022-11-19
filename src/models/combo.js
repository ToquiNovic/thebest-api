const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Combo extends Model {}

  Combo.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, { sequelize, modelName: 'Combo', timestamps: false });
};
