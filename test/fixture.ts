import {
  deployArtifact,
  impersonate,
  resetNetworkFork,
  setBalance,
  tag,
  useChaiBigNumber,
} from "@defi.org/web3-candies/dist/hardhat";
import { account, currentNetwork, erc20s, networks, Token, web3 } from "@defi.org/web3-candies";
import { expect } from "chai";
import type { IExchange, TWAP } from "../typechain-hardhat/contracts";
import type { MockExchange } from "../typechain-hardhat/contracts/test";
import BigNumber from "bignumber.js";
import _ from "lodash";

useChaiBigNumber();

export let user: string;
export let taker: string;
export let deployer: string;

export let srcToken: Token;
export let dstToken: Token;
export let nativeToken: Token;
export const userSrcTokenStartBalance = 1_000_000;

let srcTokenWhale: string;
let dstTokenWhale: string;

export let twap: TWAP;

export let exchange: IExchange;
export let univ2SrcDstPath: string[];

export async function initFixture(latestBlock = false) {
  await resetNetworkFork(latestBlock ? "latest" : undefined);
  await initAccounts();
  await initTokens();
  await fundSrcTokenFromWhale(user, userSrcTokenStartBalance);
  twap = await deployArtifact<TWAP>("TWAP", { from: deployer });
}

async function initAccounts() {
  user = await account(1);
  taker = await account(2);
  deployer = await account(3);
  tag(user, "user");
  tag(taker, "taker");
  tag(deployer, "deployer");
}

async function initTokens() {
  switch (process.env.NETWORK) {
    case "ETH":
      srcToken = erc20s.eth.USDC();
      dstToken = erc20s.eth.WETH();
      nativeToken = dstToken;
      srcTokenWhale = "0x55fe002aeff02f77364de339a1292923a15844b8";
      dstTokenWhale = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
      return;

    case "POLY":
      srcToken = erc20s.poly.USDC();
      dstToken = erc20s.poly.WETH();
      nativeToken = erc20s.poly.WMATIC();
      srcTokenWhale = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
      dstTokenWhale = "0x72A53cDBBcc1b9efa39c834A540550e23463AAcB";
      return;

    case "FTM":
      srcToken = erc20s.ftm.USDC();
      dstToken = erc20s.ftm.WETH();
      nativeToken = erc20s.ftm.WFTM();
      srcTokenWhale = "0x95bf7E307BC1ab0BA38ae10fc27084bC36FcD605";
      dstTokenWhale = "0x25c130B2624CF12A4Ea30143eF50c5D68cEFA22f";
      return;

    default:
      throw new Error(`unhandled NETWORK ${process.env.NETWORK}`);
  }
}

export async function withUniswapV2Exchange() {
  const network = await currentNetwork();
  const impls = {
    eth: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // UniswapV2
    ftm: "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52", // Spiritswap V1
    poly: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // Quickswap
  };
  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [
    _.find(impls, (impl, k) => k === network!.shortname),
  ]);

  const paths = {
    eth: [srcToken.address, dstToken.address],
    ftm: [srcToken.address, nativeToken.address, dstToken.address],
    poly: [srcToken.address, dstToken.address],
  };
  univ2SrcDstPath = _.find(paths, (p, k) => k === network!.shortname)!;
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

export async function getAmountOutSrcToDst(amountIn: BigNumber) {
  return exchange.methods
    .getAmountOut(srcToken.address, dstToken.address, amountIn, encodedSwapPath())
    .call()
    .then(BigNumber);
}

export function encodedSwapPath(path = univ2SrcDstPath) {
  return web3().eth.abi.encodeParameters(["bool", "address[]"], [false, path]);
}
