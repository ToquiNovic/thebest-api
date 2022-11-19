const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Team extends Model {}
  Team.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  }, { sequelize, modelName: 'Team', timestamps: false });
};
