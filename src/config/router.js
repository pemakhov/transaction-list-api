// const path = require('path');
const TransactionRouter = require('../components/Transaction/router');

// const pathToIndex = path.join(__dirname, '../public/build/', 'index.html');

/**
 * Joins router middleware to the app.
 * @param {Express.Application} app the instance of the express app.

 */
function init(app) {
  app.use('/transactions', TransactionRouter);

  app.get('*', (req, res) => {
    console.log(app.static);
    res.sendFile(`${__dirname}/../public/build/index.html`);
  });

  app.use((err, req, res, next) => {
    console.error(err.message);
    next();
  });
}

module.exports = { init };
