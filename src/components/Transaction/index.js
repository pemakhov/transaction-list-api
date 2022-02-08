const { findLatestTransactions, findTransactions, findAll } = require('./DAL');
const TransactionsByFilterQuerySchema = require('./schemas/TransactionsByFilterQuerySchema');
const AllTransactionsQuerySchema = require('./schemas/AllTransactionsQuerySchema');

/**
 * Gets the number (limit) of last transactions, stored in DB.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
async function getLastTransactions(req, res, next) {
  try {
    const { limit } = req.params;
    const transactions = await findLatestTransactions(limit);
    res.send(transactions);
  } catch (error) {
    next(error);
  }
}

/**
 * Gets the transactions by filter, page and limit.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
async function getTransactionsByFilter(req, res, next) {
  try {
    const { error, value } = TransactionsByFilterQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).send({ error });
    }
    const { page, limit, ...rest } = value;
    const skip = page * limit;
    const data = await findTransactions({ ...rest, limit, skip });
    return res.send(data);
  } catch (e) {
    return next(e);
  }
}

/**
 * Gets a part of all transactions (specified by a page and error).
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
async function getAllTransactions(req, res, next) {
  try {
    const { error, value } = AllTransactionsQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).send({ error });
    }
    const { page, limit } = value;
    const skip = page * limit;
    const data = await findAll({ limit, skip });
    return res.send(data);
  } catch (e) {
    console.error(e.message);
    return next(e);
  }
}

module.exports = {
  getLastTransactions,
  getTransactionsByFilter,
  getAllTransactions,
};
