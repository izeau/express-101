'use strict';

require('dotenv').load();

const app = require('./app');

const { HTTP_HOST, HTTP_PORT } = process.env;

app.listen(HTTP_PORT, HTTP_HOST);
