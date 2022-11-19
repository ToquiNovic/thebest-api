const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Factura extends Model {}
  Factura.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
    },
    hour: {
      type: DataTypes.TIME,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, { sequelize, modelName: 'Factura', timestamps: false });
};
