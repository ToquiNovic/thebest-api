const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.set('port', PORT);

app.use('/api', require('./routes'));

module.exports = app;
