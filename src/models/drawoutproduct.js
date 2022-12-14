const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DrawOutProduct extends Model {}
  DrawOutProduct.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { sequelize, modelName: 'DrawOutProduct' });
};
