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
  const block = response?.data?.result;

  if (!block) {
    throw new Error("Can't get a block");
  }

  return block;
}

async function getUncle(blockNumber) {
  const url =
    `https://api.etherscan.io/api?module=proxy&action=eth_getUncleByBlockNumberAndIndex&tag=${blockNumber}` +
    `&index=0x0&apikey=${ETHERSCAN_API_KEY_TOKEN}`;

  const response = await axios.get(url);
  const block = response?.data;
  console.log('status: ', response.status);
  console.log(block);

  if (!block) {
    throw new Error("Can't get an uncle");
  }

  return block;
}

async function getLatestBlockTransactions(req, res, next) {
  try {
    const latestBlockNumber = await getLatestBlockNumber();
    const block = await getBlockByNumber(latestBlockNumber);
    res.send(block.transactions);
  } catch (error) {
    next(error);
  }
}

async function getInitialTransactionDump(req, res, next) {
  try {
    const latestBlockNumber = await getLatestBlockNumber();
    const block = await getBlockByNumber(latestBlockNumber);
    console.log('parentHash: ', block?.parentHash);
    const { parentHash } = block;
    const parent = await getBlockByNumber(parentHash);
    console.log({ parent });
    res.send(parent);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLatestBlockTransactions,
  getInitialTransactionDump,
};
