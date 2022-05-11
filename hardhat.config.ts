import { HardhatUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import { task } from "hardhat/config";
import { bn18, networks } from "@defi.org/web3-candies";

task("deploy").setAction(async () => {
  //
});

const configFile = () => require("./.config.json");

export default {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        blockNumber: process.env.BLOCK_NUMBER ? parseInt(process.env.BLOCK_NUMBER!) : undefined,
        url: configFile()[`NODE_URL_${process.env.NETWORK?.toUpperCase() || "ETH"}`] as string,
      },
      blockGasLimit: 10e6,
      accounts: {
        accountsBalance: bn18("1,000,000").toString(),
      },
    },
    eth: {
      chainId: networks.eth.id,
      url: configFile().NODE_URL_ETH,
    },
    poly: {
      chainId: networks.poly.id,
      url: configFile().NODE_URL_POLY,
    },
    avax: {
      chainId: networks.avax.id,
      url: configFile().NODE_URL_AVAX,
    },
  },
  typechain: {
    outDir: "typechain-hardhat",
    target: "web3-v1",
  },
  mocha: {
    timeout: 180_000,
    retries: 0,
    bail: true,
  },
  gasReporter: {
    currency: "USD",
    coinmarketcap: configFile().coinmarketcapKey,
    token: process.env.NETWORK?.toLowerCase() == "avax" ? "AVAX" : process.env.NETWORK?.toLowerCase() == "poly" ? "MATIC" : undefined,
    gasPriceApi:
      process.env.NETWORK?.toLowerCase() == "avax"
        ? "https://api.snowtrace.io/api?module=proxy&action=eth_gasPrice"
        : process.env.NETWORK?.toLowerCase() == "poly"
        ? "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice"
        : undefined,
    showTimeSpent: true,
  },
  etherscan: {
    apiKey: configFile()[`ETHERSCAN_${process.env.NETWORK?.toUpperCase() || "ETH"}`],
  },
} as HardhatUserConfig;
