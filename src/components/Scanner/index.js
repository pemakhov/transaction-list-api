const {
  getLatestBlockNumber,
  getBlockByNumber,
  getTransactions,
  calcAdditionToConfirmations,
  toHexString,
  parseIntFromHexString,
} = require('./service');
const { updateConfirmationsNumber } = require('../Transaction/DAL');
const { CALLS_TIMEOUT, INITIALIZATION_BLOCKS } = require('../../config/constants');
const { create, findById } = require('../Transaction/DAL');
const { findLatest, createBlockNumber } = require('./DAL');

/**
 * @current last processed or being processed block number
 * @latest the most new block number
 */
const blockNumber = {
  current: '',
  latest: '',
};

/**
 * Gets the latest block number from database.
 * @returns {string | null}
 */
async function getLatestBlockNumberFromDb() {
  const document = await findLatest();

  if (!document) {
    return null;
  }
  const { _id } = document;
  return _id || null;
}

/**
 * Sets the initial values to blockNumber properties.
 */
async function initializeBlockNumbers() {
  try {
    const bn = await getLatestBlockNumber();
    if (!bn) {
      throw new Error("Can't initialize. Can't get the latest block number.");
    }

    blockNumber.latest = bn;

    const blockNumberFromDb = await getLatestBlockNumberFromDb();
    blockNumber.current = blockNumberFromDb || toHexString(parseIntFromHexString(bn) - INITIALIZATION_BLOCKS);
  } catch (e) {
    console.error(e.message);
    setTimeout(() => initializeBlockNumbers(), CALLS_TIMEOUT);
  }
}

/**
 * Gets the next block number and updates the latest one if needed.
 * @returns {string | null} next block number or null.
 */
async function getNextBlockNumber() {
  if (blockNumber.current === blockNumber.latest) {
    const latestBN = await getLatestBlockNumber();
    blockNumber.latest = latestBN || blockNumber.latest;
  }
  if (blockNumber.current === blockNumber.latest) {
    return null;
  }
  blockNumber.current = toHexString(parseIntFromHexString(blockNumber.current) + 1);

  return blockNumber.current;
}

/**
 * Stores new transactions into database if they don't exist,
 * or update confirmations number if exit.
 * @param {object} block A block of blockchain.
 */
async function processNextBlock(block) {
  const transactions = getTransactions(block);

  transactions.forEach(async (item) => {
    const { _id } = item;
    const document = await findById(_id);

    if (!document) {
      await create(item);
      return;
    }
    const additionalConfirmations = calcAdditionToConfirmations(document.blockNumber, blockNumber.current);

    if (!additionalConfirmations) {
      return;
    }
    const newConfirmations = document.confirmations + additionalConfirmations;
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
    console.log('scanning');
    const nextBlockNumber = await getNextBlockNumber();

    if (!nextBlockNumber) {
      return;
    }

    createBlockNumber(nextBlockNumber);
    blockNumber.current = nextBlockNumber;
    const block = await getBlockByNumber(nextBlockNumber);

    if (!block) {
      return;
    }

    processNextBlock(block);
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Scans for new block recursively.
 */
async function scan() {
  attempt();
  setTimeout(scan, CALLS_TIMEOUT);
}

/**
 * Initializes a scanner.
 */
async function init() {
  await initializeBlockNumbers();
  scan();
}

module.exports = { init };
