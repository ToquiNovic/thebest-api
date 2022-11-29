const { Sequelize } = require('sequelize');
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
  Person,
  Motorcycle,
  Employee,
  Roll,
  Brand,
  Color,
  Combo,
  Team,
  Factura,
  Fecha,
} = sequelize.models;

Person.hasMany(Motorcycle);
Motorcycle.belongsTo(Person);

Brand.hasMany(Motorcycle);
Motorcycle.belongsTo(Brand);

Color.hasMany(Motorcycle);
Motorcycle.belongsTo(Color);

Team.hasMany(Employee);

Employee.belongsTo(Team);

Roll.hasMany(Employee);
Employee.belongsTo(Roll);

Combo.hasMany(Factura);
Factura.belongsTo(Combo);

Motorcycle.hasMany(Factura);
Factura.belongsTo(Motorcycle);

Fecha.hasMany(Factura);
Factura.belongsTo(Fecha);

Factura.belongsToMany(Employee, { through: 'EmployeeFactura' });
Employee.belongsToMany(Factura, { through: 'EmployeeFactura' });

module.exports = {
  db: sequelize,
  Person,
  Motorcycle,
  Employee,
  Roll,
  Brand,
  Color,
  Combo,
  Team,
  Factura,
  Fecha,
};
