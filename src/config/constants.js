const PORT = process.env.PORT || 3000;

const STAGE = process.env.STAGE || 'DEV';

const ETHERSCAN_API_KEY_TOKEN = process.env.ETHERSCAN_API_KEY_TOKEN || '';

const CALLS_TIMEOUT = process.env.API_CALL_INTERVAL || 2000;

const TRANSACTION_FILTERS = ['from', 'to', 'blockNumber', '_id'];

// Ether currency
const WAI_IN_GWAI = 1000000000;
const GWAI_IN_ETH = 1000000000;

module.exports = {
  PORT,
  ETHERSCAN_API_KEY_TOKEN,
  CALLS_TIMEOUT,
  TRANSACTION_FILTERS,
  STAGE,
  WAI_IN_GWAI,
  GWAI_IN_ETH,
};
