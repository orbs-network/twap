import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import { hardhatDefaultConfig } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";

task("deploy").setAction(async () => {
  //
});

export default _.merge(hardhatDefaultConfig(), {
  networks: {
    hardhat: {
      accounts: {
        passphrase: "twap", // empty accounts
      },
    },
  },
  mocha: {
    bail: true,
  },
} as HardhatUserConfig);
