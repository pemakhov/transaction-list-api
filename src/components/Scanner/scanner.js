const {
  getLatestBlockNumber,
  getBlockByNumber,
  getTransactions,
  calcConfirmations,
} = require('./service');
const { updateConfirmationsNumber } = require('../Transaction/DAL');
const { CALLS_TIMEOUT } = require('../../config/constants');
const { create, findById } = require('../Transaction/DAL');

/**
 * Last processed or being processed block number
 */
let currentBlockNumber = '';

/**
 * Gets the latest block number if it isn't equal to the current.
 * @returns {string | null} next block number or null.
 */
async function getNextBlockNumber() {
  const latestBlockNumber = await getLatestBlockNumber();

  return latestBlockNumber === currentBlockNumber ? null : latestBlockNumber;
}

/**
 * Stores new transactions into database if they don't exist,
 * or update confirmations number if exit.
 * @param {object} block A block of blockchain.
 */
async function processLatestBlock(block) {
  const transactions = getTransactions(block);
  console.log(`got ${transactions.length} transactions`);

  transactions.forEach(async (item) => {
    const { _id } = item;
    const document = await findById(_id);

    if (!document) {
      await create(item);
      return;
    }
    const newConfirmations = calcConfirmations(document.blockNumber, currentBlockNumber);

    if (document.confirmations === newConfirmations) {
      return;
    }
    console.log('Going to update confirmations');
    await updateConfirmationsNumber(_id, newConfirmations);
  });
}

/**
 * Retrieves the latest block number and if it is not null,
 * initializes processing.
 * @returns {undefined}
 */
async function attempt() {
  try {
    const nextBlockNumber = await getNextBlockNumber();

    if (nextBlockNumber === null) {
      return;
    }

    currentBlockNumber = nextBlockNumber;

    const block = await getBlockByNumber(nextBlockNumber);

    if (!block) {
      return;
    }

    processLatestBlock(block);
  } catch (error) {
    console.error(error.message);
  }
}

async function scan() {
  attempt();
  setTimeout(() => scan(), CALLS_TIMEOUT);
}

module.exports = { scan };
