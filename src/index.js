const app = require('./app');
const { db } = require('./db');
const logger = require('./utils/logger');

db.sync().then(async () => {
  try {
    await app.listen(app.get('port'));
    logger.inf(`Server corriendo en el puerto: ${app.get('port')}`);
  } catch (error) {
    logger.err(error);
  }
});
