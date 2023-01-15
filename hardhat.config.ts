import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import { hardhatDefaultConfig, hre } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";
import fs from "fs-extra";

task("deploy").setAction(async () => {
  if (hre().network.config.chainId === hre().config.networks?.hardhat?.chainId) throw new Error("on hardhat network!");
  if (process.env.NETWORK!.toLowerCase() !== hre().network.name.toLowerCase())
    throw new Error(`different networks!, ${process.env.NETWORK} != ${hre().network.name}`);

  // const twap = await deploy("TWAP", [ChainConfigs.poly.wToken.address], 3e6, 0, true, 10);
  // await deploy("Lens", [twap], 2e6, 0, true, 10);
  //
  // const takers = [""];
  // await deploy("Taker", [twap, takers], 2e6, 0, true, 10);
  //
  // await deploy("UniswapV2Exchange", [""], 2e6, 0, true, 10);
});

task("github-pages").setAction(async () => {
  const src = require("./src");
  await fs.writeJson("./docs/configs.json", src.Configs, { spaces: 2 });
  await fs.writeJson(
    "./docs/chain-configs.json",
    _.mapValues(src.ChainConfigs, (cc) => ({
      ...cc,
      integrations: _.filter(src.Configs, (c) => c.chainId === cc.chainId).map((c) => c.partner),
    })),
    { spaces: 2 }
  );
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
