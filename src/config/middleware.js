const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

/**
 * Joins middleware to the app.
 * @param {Express.Application} app the instance of the express app.
 */
function init(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static('../public'));

  if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
  }
}

module.exports = { init };
