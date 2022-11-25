module.exports = {
  PORT: process.env.PORT || 3001,
  DB_NAME: process.env.DB_NAME || 'prueba',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'sammy',
  DB_PASS: process.env.DB_PASS || '1234',
  JWT_KEY: process.env.JWT_KEY || 'asdf',
  URL_FROND: process.env.URL_FROND || 'http://localhost:3000',
  PASS_KEY: process.env.PASS_KEY || 'ASDFG',
  PASS_DEFAULT: process.env.PASS_DEFAULT || '12345',
};
