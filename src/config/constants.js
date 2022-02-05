const PORT = process.env.PORT || 3000;

const STAGE = process.env.STAGE || 'DEV';

const ETHERSCAN_API_KEY_TOKEN = process.env.ETHERSCAN_API_KEY_TOKEN || '';

const CALLS_TIMEOUT = 2000;

// Ether currency
const WAI_IN_GWAI = 1000000000;
const GWAI_IN_ETH = 1000000000;

module.exports = {
  PORT,
  ETHERSCAN_API_KEY_TOKEN,
  CALLS_TIMEOUT,
  STAGE,
  WAI_IN_GWAI,
  GWAI_IN_ETH,
};
