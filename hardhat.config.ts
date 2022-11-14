import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import { hardhatDefaultConfig, hre } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";
import { deploy } from "@defi.org/web3-candies/dist/hardhat/deploy";

task("deploy").setAction(async () => {
  if (hre().network.config.chainId === hre().config.networks?.hardhat?.chainId) throw new Error("on hardhat network!");
  if (process.env.NETWORK!.toLowerCase() !== hre().network.name.toLowerCase())
    throw new Error(`different networks!, ${process.env.NETWORK} != ${hre().network.name}`);

  const twap = await deploy("TWAP", [], 3e6, 0, true, 10);
  await deploy("Lens", [twap], 3e6, 0, true, 10);
});

export default _.merge(hardhatDefaultConfig(), {
  networks: {
    hardhat: {
      blockGasLimit: 15e6,
    },
  },
  mocha: {
    bail: true,
  },
} as HardhatUserConfig);
