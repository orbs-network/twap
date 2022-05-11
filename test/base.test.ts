import { deployArtifact } from "@defi.org/web3-candies/dist/hardhat";
import { account } from "@defi.org/web3-candies";
import { Quoter } from "../typechain-hardhat/Quoter";

export const ethUniswapV2Router = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
export const ethSushiswapRouter = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
export const polyQuickswapRouter = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

export let deployer: string;
export let quoter: Quoter;

beforeEach(async () => {
  deployer = await account(9);

  quoter = await deployArtifact<Quoter>("Quoter", { from: deployer }, [polyQuickswapRouter]);
});
