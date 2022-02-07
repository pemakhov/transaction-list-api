const { Schema } = require('mongoose');
const connections = require('../../config/connections');

const BlockNumberModel = new Schema({
  _id: String,
});

module.exports = connections.model('BlockNumberModel', BlockNumberModel);
