/* eslint-disable max-classes-per-file */
const { Sequelize, Model, DataTypes } = require('sequelize');
const models = require('./models');
const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = require('./config');
const logger = require('./utils/logger');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    logger.inf('Coneccion establecida con exito a la base de datos!');
  })
  .catch((error) => {
    logger.err('Error al conectarse a la base de datos: ', error);
  });

models(sequelize);
const {
  Employee,
  Roll,
  Brand,
  Color,
  Motorcycle,
  Person,
  Team,
  Factura,
  Combo,
} = sequelize.models;

Brand.hasMany(Motorcycle);
Motorcycle.belongsTo(Brand);

Color.hasMany(Motorcycle);
Motorcycle.belongsTo(Color);

Person.hasMany(Motorcycle);
Motorcycle.belongsTo(Person);

Roll.hasMany(Employee);
Employee.belongsTo(Roll);

Team.hasMany(Employee);
Employee.belongsTo(Team);

Combo.hasMany(Factura);
Factura.belongsTo(Combo);

class EmployeeFacturaModel extends Model {}
EmployeeFacturaModel.init(
  {
    EmployeeID: {
      type: DataTypes.UUID,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    FacturaID: {
      type: DataTypes.UUID,
      references: {
        model: Factura,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: 'EmployeeFactura', timestamps: false },
);

class MotorcycleFacturaModel extends Model {}
MotorcycleFacturaModel.init(
  {
    MotorcycleID: {
      type: DataTypes.UUID,
      references: {
        model: Motorcycle,
        key: 'id',
      },
    },
    FacturaID: {
      type: DataTypes.UUID,
      references: {
        model: Factura,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: 'MotorcycleFactura', timestamps: false },
);

const { EmployeeFactura, MotorcycleFactura } = sequelize.models;

module.exports = {
  db: sequelize,
  Employee,
  Roll,
  Brand,
  Color,
  Motorcycle,
  Person,
  Team,
  Factura,
  Combo,
  EmployeeFactura,
  MotorcycleFactura,
};
