const path = require('path');
const TransactionRouter = require('../components/Transaction/router');

const pathToIndex = path.join(__dirname, '../public/', 'index.html');

/**
 * Joins router middleware to the app.
 * @param {Express.Application} app the instance of the express app.

 */
function init(app) {
  app.get('/', (req, res) => {
    res.sendFile(pathToIndex);
  });

  app.use('/transactions', TransactionRouter);

  app.use((err, req, res, next) => {
    console.error(err.message);
    next();
  });
}

module.exports = { init };
