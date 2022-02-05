const { getLatestBlockNumber, getBlockByNumber, getTransactions, updateConfirmationsNumber } = require('./service');
const { CALLS_TIMEOUT } = require('../../config/constants');

const { create, findById } = require('./DAL');

let lastProcessedBlockNumber = '';

async function getNextBlockNumber() {
  const latestBlockNumber = await getLatestBlockNumber();

  return latestBlockNumber === lastProcessedBlockNumber ? null : latestBlockNumber;
}

async function processLatestBlock(block) {
  const transactions = getTransactions(block);
  console.log((`got ${transactions.length} transactions`));

  transactions.forEach(async (item) => {
    const { _id } = item;
    const document = await findById(_id);

    if (!document) {
      await create(item);
      return;
    }

    if (document.confirmations === item.confirmations) {
      return;
    }
    console.log('Going to update confirmations');
    await updateConfirmationsNumber(_id, item.confirmations);
  });
}

async function attempt() {
  try {
    const nextBlockNumber = await getNextBlockNumber();

    if (nextBlockNumber === null) {
      return;
    }

    lastProcessedBlockNumber = nextBlockNumber;

    const block = await getBlockByNumber(nextBlockNumber);
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
