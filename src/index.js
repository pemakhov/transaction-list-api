require('dotenv').config();

const express = require('express');
const middleware = require('./config/middleware');
const router = require('./config/router');
const { PORT } = require('./config/constants');

const app = express();
middleware.init(app);
router.init(app);

app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
