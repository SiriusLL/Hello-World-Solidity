/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
// npx hardhat verify --network ropsten [contract address] "Hello World"
require("@nomiclabs/hardhat-etherscan")

const {API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env;

module.exports = {
  solidity: "0.7.3",
  defaultNetworks: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};