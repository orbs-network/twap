import { deployArtifact, impersonate, resetNetworkFork, tag } from "@defi.org/web3-candies/dist/hardhat";
import { account, block, erc20s, Token, useChaiBN } from "@defi.org/web3-candies";
import { expect } from "chai";
import { DOTC, Quoter, Taker } from "../typechain-hardhat/contracts";
import { IExchange } from "../typechain-hardhat/contracts/Interfaces.sol";

useChaiBN();

export let user: string;
export let takerOwner: string;

export let deployer: string;
export let quoter: Quoter;
export let dotc: DOTC;
export let taker: Taker;
export let exchange: IExchange;

export let srcToken: Token;
export let dstToken: Token;
let router: string;

const userSrcTokenStartBalance = 1_000_000;

beforeEach(async () => {
  await resetNetworkFork();

  await initAccounts();
  await initExternals();

  exchange = await deployArtifact<IExchange>("UniswapV2Exchange", { from: deployer }, [router]);
  quoter = await deployArtifact<Quoter>("Quoter", { from: deployer }, [exchange.options.address]);
  dotc = await deployArtifact<DOTC>("DOTC", { from: deployer });
  taker = await deployArtifact<Taker>("Taker", { from: deployer }, [
    takerOwner,
    dotc.options.address,
    exchange.options.address,
  ]);
});

async function initAccounts() {
  user = await account(1);
  takerOwner = await account(2);
  deployer = await account(3);
  tag(user, "user");
  tag(takerOwner, "takerOwner");
  tag(deployer, "deployer");
}

async function initExternals() {
  srcToken = erc20s.eth.USDC();
  dstToken = erc20s.eth.WETH();

  const ethUniswapV2Router = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
  const ethSushiswapRouter = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
  const polyQuickswapRouter = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

  router = ethUniswapV2Router;

  const srcTokenWhale = "0x55fe002aeff02f77364de339a1292923a15844b8";
  tag(srcTokenWhale, "srcTokenWhale");
  await impersonate(srcTokenWhale);
  await srcToken.methods.transfer(user, await srcToken.amount(userSrcTokenStartBalance)).send({ from: srcTokenWhale });
  expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(await srcToken.amount(userSrcTokenStartBalance));
}

export async function ask(srcAmount: number, srcRate: number, dstRate: number, deadline: number = 0) {
  deadline = deadline || (await time()) + 1000;
  const _srcAmount = await srcToken.amount(srcAmount);
  const _srcRate = await srcToken.amount(srcRate);
  const _dstRate = await dstToken.amount(dstRate);
  await srcToken.methods.approve(dotc.options.address, _srcAmount).send({ from: user });
  return dotc.methods
    .ask(srcToken.address, dstToken.address, _srcAmount, _srcRate, _dstRate, deadline)
    .send({ from: user });
}

export async function bid(id: number) {
  return taker.methods.bid(id, [srcToken.options.address, dstToken.options.address]).send({ from: takerOwner });
}

export async function fill(id: number) {
  return taker.methods.fill(id).send({ from: takerOwner });
}

export async function order(id: number): Promise<any> {
  return dotc.methods.order(id).call();
}

export async function expectFilled(id: number, srcExactAmount: number, dstMinAmount: number) {
  expect((await order(id)).filled.amount).bignumber.eq(await srcToken.amount(srcExactAmount));

  expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
    await srcToken.amount(userSrcTokenStartBalance - srcExactAmount)
  );

  expect(await dstToken.methods.balanceOf(user).call())
    .bignumber.gte(await dstToken.amount(dstMinAmount))
    .closeTo(await dstToken.amount(dstMinAmount), await dstToken.amount(dstMinAmount * 0.1));
}

export const describeOnETH = process.env.NETWORK == "ETH" ? describe : xdescribe;

export async function time() {
  return (await block()).timestamp;
}
