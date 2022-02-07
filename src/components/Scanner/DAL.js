const BlockNumberModel = require('./blockNumberModel');

/**
 * Stores a block number in database
 * @param {string} blockNumber number
 * @returns {Promise<TransactionModel>}
 */
function createBlockNumber(blockNumber) {
  console.log('blockNumber from DAL', blockNumber);
  return BlockNumberModel.create({ _id: blockNumber });
}

/**
 * Finds a document by id.
 * @param {string} id Document id.
 * @returns {object | null} document or null.
 */
function findById(id) {
  return BlockNumberModel.findById(id).exec();
}

/**
 * Finds the latest document.
 * @returns the document.
 */
function findLatest() {
  return BlockNumberModel.findOne().sort({ _id: -1 }).exec();
}

module.exports = {
  createBlockNumber,
  findById,
  findLatest,
};
