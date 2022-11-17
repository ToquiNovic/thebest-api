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
      type: DataTypes.ENUM,
      values: ['AKT', 'Bajaj', 'Honda', 'Suzuki', 'Yamaha', 'Other', 'Pulsar', 'KTM'],
    },
  }, { sequelize, modelName: 'Brand', timestamps: false });
};
