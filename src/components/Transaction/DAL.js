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
async function findTransactions({ filter, value, limit, skip }) {
  const query = { [filter]: value };
  const [{ transactions, totalCount }] = await TransactionModel.aggregate([
    {
      $facet: {
        transactions: [{ $match: query }, { $skip: skip }, { $limit: limit }],
        totalCount: [{ $match: query }, { $count: 'pages' }],
      },
    },
  ]);
  const [{ pages }] = totalCount;
  return { transactions, pages };
}

async function findAll({ limit, skip }) {
  const [{ transactions, totalCount }] = await TransactionModel.aggregate([
    {
      $facet: {
        transactions: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $match: {} }, { $count: 'pages' }],
      },
    },
  ]);
  const [{ pages }] = totalCount;
  return { transactions, pages };
}

module.exports = {
  create,
  findById,
  updateConfirmationsNumber,
  findLatestTransactions,
  findTransactions,
  findAll,
};
