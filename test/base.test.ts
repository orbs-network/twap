import {
  deployArtifact,
  getNetworkForkingBlockNumber,
  impersonate,
  resetNetworkFork,
  setBalance,
  tag,
} from "@defi.org/web3-candies/dist/hardhat";
import { account, bn, bn18, erc20, erc20s, ether, Token } from "@defi.org/web3-candies";
import { Quoter } from "../typechain-hardhat/Quoter";
import { OrderBook } from "../typechain-hardhat/OrderBook";
import { Keeper } from "../typechain-hardhat/Keeper";
import BN from "bn.js";
import _ from "lodash";
import { expect } from "chai";

export const ethUniswapV2Router = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
export const ethSushiswapRouter = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
export const polyQuickswapRouter = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

export let user: string;
export let keeperOwner: string;

export let deployer: string;
export let quoter: Quoter;
export let orderbook: OrderBook;
export let keeper: Keeper;

export let srcToken: Token;
export let dstToken: Token;

export let userSrcTokenStartBalance = 1_000_000;

beforeEach(async () => {
  await resetNetworkFork(14840000);
  await initAccounts();
  await initTokens();

  quoter = await deployArtifact<Quoter>("Quoter", { from: deployer }, [ethSushiswapRouter]);

  orderbook = await deployArtifact<OrderBook>("OrderBook", { from: deployer });
  keeper = await deployArtifact<Keeper>("Keeper", { from: deployer }, [keeperOwner, orderbook.options.address]);
});

async function initAccounts() {
  user = await account(1);
  keeperOwner = await account(2);
  deployer = await account(3);
  tag(user, "user");
  tag(keeperOwner, "keeperOwner");
  tag(deployer, "deployer");
}

async function initTokens() {
  srcToken = erc20s.eth.USDC();
  dstToken = erc20s.eth.WETH();

  const whale = "0x55fe002aeff02f77364de339a1292923a15844b8";
  await impersonate(whale);
  await srcToken.methods.transfer(user, await srcToken.amount(userSrcTokenStartBalance)).send({ from: whale });

  await erc20s.eth
    .WETH()
    .methods.deposit()
    .send({ from: keeperOwner, value: bn18(1e6) });

  // await toToken.methods.transfer(keeper.options.address, bn18(1e6));
}

export function now() {
  return Math.round(Date.now() / 1000);
}

export async function ask(srcAmount: number, srcRate: number, dstRate: number) {
  const _srcAmount = await srcToken.amount(srcAmount);
  const _srcRate = await srcToken.amount(srcRate);
  const _dstRate = await dstToken.amount(dstRate);
  await srcToken.methods.approve(orderbook.options.address, _srcAmount).send({ from: user });
  return orderbook.methods
    .ask(srcToken.address, dstToken.address, _srcAmount, _srcRate, _dstRate, now() + 60)
    .send({ from: user });
}

export async function bid(id: number, amount: number) {
  await dstToken.methods.approve(keeper.options.address, await dstToken.amount(amount)).send({ from: keeperOwner });
  await keeper.methods.bid(id, await dstToken.amount(amount)).send({ from: keeperOwner });
}

export async function execute(id: number) {
  await keeper.methods.execute(id).send({ from: keeperOwner });
}

export async function expectFilled(id: number, srcAmount: number, dstAmount: number) {
  expect((await order(id)).filled).bignumber.eq(await srcToken.amount(srcAmount));
  expect(await srcToken.methods.balanceOf(user).call()).bignumber.closeTo(
    await srcToken.amount(userSrcTokenStartBalance - srcAmount),
    await srcToken.amount(1)
  );
  expect(await dstToken.methods.balanceOf(user).call()).bignumber.closeTo(
    await dstToken.amount(dstAmount),
    await dstToken.amount(0.001)
  );
}

export async function order(id: number): Promise<any> {
  return orderbook.methods.order(id).call();
}
