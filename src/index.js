const app = require('./app');
const sequelize = require('./db');
const logger = require('./utils/logger');

sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    logger.inf(`Server corriendo en el puerto: ${app.get('port')}`);
  });
});
