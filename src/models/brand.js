const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Brand extends Model {}
  Brand.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, { sequelize, modelName: 'Brand', timestamps: false });
};
