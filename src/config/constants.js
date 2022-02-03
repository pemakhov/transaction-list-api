const PORT = process.env.PORT || 3000;

const ETHERSCAN_API_KEY_TOKEN = process.env.ETHERSCAN_API_KEY_TOKEN || '';

const STAGE = process.env.STAGE || 'DEV';

module.exports = {
  PORT,
  ETHERSCAN_API_KEY_TOKEN,
  STAGE,
};
