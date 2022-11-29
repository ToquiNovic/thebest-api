const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Fecha extends Model {}
  Fecha.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NOW,
      set(value) {
        this.setDataValue('date', value.toLocaleString('es-CO', { timeZone: 'UTC' }));
      },
    },
  }, { sequelize, modelName: 'Fecha', timestamps: false });
};
