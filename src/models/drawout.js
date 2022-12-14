const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DrawOut extends Model {}
  DrawOut.init({
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
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, { sequelize, modelName: 'DrawOut' });
};
