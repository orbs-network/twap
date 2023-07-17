import {
  Token,
  account,
  chainId,
  erc20s,
  erc20sData,
  ether,
  network as cnet,
  networks,
  web3,
  erc20FromData,
} from "@defi.org/web3-candies";
import {
  deployArtifact,
  impersonate,
  resetNetworkFork,
  setBalance,
  tag,
  useChaiBigNumber,
} from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import _ from "lodash";
import type { IExchange, TWAP } from "../typechain-hardhat/contracts";
import { Lens } from "../typechain-hardhat/contracts/periphery";
import type { MockExchange } from "../typechain-hardhat/contracts/test";

useChaiBigNumber();

export let network: ReturnType<typeof cnet>;
export let user: string;
export let taker: string;
export let deployer: string;

export let srcToken: Token;
export let dstToken: Token;
export const userSrcTokenStartBalance = 1_000_000;

let srcTokenWhale: string;
let dstTokenWhale: string;

export let twap: TWAP;
export let lens: Lens;

export let exchange: IExchange;
export let swapBidDataForUniV2: string;

export async function initFixture(blockNumber?: number | "latest") {
  network = cnet(await chainId());
  await resetNetworkFork(blockNumber);
  await initAccounts();
  await initTokens();
  twap = await deployArtifact<TWAP>("TWAP", { from: deployer }, [network.wToken.address]);
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
  switch (await chainId()) {
    case networks.eth.id:
      srcToken = erc20s.eth.USDC();
      dstToken = erc20s.eth.WETH();
      srcTokenWhale = "0x55fe002aeff02f77364de339a1292923a15844b8";
      dstTokenWhale = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
      return;

    case networks.poly.id:
      srcToken = erc20s.poly.USDC();
      dstToken = erc20s.poly.WETH();
      srcTokenWhale = "0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245";
      dstTokenWhale = "0x72A53cDBBcc1b9efa39c834A540550e23463AAcB";
      return;

    case networks.ftm.id:
      srcToken = erc20s.ftm.USDC();
      dstToken = erc20s.ftm.WETH();
      srcTokenWhale = "0x95bf7E307BC1ab0BA38ae10fc27084bC36FcD605";
      dstTokenWhale = "0x25c130B2624CF12A4Ea30143eF50c5D68cEFA22f";
      return;

    case networks.avax.id:
      srcToken = erc20s.avax.USDC();
      dstToken = erc20s.avax.WETHe();
      srcTokenWhale = "0x4aeFa39caEAdD662aE31ab0CE7c8C2c9c0a013E8";
      dstTokenWhale = "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8";
      return;

    case networks.arb.id:
      srcToken = erc20s.arb.USDC();
      dstToken = erc20s.arb.WETH();
      srcTokenWhale = "0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6";
      dstTokenWhale = "0x489ee077994B6658eAfA855C308275EAd8097C4A";
      return;

    case networks.bsc.id:
      srcToken = erc20s.bsc.USDC();
      dstToken = erc20s.bsc.WETH();
      srcTokenWhale = "0x8894E0a0c962CB723c1976a4421c95949bE2D4E3";
      dstTokenWhale = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
      return;

    case networks.glmr.id:
      srcToken = erc20FromData({
        symbol: "USDC",
        decimals: 6,
        address: "0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9",
      });
      dstToken = erc20FromData({
        symbol: "WETH",
        decimals: 18,
        address: "0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7",
      });
      srcTokenWhale = "0x02e9081DfadD37A852F9a73C4d7d69e615E61334";
      dstTokenWhale = "0xc3090f41Eb54A7f18587FD6651d4D3ab477b07a4";
      return;

    default:
      throw new Error(`unhandled NETWORK ${process.env.NETWORK}`);
  }
}

export async function withUniswapV2Exchange(uniswapAddress?: string) {
  await withUniswapV2Path();
  const exchangeAddress =
    uniswapAddress ||
    _.find(
      {
        eth: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // UniswapV2
        ftm: "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52", // Spiritswap V1
        poly: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // Quickswap
        avax: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", // Pangolin
        arb: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", // Sushiswap
        bsc: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // Pancakeswap
        glmr: "0x70085a09d30d6f8c4ecf6ee10120d1847383bb57", // StellaSwap V2
      },
      (impl, k) => k === network.shortname
    );
  if (!exchangeAddress) throw new Error(`no UniswapV2 exchange for ${network.name}`);
  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [exchangeAddress]);
}

export async function withParaswapExchange() {
  exchange = await deployArtifact<IExchange>("ParaswapExchange", { from: deployer }, [
    "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57", // Paraswap Augustus Swapper on all chains
  ]);
}

export async function withOdosExchange() {
  if ((await chainId()) !== networks.arb.id) throw new Error("only on Arbitrum");
  exchange = await deployArtifact<IExchange>("OdosExchange", { from: deployer }, [
    "0xdd94018F54e565dbfc939F7C44a16e163FaAb331",
  ]);
}

export async function withOpenOceanExchange() {
  exchange = await deployArtifact<IExchange>("OpenOceanExchange", { from: deployer }, [
    "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // OpenOcean
  ]);
}

export const pangolinDaasSamplePartner = "0xFA1c2Ae5c52a02cbaD6A05CdcA89f032Fa3a4D0d";
export async function withPangolinDaasExchange() {
  if ((await chainId()) !== networks.avax.id) throw new Error("only on Avalanche");
  await withUniswapV2Path();
  exchange = await deployArtifact<IExchange>("PangolinDaasExchange", { from: deployer }, [
    "0xEfd958c7C68b7e6a88300E039cAE275ca741007F", // PangolinRouterSupportingFees on Avalanche
  ]);
}

async function withUniswapV2Path() {
  const paths = {
    eth: [srcToken.address, dstToken.address],
    ftm: [srcToken.address, erc20sData.ftm.WFTM.address, dstToken.address],
    poly: [srcToken.address, dstToken.address],
    avax: [srcToken.address, erc20sData.avax.WAVAX.address, dstToken.address],
    arb: [srcToken.address, dstToken.address],
    bsc: [srcToken.address, erc20sData.bsc.WBNB.address, dstToken.address],
    glmr: [srcToken.address, erc20sData.glmr.WGLMR.address, dstToken.address],
  };
  const path = paths[network.shortname];
  if (!path) throw new Error(`no UniswapV2 path for ${network?.name}`);
  swapBidDataForUniV2 = web3().eth.abi.encodeParameters(["bool", "address[]"], [false, path]);
}

export async function fundSrcTokenFromWhale(target: string, amount: number) {
  tag(srcTokenWhale, "srcTokenWhale");
  await impersonate(srcTokenWhale);
  await setBalance(srcTokenWhale, ether.times(100));
  expect(await srcToken.methods.balanceOf(srcTokenWhale).call()).bignumber.gte(await srcToken.amount(amount));
  await srcToken.methods.transfer(target, await srcToken.amount(amount)).send({ from: srcTokenWhale });
  expect(await srcToken.methods.balanceOf(target).call()).bignumber.eq(await srcToken.amount(amount));
}

async function fundDstToken(target: string, amount: number) {
  tag(dstTokenWhale, "dstTokenWhale");
  await impersonate(dstTokenWhale);
  await setBalance(dstTokenWhale, ether.times(100));
  await dstToken.methods.transfer(target, await dstToken.amount(amount)).send({ from: dstTokenWhale });
  expect(await dstToken.methods.balanceOf(target).call()).bignumber.eq(await dstToken.amount(amount));
}

export async function withMockExchange(dstAmountOut: number) {
  exchange = await deployArtifact("MockExchange", { from: deployer });
  await fundDstToken(exchange.options.address, 1_000);
  await setMockExchangeAmountOut(dstAmountOut);
}

export async function setMockExchangeAmountOut(dstAmountOut: number) {
  await (exchange as MockExchange).methods
    .setMockAmounts([0, await dstToken.amount(dstAmountOut)])
    .send({ from: deployer });
}
