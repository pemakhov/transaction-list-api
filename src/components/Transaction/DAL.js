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

/**
 * Finds latest transactions.
 * @param {number} limit the number of transactions to find.
 * @returns transactions.
 */
function findLatestTransactions(limit) {
  return TransactionModel.find({}).sort({ date: -1 }).limit(limit).exec();
}

/**
 * Finds transactions by filter.
 * @param {object} param0 contains filter name and value, limit and number to skip.
 * @returns transactions.
 */
function findTransactions({ filter, value, limit, skip }) {
  console.log({ filter, value, limit, skip });
  return TransactionModel.find({ [filter]: value }).skip(skip).limit(limit).exec();
}

module.exports = {
  create,
  findById,
  updateConfirmationsNumber,
  findLatestTransactions,
  findTransactions,
};
