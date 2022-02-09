const axios = require('axios');
const { ETHERSCAN_API_KEY_TOKEN } = require('../../config/constants');
const HEX_STRING_PREFIX = '0x';

/**
 * Transforms a number into a hex string.
 * @param {number} number
 * @returns a hex string.
 */
const toHexString = (number) => `${HEX_STRING_PREFIX}${number.toString(16)}`;

/**
 * Tests a string to be a hexadecimal number string.
 * @param {string} hexString a block number.
 * @returns {boolean}
 */
const isHexaDecimal = (hexString) => hexString.slice(0, 2) === HEX_STRING_PREFIX;

/**
 * Parses an integer from a hex string.
 * @param {string} hexString
 * @returns an integer.
 */
const parseIntFromHexString = (hexString) => parseInt(hexString, 16);

/**
 * Gets the latest block number from etherscan API.
 * @returns {object | undefined}
 */
async function getLatestBlockNumber() {
  const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY_TOKEN}`;
  const response = await axios.get(url);
  const lastBlockNumber = response && response?.data?.result;

  return lastBlockNumber;
}

/**
 * Gets block by its number.
 * @param {string} blockNumber
 * @returns {object} a block or throws an Error.
 */
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
 * Calculates the addition to transaction confirmations.
 * @param {string} previousBlockNumber blockNumber from a stored transaction.
 * @param {string} nextBlockNumber blockNumber from a fresh block.
 * @returns {number} transaction confirmations number.
 */
function calcAdditionToConfirmations(previousBlockNumber, nextBlockNumber) {
  return Math.abs(parseIntFromHexString(nextBlockNumber) - parseIntFromHexString(previousBlockNumber));
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

/**
 * Gets a transaction by hash.
 * @param {string} hash
 * @returns {object} transaction or throws an Error.
 */
async function getTransactionByHash(hash) {
  const url =
    `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}` +
    `&apikey=${ETHERSCAN_API_KEY_TOKEN}`;

  const response = await axios.get(url);
  const transaction = response && response?.data?.result;

  if (!transaction) {
    throw new Error("Can't get a transaction");
  }

  return transaction;
}

/**
 * Creates the array of transactions ready to store in DB.
 * @param {object} block
 * @returns {array} an array of transactions.
 */
function getTransactions(block) {
  const { timestamp, transactions, number } = block;
  return transactions.map((item) => {
    const { hash, from, to, blockNumber, value, gas, gasPrice } = item;
    return {
      _id: hash,
      from,
      to,
      blockNumber,
      confirmations: calcAdditionToConfirmations(blockNumber, number),
      date: timestamp,
      value,
      fee: calcFee(gas, gasPrice),
    };
  });
}

module.exports = {
  calcAdditionToConfirmations,
  getLatestBlockNumber,
  getBlockByNumber,
  isHexaDecimal,
  getTransactionByHash,
  getTransactions,
  toHexString,
  parseIntFromHexString,
};
