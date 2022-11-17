const app = require('./app');
const {
  db, Roll, Brand, Color,
} = require('./db');
const logger = require('./utils/logger');

const rolls = require('./data/roll');
const brands = require('./data/brand');
const colors = require('./data/color');

db.sync({ force: true }).then(async () => {
  try {
    await Roll.bulkCreate(rolls, { validate: true });
    await Brand.bulkCreate(brands, { validate: true });
    await Color.bulkCreate(colors, { validate: true });
  } catch (error) {
    logger.err(error);
  }

  try {
    await app.listen(app.get('port'));
    logger.inf(`Server corriendo en el puerto: ${app.get('port')}`);
  } catch (error) {
    logger.err(error);
  }
});
