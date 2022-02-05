const { findLatestTransactions, findTransactions } = require('./DAL');
const TransactionQuerySchema = require('./schemas/TransactionsQuerySchema');

/**
 * Gets the number (limit) of last transactions, stored in DB.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
async function getLastTransactions(req, res, next) {
  try {
    const { limit } = req.params;
    const result = await findLatestTransactions(limit);
    res.send(result);
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
async function getTransactions(req, res, next) {
  try {
    const { error, value } = TransactionQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).send({ error });
    }
    const { page, limit, ...rest } = value;
    const skip = page * limit;
    const transactions = await findTransactions({ ...rest, limit, skip });
    return res.send(transactions);
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  getLastTransactions,
  getTransactions,
};
