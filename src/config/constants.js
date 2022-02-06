const PORT = process.env.PORT || 3000;

const ETHERSCAN_API_KEY_TOKEN = process.env.ETHERSCAN_API_KEY_TOKEN || '';

const CALLS_TIMEOUT = process.env.API_CALL_INTERVAL || 2000;

const INITIALIZATION_BLOCKS = Number(process.env.INITIALIZATION_BLOCKS) || 1000;

const TRANSACTION_FILTERS = ['from', 'to', 'blockNumber', '_id'];

// Ether currency
const WEI_IN_GWAI = 1000000000;
const GWEI_IN_ETH = 1000000000;

module.exports = {
  PORT,
  ETHERSCAN_API_KEY_TOKEN,
  CALLS_TIMEOUT,
  INITIALIZATION_BLOCKS,
  TRANSACTION_FILTERS,
  WEI_IN_GWAI,
  GWEI_IN_ETH,
};
