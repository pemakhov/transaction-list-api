const axios = require('axios');
const { ETHERSCAN_API_KEY_TOKEN } = require('../../config/constants');

async function getLatestBlockNumber() {
  const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY_TOKEN}`;
  const response = await axios.get(url);
  const lastBlockNumber = response && response?.data?.result;

  return lastBlockNumber;
}

async function getBlockByNumber(blockNumber) {
  const url =
    `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}` +
    `&boolean=true&apikey=${ETHERSCAN_API_KEY_TOKEN}`;

  const response = await axios.get(url);
  const block = response && response?.data?.result;

  if (!block) {
    throw new Error("Can't get a block");
  }

  return block;
}

/**
 * Calculates transaction confirmations.
 * @param {string} blockLevelBlockNumber blockNumber from a block object.
 * @param {string} transactionLevelBlockNumber blockNumber from a transaction object.
 * @returns transaction confirmations number.
 */
function calcConfirmations(blockLevelBlockNumber, transactionLevelBlockNumber) {
  return Number(blockLevelBlockNumber) - Number(transactionLevelBlockNumber);
}

/**
 * Calculates transaction fee.
 * @param {string} gas Gas units.
 * @param {string} gasPrice Gas price per unit in wei.
 * @returns {string} transaction fee in wei.
 */
function calcFee(gas, gasPrice) {
  return (Number(gas) * Number(gasPrice)).toString();
}

function getTransactions(block) {
  const { number, timestamp, transactions } = block;
  return transactions.map((item) => {
    const { hash, from, to, blockNumber, value, gas, gasPrice } = item;
    return {
      _id: hash,
      from,
      to,
      blockNumber,
      confirmations: calcConfirmations(number, blockNumber),
      date: timestamp,
      value,
      fee: calcFee(gas, gasPrice),
    };
  });
}

module.exports = {
  getLatestBlockNumber,
  getBlockByNumber,
  getTransactions,
};
