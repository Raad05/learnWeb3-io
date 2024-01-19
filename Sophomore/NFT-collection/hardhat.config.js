require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: ALCHEMY_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
};
