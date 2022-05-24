import { deployArtifact, impersonate, tag } from "@defi.org/web3-candies/dist/hardhat";
import { account, bn18, erc20s, Token } from "@defi.org/web3-candies";
import { Quoter } from "../typechain-hardhat/Quoter";
import { OrderBook } from "../typechain-hardhat/OrderBook";
import { Keeper } from "../typechain-hardhat/Keeper";
import BN from "bn.js";
import _ from "lodash";

export const ethUniswapV2Router = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
export const ethSushiswapRouter = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
export const polyQuickswapRouter = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

export let user: string;
export let keeperOwner: string;

export let deployer: string;
export let quoter: Quoter;
export let orderbook: OrderBook;
export let keeper: Keeper;

export let fromToken: Token;
export let toToken: Token;

beforeEach(async () => {
  user = await account(1);
  keeperOwner = await account(2);
  deployer = await account(9);
  tag(user, "user");
  tag(keeperOwner, "keeperOwner");
  tag(deployer, "deployer");

  await prepareTokens();

  quoter = await deployArtifact<Quoter>("Quoter", { from: deployer }, [ethSushiswapRouter]);

  orderbook = await deployArtifact<OrderBook>("OrderBook", { from: deployer });
  keeper = await deployArtifact<Keeper>("Keeper", { from: deployer }, [keeperOwner, orderbook.options.address]);
});

async function prepareTokens() {
  fromToken = erc20s.eth.DAI();
  toToken = erc20s.eth.WETH();

  const whale = "0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8";
  await impersonate(whale);
  await fromToken.methods.transfer(user, await fromToken.amount(1e6)).send({ from: whale });

  await erc20s.eth
    .WETH()
    .methods.deposit()
    .send({ from: keeperOwner, value: bn18(1e6) });
  // await toToken.methods.transfer(keeper.options.address, bn18(1e6));
}
