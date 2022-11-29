const app = require('./app');
const {
  db,
  Motorcycle,
  Color,
  Brand,
  Person,
  Roll,
  Employee,
  Team,
  Combo,
  Factura,
  Fecha,
} = require('./db');
const logger = require('./utils/logger');

db.sync({ force: true }).then(async () => {
  const color = await Color.create({ color: 'Rojo' });
  const marca = await Brand.create({ brand: 'Suzuki' });
  const persona = await Person.create({
    phone: 3222255497,
    fullName: 'Dairo Garcia',
  });

  const moto = await Motorcycle.create({
    plaque: 'GJW60D',
    ColorId: color.id,
    BrandId: marca.id,
    PersonId: persona.id,
  });

  const rolOperario = await Roll.create({ role: 'OPERA' });
  const empleado = await Employee.create({
    dni: 1117531976,
    names: 'Dairo',
    surnames: 'Garcia',
    phone: 3222255497,
    commission: 40,
    RollId: rolOperario.id,
  });
  const empleado1 = await Employee.create({
    dni: 1117531978,
    names: 'Dairo',
    surnames: 'Garcia',
    phone: 3222255497,
    commission: 40,
    RollId: rolOperario.id,
  });

  const equipo = await Team.create({ name: 'Equipo1' });
  equipo.setEmployees([empleado.id, empleado1.id]);

  const combo = await Combo.create({ name: 'Combo2', price: 10000 });

  const fecha = await Fecha.create({});

  const factura = await Factura.create({
    total: 15000, MotorcycleId: moto.id, ComboId: combo.id, FechaId: fecha.id,
  });

  factura.setEmployees([empleado.id, empleado1.id]);

  try {
    await app.listen(app.get('port'));
    logger.inf(`Server corriendo en el puerto: ${app.get('port')}`);
  } catch (error) {
    logger.err(error);
  }
});
