const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DetailsFactura extends Model {}
  DetailsFactura.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  }, { sequelize, modelName: 'DetailsFactura', timestamps: false });
};
