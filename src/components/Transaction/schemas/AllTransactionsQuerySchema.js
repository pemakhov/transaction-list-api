const Joi = require('joi');

/**
 * The schema of transactions request.
 */
const schema = Joi.object({
  limit: Joi.number().min(2).max(100).required(),
  page: Joi.number().integer().min(0).required(),
});

module.exports = schema;
