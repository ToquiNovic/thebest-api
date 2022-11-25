const app = require('./app');
const { db } = require('./db');
const logger = require('./utils/logger');

/**
const {
  Roll, Brand, Color, Employee,
} = require('./db');
const rolls = require('./data/roll');
const brands = require('./data/brand');
const colors = require('./data/color');
*/

db.sync(/** { force: true } */).then(async () => {
  /**
  try {
    await Roll.bulkCreate(rolls, { validate: true });
    await Brand.bulkCreate(brands, { validate: true });
    await Color.bulkCreate(colors, { validate: true });
    const admin = await Roll.findOne({
      where: {
        role: 'ADMIN',
      },
    });
    await Employee.create({
      dni: '1117531976',
      names: 'Dairo',
      surnames: 'Garcia Naranjo',
      password: '123',
      phone: '3027485520',
      RollId: admin.id,
    });
  } catch (error) {
    logger.err(error);
  }
  */
  try {
    await app.listen(app.get('port'));
    logger.inf(`Server corriendo en el puerto: ${app.get('port')}`);
  } catch (error) {
    logger.err(error);
  }
});
