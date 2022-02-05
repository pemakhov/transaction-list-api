const TransactionModel = require('./model');

/**
 * Stores a transaction in database
 * @param {object} transaction
 * @returns {Promise<TransactionModel>}
 */
function create(transaction) {
  return TransactionModel.create(transaction);
}

/**
 * Finds a transaction by id.
 * @param {string} id Document id.
 * @returns {object<Transaction> | null} transaction or null.
 */
function findById(id) {
  return TransactionModel.findById(id).exec();
}

/**
 * Updates confirmations number of transaction.
 * @param {string} _id Document id.
 * @param {number} newConfirmations New confirmations number.
 * @returns {object}
 */
function updateConfirmationsNumber(_id, newConfirmations) {
  return TransactionModel.updateOne({ _id }, { confirmations: newConfirmations }).exec();
}

module.exports = {
  create,
  findById,
  updateConfirmationsNumber,
};
