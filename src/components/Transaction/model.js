const { Schema } = require('mongoose');
const connections = require('../../config/connections');

const TransactionSchema = new Schema({
  _id: String,
  from: String,
  to: String,
  blockNumber: String,
  confirmations: Number,
  date: String,
  value: String,
  fee: String,
});

module.exports = connections.model('TransactionModel', TransactionSchema);
