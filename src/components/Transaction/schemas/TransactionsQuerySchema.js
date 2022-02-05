const Joi = require('joi');
const { TRANSACTION_FILTERS } = require('../../../config/constants');

/**
 * The schema of transactions request.
 */
const schema = Joi.object({
  filter: Joi.string()
    .valid(...TRANSACTION_FILTERS)
    .required(),
  value: Joi.string().alphanum().min(2).required(),
  limit: Joi.number().min(2).max(100).required(),
  page: Joi.number().integer().min(0).required(),
});

module.exports = schema;
