import { deployArtifact, impersonate, resetNetworkFork, tag } from "@defi.org/web3-candies/dist/hardhat";
import { account, bn18, erc20s, Token, useChaiBN, web3 } from "@defi.org/web3-candies";
import { expect } from "chai";
import type { DOTC, IExchange, Quoter } from "../typechain-hardhat/contracts";
import type { MockExchange } from "../typechain-hardhat/contracts/test";

useChaiBN();

export let deployer: string;
export let user: string;
export let taker: string;
export let quoter: Quoter;
export let dotc: DOTC;
export let exchange: IExchange;

export let srcToken: Token;
export let dstToken: Token;
export const userSrcTokenStartBalance = 1_000_000;
let router: string;
let srcTokenWhale: string;

export const isETH = process.env.NETWORK == "ETH";
export const describeOnETH = isETH ? describe : xdescribe;

export async function initFixture() {
  await resetNetworkFork();
  await initAccounts();
  await initExternals();

  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [router]);
  quoter = await deployArtifact<Quoter>("Quoter", { from: deployer }, [exchange.options.address]);
  dotc = await deployArtifact<DOTC>("DOTC", { from: deployer });
}

async function initAccounts() {
  user = await account(1);
  taker = await account(2);
  deployer = await account(3);
  tag(user, "user");
  tag(taker, "taker");
  tag(deployer, "deployer");
}

async function initExternals() {
  switch (process.env.NETWORK) {
    case "POLY":
      return await initExternalsPOLY();
    case "ETH":
      return await initExternalsETH();
    default:
      throw new Error(`unhandled NETWORK`);
  }
}

async function initExternalsETH() {
  srcToken = erc20s.eth.USDC();
  dstToken = erc20s.eth.WETH();
  router = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a"; // UniswapV2
  await fundSrcTokenFromWhale("0x55fe002aeff02f77364de339a1292923a15844b8");
}

async function initExternalsPOLY() {
  srcToken = erc20s.poly.USDC();
  dstToken = erc20s.poly.WETH();
  router = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"; // Quickswap
  await fundSrcTokenFromWhale("0xF977814e90dA44bFA03b6295A0616a897441aceC");
}

async function fundSrcTokenFromWhale(whale: string) {
  srcTokenWhale = whale;
  tag(whale, "srcTokenWhale");
  await impersonate(whale);
  await srcToken.methods.transfer(user, await srcToken.amount(userSrcTokenStartBalance)).send({ from: whale });
  expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(await srcToken.amount(userSrcTokenStartBalance));
}

export async function withMockExchange(dstAmountOut: number) {
  exchange = await deployArtifact("MockExchange", { from: deployer });
  await erc20s.eth
    .WETH()
    .methods.deposit()
    .send({ from: deployer, value: bn18(1e6) });
  await dstToken.methods.transfer(exchange.options.address, bn18(1e6)).send({ from: deployer });
  await setMockExchangeAmountOut(dstAmountOut);
}

export async function setMockExchangeAmountOut(dstAmountOut: number) {
  await (exchange as MockExchange).methods
    .setMockAmounts([0, await dstToken.amount(dstAmountOut)])
    .send({ from: deployer });
}

export async function increasePrice() {
  console.log("📈 increasing price...");
  const amount = await srcToken.amount(10e6);
  await srcToken.methods.approve(exchange.options.address, amount).send({ from: srcTokenWhale });
  await exchange.methods
    .swap(amount, 1, web3().eth.abi.encodeParameter("address[]", [srcToken.address, dstToken.address]))
    .send({ from: srcTokenWhale });
}
