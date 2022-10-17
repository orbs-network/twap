import {
  deployArtifact,
  impersonate,
  resetNetworkFork,
  setBalance,
  tag,
  useChaiBigNumber,
} from "@defi.org/web3-candies/dist/hardhat";
import { account, erc20s, Token } from "@defi.org/web3-candies";
import { expect } from "chai";
import type { IExchange, TWAP } from "../typechain-hardhat/contracts";
import type { MockExchange } from "../typechain-hardhat/contracts/test";
import { encodedPath } from "./twap-utils";

useChaiBigNumber();

export let user: string;
export let taker: string;
export let deployer: string;
export let twap: TWAP;
export let exchange: IExchange;

export let srcToken: Token;
export let dstToken: Token;
export let nativeToken: Token;
export let srcDstPath: string[];
export const userSrcTokenStartBalance = 1_000_000;
let srcTokenWhale: string;
let dstTokenWhale: string;

export async function initFixture() {
  await resetNetworkFork();
  await initAccounts();
  await initExternals();
  expect(await currentDstPrice()).closeTo(1800, 50);
  twap = await deployArtifact<TWAP>("TWAP", { from: deployer });
  await fundSrcTokenFromWhale(user, userSrcTokenStartBalance);
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
    case "FTM":
      return await initExternalsFTM();
    default:
      throw new Error(`unhandled NETWORK`);
  }
}

async function initExternalsETH() {
  srcToken = erc20s.eth.USDC();
  dstToken = erc20s.eth.WETH();
  nativeToken = dstToken;
  srcTokenWhale = "0x55fe002aeff02f77364de339a1292923a15844b8";
  dstTokenWhale = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // UniswapV2
  ]);
  srcDstPath = [srcToken.address, dstToken.address];
}

async function initExternalsPOLY() {
  srcToken = erc20s.poly.USDC();
  dstToken = erc20s.poly.WETH();
  nativeToken = erc20s.poly.WMATIC();
  srcTokenWhale = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
  dstTokenWhale = "0x72A53cDBBcc1b9efa39c834A540550e23463AAcB";
  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [
    "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // Quickswap
  ]);
  srcDstPath = [srcToken.address, dstToken.address];
}

async function initExternalsFTM() {
  srcToken = erc20s.ftm.USDC();
  dstToken = erc20s.ftm.WETH();
  nativeToken = erc20s.ftm.WFTM();
  srcTokenWhale = "0x95bf7E307BC1ab0BA38ae10fc27084bC36FcD605";
  dstTokenWhale = "0x25c130B2624CF12A4Ea30143eF50c5D68cEFA22f";
  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [
    "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52", // Spiritswap
  ]);
  srcDstPath = [srcToken.address, nativeToken.address, dstToken.address];
}

export async function fundSrcTokenFromWhale(target: string, amount: number) {
  tag(srcTokenWhale, "srcTokenWhale");
  await impersonate(srcTokenWhale);
  await setBalance(srcTokenWhale, await nativeToken.amount(10e6));
  await srcToken.methods.transfer(target, await srcToken.amount(amount)).send({ from: srcTokenWhale });
  expect(await srcToken.methods.balanceOf(target).call()).bignumber.eq(await srcToken.amount(amount));
}

async function fundDstTokenFromWhale(target: string, amount: number) {
  tag(dstTokenWhale, "dstTokenWhale");
  await impersonate(dstTokenWhale);
  await setBalance(dstTokenWhale, await nativeToken.amount(10e6));
  await dstToken.methods.transfer(target, await dstToken.amount(amount)).send({ from: dstTokenWhale });
  expect(await dstToken.methods.balanceOf(target).call()).bignumber.eq(await dstToken.amount(amount));
}

export async function withMockExchange(dstAmountOut: number) {
  exchange = await deployArtifact("MockExchange", { from: deployer });
  await fundDstTokenFromWhale(exchange.options.address, 10_000);
  await setMockExchangeAmountOut(dstAmountOut);
}

export async function setMockExchangeAmountOut(dstAmountOut: number) {
  await (exchange as MockExchange).methods
    .setMockAmounts([0, await dstToken.amount(dstAmountOut)])
    .send({ from: deployer });
}

export async function currentDstPrice() {
  const amountIn = await srcToken.amount(1000);
  const dstOut = await exchange.methods.getAmountOut(amountIn, encodedPath()).call().then(dstToken.mantissa);
  return (await srcToken.mantissa(amountIn)).div(dstOut).toNumber(); // rounded
}
