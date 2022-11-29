const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Color extends Model {}
  Color.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, { sequelize, modelName: 'Color', timestamps: false });
};
