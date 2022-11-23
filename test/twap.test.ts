import { account, chainId, parseEvents, web3, zeroAddress } from "@defi.org/web3-candies";
import {
  asTokenData,
  deployer,
  dstToken,
  exchange,
  initFixture,
  wNativeToken,
  setMockExchangeAmountOut,
  srcToken,
  swapDataForUniV2,
  taker,
  twap,
  user,
  userSrcTokenStartBalance,
  withMockExchange,
  withParaswapExchange,
  withUniswapV2Exchange,
} from "./fixture";
import { expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { ask, bid, endTime, expectFilled, fill, order } from "./twap-utils";
import { Paraswap } from "../src/paraswap";
import BigNumber from "bignumber.js";

describe("TWAP", async () => {
  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  it("single chunk", async () => {
    await ask(2000, 2000, 1);
    await bid(0);
    await mineBlock(10);
    await fill(0);

    await expectFilled(0, 2000, 1);
  });

  it("mutiple chunks", async () => {
    await ask(10_000, 2500, 1.25);

    for (let i = 1; i <= 4; i++) {
      await bid(0);
      await mineBlock(10);
      await fill(0);
      await expectFilled(0, 2500 * i, 1.25 * i);
    }

    await expectFilled(0, 10_000, 5);
  });

  it("last chunk may be partial amount", async () => {
    await ask(10_000, 4000, 2, undefined, undefined, undefined, 60);

    await bid(0);
    await mineBlock(10);
    await fill(0);
    await mineBlock(60);

    await bid(0);
    await mineBlock(10);
    await fill(0);
    await mineBlock(60);

    await expectFilled(0, 8000, 4);

    await bid(0);
    await mineBlock(10);
    await fill(0);
    await expectFilled(0, 10_000, 5);
  });

  it("outbid current bid within pending period", async () => {
    await ask(2000, 1000, 0.5);

    await bid(0);
    await mineBlock(1);

    await withMockExchange(0.6);
    await bid(0);

    await mineBlock(10);
    await fill(0);
    await expectFilled(0, 1000, 0.59); // 0.01 taker fee
  });

  it("outbid current bid within pending period same path and amount but lower fee", async () => {
    await ask(2000, 1000, 0.5);

    await bid(0);
    expect((await order(0)).bid.dstFee).bignumber.eq(await dstToken.amount(0.01));
    await mineBlock(1);

    await twap.methods
      .bid(0, exchange.options.address, await dstToken.amount(0.001), 0, swapDataForUniV2)
      .send({ from: await account(5) });

    expect((await order(0)).bid.taker).eq(await account(5));
    expect((await order(0)).bid.dstFee).bignumber.eq(await dstToken.amount(0.001));
  });

  it("enforce bids 1% better than previous", async () => {
    await ask(2000, 1000, 0.5);
    await withMockExchange(100);
    await bid(0);

    await setMockExchangeAmountOut(100.999);
    await expectRevert(() => bid(0), "low bid");

    await setMockExchangeAmountOut(101);
    await bid(0);
  });

  it("clears stale unfilled bid after max bidding window = bidDelay * STALE_BID_DELAY_MUL", async () => {
    expect(await twap.methods.STALE_BID_DELAY_MUL().call()).bignumber.eq(5);
    const bidDelay = 60;
    await ask(2000, 1000, 0.5, undefined, undefined, bidDelay);

    await withMockExchange(1);
    await bid(0);
    await setMockExchangeAmountOut(0.6);

    const notStaleYet = bidDelay * 5 - 5;
    expect(notStaleYet).eq(295);
    await mineBlock(295);
    await expectRevert(() => bid(0), "low bid");

    await mineBlock(5); // stale
    await bid(0); // lower bid won
  });

  it("supports market orders, english auction incentivizes best competitive price", async () => {
    await ask(2000, 1000, 0.000001);
    await bid(0, 0.4);
    await bid(0, 0.3);
    await bid(0, 0.1);
    await bid(0, 0.01);
    await mineBlock(10);
    await fill(0);
    await expectFilled(0, 1000, 0.5);
  });

  it("prevent winning the bid by manipulating exchange price", async () => {
    await ask(10_000, 2000, 0);

    await withMockExchange(100); // win the bid with very high price that no one can outbid
    await bid(0, 1);
    expect((await order(0)).bid.dstAmount).bignumber.eq(await dstToken.amount(99));
    expect((await order(0)).bid.dstFee).bignumber.eq(await dstToken.amount(1));

    await mineBlock(100);
    await setMockExchangeAmountOut(1.1); // bring price back to market
    await expectRevert(() => fill(0), "min out"); // enforces won bid price
  });

  it("slippage percent allows price slippage", async () => {
    await ask(10_000, 2000, 0);
    await withMockExchange(1000);
    await bid(0, 1.234, 10); // %10 slippage
    await mineBlock(10);

    await setMockExchangeAmountOut(850);
    await expectRevert(() => fill(0), "min out");
    await setMockExchangeAmountOut(899);
    await expectRevert(() => fill(0), "min out");

    await setMockExchangeAmountOut(900);
    await fill(0);
    await expectFilled(0, 2000, 900 - 1.234);
    await expect(await dstToken.methods.balanceOf(taker).call()).bignumber.eq(await dstToken.amount(1.234));
  });

  it("slippage percent at bid time is part of the bidding war", async () => {
    await ask(10_000, 2000, 0);
    await withMockExchange(100);
    await bid(0, 1, 10); // output 89
    await expectRevert(() => bid(0, 5, 10), "low bid"); // output 85
    await expectRevert(() => bid(0, 6, 5), "low bid"); // output 89
    await bid(0, 5, 5); // output 90
    await bid(0, 5, 1); // output 94
    await bid(0, 1, 1); // output 98
  });

  it("native token output support", async () => {
    await srcToken.methods.approve(twap.options.address, await srcToken.amount(100)).send({ from: user });
    await twap.methods
      .ask(
        exchange.options.address,
        srcToken.address,
        zeroAddress,
        await srcToken.amount(100),
        await srcToken.amount(100),
        1,
        endTime(),
        60,
        0
      )
      .send({ from: user });
    await bid(
      0,
      undefined,
      undefined,
      web3().eth.abi.encodeParameters(["bool", "address[]"], [false, [srcToken.address, wNativeToken.address]])
    );
    await mineBlock(60);
    const balanceBefore = await web3().eth.getBalance(user);
    await fill(0);
    expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
      (await srcToken.amount(userSrcTokenStartBalance)).minus(await srcToken.amount(100))
    );
    expect(await wNativeToken.methods.balanceOf(user).call()).bignumber.zero;
    expect(await dstToken.methods.balanceOf(user).call()).bignumber.zero;
    expect(await web3().eth.getBalance(user)).bignumber.gt(balanceBefore);
  });

  describe("prune stale invalid order", async () => {
    it("when no approval", async () => {
      await ask(2000, 1000, 0.5);

      await srcToken.methods.approve(twap.options.address, 0).send({ from: user });
      const tx = await twap.methods.prune(0).send({ from: deployer });
      expect((await order(0)).status).eq(await twap.methods.STATUS_CANCELED().call());

      const logs = parseEvents(tx, twap.options.jsonInterface);
      expect(logs[0].event).eq("OrderCanceled");
      expect(logs[0].returnValues.sender).eq(deployer);
      expect(logs[0].returnValues.id).eq("0");
    });

    it("when no balance", async () => {
      await ask(2000, 1000, 0.5);

      await srcToken.methods.transfer(deployer, await srcToken.methods.balanceOf(user).call()).send({ from: user });
      await twap.methods.prune(0).send({ from: deployer });
      expect((await order(0)).status).eq(await twap.methods.STATUS_CANCELED().call());
    });
  });
});
