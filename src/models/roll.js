const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Roll extends Model {}
  Roll.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.ENUM,
      values: ['ADMINISTRATOR', 'SUPERVISOR', 'OPERATOR'],
      defaultValue: 'OPERATOR',
    },
  }, { sequelize, modelName: 'Roll', timestamps: false });
};
