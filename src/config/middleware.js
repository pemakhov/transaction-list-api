const bodyParser = require('body-parser');
const express = require('express');

const { STAGE } = require('./constants');

/**
 * Joins middleware to the app.
 * @param {} app the instance of the express app.
 */
function init(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static('../public'));

  if (STAGE === 'DEV') {
    app.use(require('morgan')('dev'));
  }
}

module.exports = { init };
