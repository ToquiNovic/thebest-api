const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model { }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    quantityUnit: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    measure: {
      type: DataTypes.ENUM,
      values: ['ml', 'gr', 'ud'],
      allowNull: false,
    },
  }, { sequelize, modelName: 'Product' });
};
