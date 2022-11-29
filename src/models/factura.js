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
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Nequi', 'Efectivo'],
    },
  }, { sequelize, modelName: 'Factura', timestamps: false });
};
