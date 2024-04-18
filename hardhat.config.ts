/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
};
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    'sepolia-testnet': {
      url: 'https://eth-sepolia.g.alchemy.com/v2/Vc0RpYR0qa610WAd0HpwCiL9QfuVXMaD',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 3000000000,
    },
  },
  defaultNetwork: 'hardhat',
};

export default config;