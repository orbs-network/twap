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
import _ from "lodash";
import { Lens } from "../typechain-hardhat/contracts/periphery";

useChaiBigNumber();

export let user: string;
export let taker: string;
export let deployer: string;

export let srcToken: Token;
export let dstToken: Token;
export let wNativeToken: Token;
export const userSrcTokenStartBalance = 1_000_000;

let srcTokenWhale: string;
let dstTokenWhale: string;

export let twap: TWAP;
export let lens: Lens;

export let exchange: IExchange;
export let swapBidDataForUniV2: string;

export async function initFixture(blockNumber?: number | "latest") {
  await resetNetworkFork(blockNumber);
  await initAccounts();
  await initTokens();
  twap = await deployArtifact<TWAP>("TWAP", { from: deployer }, [wNativeToken.address]);
  lens = await deployArtifact<Lens>("Lens", { from: deployer }, [twap.options.address]);

  await fundSrcTokenFromWhale(user, userSrcTokenStartBalance);
  expect(await dstToken.methods.balanceOf(user).call()).bignumber.zero;
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
      wNativeToken = dstToken;
      srcTokenWhale = "0x55fe002aeff02f77364de339a1292923a15844b8";
      dstTokenWhale = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
      return;

    case "POLY":
      srcToken = erc20s.poly.USDC();
      dstToken = erc20s.poly.WETH();
      wNativeToken = erc20s.poly.WMATIC();
      srcTokenWhale = "0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245";
      dstTokenWhale = "0x72A53cDBBcc1b9efa39c834A540550e23463AAcB";
      return;

    case "FTM":
      srcToken = erc20s.ftm.USDC();
      dstToken = erc20s.ftm.WETH();
      wNativeToken = erc20s.ftm.WFTM();
      srcTokenWhale = "0x95bf7E307BC1ab0BA38ae10fc27084bC36FcD605";
      dstTokenWhale = "0x25c130B2624CF12A4Ea30143eF50c5D68cEFA22f";
      return;

    case "AVAX":
      srcToken = erc20s.avax.USDC();
      dstToken = erc20s.avax.WETHe();
      wNativeToken = erc20s.avax.WAVAX();
      srcTokenWhale = "0x4aeFa39caEAdD662aE31ab0CE7c8C2c9c0a013E8";
      dstTokenWhale = "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8";
      return;

    default:
      throw new Error(`unhandled NETWORK ${process.env.NETWORK}`);
  }
}

export async function withUniswapV2Exchange(uniswapAddress?: string) {
  await withUniswapV2Path();
  const network = await currentNetwork();
  const exchangeAddress =
    uniswapAddress ||
    _.find(
      {
        eth: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // UniswapV2
        ftm: "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52", // Spiritswap V1
        poly: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // Quickswap
        avax: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", // Pangolin
      },
      (impl, k) => k === network!.shortname
    );
  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [exchangeAddress]);
}

const pangolinDaasSamplePartner = "0xFA1c2Ae5c52a02cbaD6A05CdcA89f032Fa3a4D0d";
export const pangolinDaasAskData = () => web3().eth.abi.encodeParameter("address", pangolinDaasSamplePartner);
export async function withParaswapExchange() {
  exchange = await deployArtifact<IExchange>("ParaswapExchange", { from: deployer }, [
    "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57", // Paraswap Augustus Swapper on all chains
  ]);
}

export async function withPangolinDaasExchange() {
  if ((await currentNetwork())?.id !== networks.avax.id) throw new Error("only on Avalanche");
  await withUniswapV2Path();
  exchange = await deployArtifact<IExchange>("PangolinDaasExchange", { from: deployer }, [
    "0xEfd958c7C68b7e6a88300E039cAE275ca741007F", // PangolinRouterSupportingFees on Avalanche
  ]);
}

async function withUniswapV2Path() {
  const network = await currentNetwork();
  const paths = {
    eth: [srcToken.address, dstToken.address],
    ftm: [srcToken.address, wNativeToken.address, dstToken.address],
    poly: [srcToken.address, dstToken.address],
    avax: [srcToken.address, wNativeToken.address, dstToken.address],
  };
  const path = _.find(paths, (p, k) => k === network!.shortname)!;
  swapBidDataForUniV2 = web3().eth.abi.encodeParameters(["bool", "address[]"], [false, path]);
}

export async function fundSrcTokenFromWhale(target: string, amount: number) {
  tag(srcTokenWhale, "srcTokenWhale");
  await impersonate(srcTokenWhale);
  await setBalance(srcTokenWhale, await wNativeToken.amount(10e6));
  expect(await srcToken.methods.balanceOf(srcTokenWhale).call()).bignumber.gte(await srcToken.amount(amount));
  await srcToken.methods.transfer(target, await srcToken.amount(amount)).send({ from: srcTokenWhale });
  expect(await srcToken.methods.balanceOf(target).call()).bignumber.eq(await srcToken.amount(amount));
}

async function fundDstTokenFromWhale(target: string, amount: number) {
  tag(dstTokenWhale, "dstTokenWhale");
  await impersonate(dstTokenWhale);
  await setBalance(dstTokenWhale, await wNativeToken.amount(10e6));
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
