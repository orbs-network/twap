import { twap, dstToken, exchange, initFixture, nativeToken, taker } from "./fixture";
import { deployArtifact, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { ask, expectFilled, srcDstPathData } from "./twap-utils";
import { web3, zeroAddress } from "@defi.org/web3-candies";
import type { Bidder } from "../typechain-hardhat/contracts/bidder";

describe("Bidder", async () => {
  let bidder: Bidder;

  beforeEach(initFixture);

  beforeEach(async () => {
    bidder = await deployArtifact<Bidder>("Bidder", { from: taker }, [twap.options.address, nativeToken.address]);
    await ask(2000, 1000, 0.5);
  });

  afterEach(async () => {
    expect(await dstToken.methods.balanceOf(bidder.options.address).call()).bignumber.zero;
    expect(await nativeToken.methods.balanceOf(bidder.options.address).call()).bignumber.zero;
    expect(await web3().eth.getBalance(bidder.options.address)).bignumber.zero;
  });

  it("sanity", async () => {
    expect(await bidder.methods.owner().call()).eq(taker);
    expect(await bidder.methods.twap().call()).eq(twap.options.address);
    expect(await bidder.methods.weth().call()).eq(nativeToken.address);
  });

  it("bid & fill, gas rebate as dstToken without swapping", async () => {
    await bid();
    await mineBlock(10);

    const dstTokenBefore = await dstToken.methods.balanceOf(taker).call();
    await fill(zeroAddress, 0, []);

    await expectFilled(0, 1000, 0.5);
    expect(await dstToken.methods.balanceOf(taker).call()).bignumber.gte(dstTokenBefore);
  });

  it("gas rebate when dstToken == nativeToken, unwrap", async function () {
    if (process.env.NETWORK !== "ETH") return this.skip();

    await bid();
    await mineBlock(10);

    const nativeBefore = await web3().eth.getBalance(taker);
    await fill(zeroAddress);

    await expectFilled(0, 1000, 0.5);
    expect(await web3().eth.getBalance(taker)).bignumber.gte(nativeBefore);
  });

  it("gas rebate swapping to native token", async function () {
    if (process.env.NETWORK !== "POLY") return this.skip();

    await bid();
    await mineBlock(10);

    const nativeBefore = await web3().eth.getBalance(taker);
    await fill(exchange.options.address);

    await expectFilled(0, 1000, 0.5);
    expect(await web3().eth.getBalance(taker)).bignumber.gte(nativeBefore);
  });

  async function bid() {
    await bidder.methods
      .bid(0, exchange.options.address, srcDstPathData(), await dstToken.amount(0.01))
      .send({ from: taker });
  }

  async function fill(
    feeExchange: string,
    feeMinAmountOut: number = 0,
    feeData: string | number[] = web3().eth.abi.encodeParameter("address[]", [dstToken.address, nativeToken.address])
  ) {
    await bidder.methods.fill(0, feeExchange, await nativeToken.amount(feeMinAmountOut), feeData).send({ from: taker });
  }
});
