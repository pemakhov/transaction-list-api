require('dotenv').config();

const express = require('express');
const middleware = require('./config/middleware');
const router = require('./config/router');
const { PORT } = require('./config/constants');
const Scanner = require('./components/Scanner');

const app = express();
middleware.init(app);
router.init(app);

app.listen(PORT, '0.0.0.0');
Scanner.init();
