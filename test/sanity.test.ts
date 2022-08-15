import { expect } from "chai";
import { twap, dstToken, exchange, initFixture, srcToken, taker, user, fundSrcTokenFromWhale } from "./fixture";
import { ask, bid, fill, order, srcDstPathData, time } from "./twap-utils";
import { account, block, expectRevert, parseEvents, zeroAddress } from "@defi.org/web3-candies";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";

describe("Sanity", () => {
  beforeEach(initFixture);

  it("maker creates ask order, emits event", async () => {
    expect(await twap.methods.length().call()).bignumber.zero;

    const deadline = (await time()) + 100;
    const tx = await ask(3, 2, 1, deadline);
    const blockTimeAtCreation = await time();

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderCreated");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.maker).eq(user);
    expect(await twap.methods.length().call()).bignumber.eq("1");

    const o = await order(0);
    expect(o.id).bignumber.zero;

    expect(o.ask.time).bignumber.eq(blockTimeAtCreation.toString());
    expect(o.ask.deadline).bignumber.eq(deadline.toString());
    expect(o.ask.maker).eq(user);
    expect(o.ask.exchange).eq(zeroAddress);
    expect(o.ask.srcToken).eq(srcToken.address);
    expect(o.ask.dstToken).eq(dstToken.address);
    expect(o.ask.srcAmount).bignumber.eq(await srcToken.amount(3));
    expect(o.ask.srcBidAmount).bignumber.eq(await srcToken.amount(2));
    expect(o.ask.dstMinAmount).bignumber.eq(await dstToken.amount(1));
    expect(o.ask.delay).bignumber.eq("60");

    expect(o.bid.time).bignumber.zero;
    expect(o.bid.taker).eq(zeroAddress);
    expect(o.bid.exchange).eq(zeroAddress);
    expect(o.bid.data).deep.eq("0x");
    expect(o.bid.amount).bignumber.zero;
    expect(o.bid.fee).bignumber.zero;

    expect(o.filled.time).bignumber.zero;
    expect(o.filled.amount).bignumber.zero;
  });

  it("bid sets Bid fields", async () => {
    await ask(2000, 2000, 1);
    await bid(0);
    const o = await order(0);
    expect(o.bid.taker).eq(taker);
    expect(o.bid.exchange).eq(exchange.options.address);
    expect(o.bid.data).deep.eq(srcDstPathData());
    expect(o.bid.fee).bignumber.eq(await dstToken.amount(0.01));
    expect(o.bid.amount)
      .bignumber.gte(await dstToken.amount(1))
      .closeTo(await dstToken.amount(1), await dstToken.amount(0.2));
    expect(o.bid.time).bignumber.eq((await time()).toString());
  });

  it("fill sets Fill fields and clears the Bid, emits event", async () => {
    await ask(2000, 1000, 0.5);
    await bid(0);
    await mineBlock(30);
    const tx = await fill(0);

    const o = await order(0);
    expect(o.filled.time).bignumber.eq((await time()).toString());
    expect(o.filled.amount).bignumber.eq(await srcToken.amount(1000));

    expect(o.bid.taker).eq(zeroAddress);
    expect(o.bid.exchange).eq(zeroAddress);
    expect(o.bid.data).deep.eq("0x");
    expect(o.bid.amount).bignumber.zero;
    expect(o.bid.time).bignumber.zero;
    expect(o.bid.fee).bignumber.zero;

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderFilled");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.taker).eq(taker);
    expect(events[0].returnValues.srcAmountIn).bignumber.eq(await srcToken.amount(1000));
    expect(events[0].returnValues.dstAmountOut)
      .bignumber.gte(await dstToken.amount(0.5))
      .closeTo(await dstToken.amount(0.5), await dstToken.amount(0.1));
    expect(events[0].returnValues.fee).bignumber.eq(await dstToken.amount(0.01));
  });

  it("cancel order", async () => {
    await ask(2000, 1000, 0.5);
    await twap.methods.cancel(0).send({ from: user });
    const o = await order(0);
    expect(o.ask.deadline).bignumber.zero;
    await expectRevert(() => bid(0), "expired");
  });

  describe("History", async () => {
    beforeEach(async () => {
      await ask(2000, 1000, 0.5);

      await ask(4000, 2000, 1);
      await twap.methods.cancel(1).send({ from: user });

      await fundSrcTokenFromWhale(await account(6), 8000);
      await ask(8000, 4000, 2, undefined, undefined, undefined, await account(6));

      await ask(1000, 1000, 0.5, (await time()) + 10);
      await mineBlock(10);
    });

    it("find orders for maker", async () => {
      const toBlock = (await block()).number;
      const fromBlock = toBlock - 1000;
      const events = await twap.getPastEvents("OrderCreated", { fromBlock, toBlock, filter: { maker: user } });
      expect(_.map(events, (e) => e.returnValues.id)).deep.eq(["0", "1", "3"]);
      expect((await order(0)).ask.srcAmount).bignumber.eq(await srcToken.amount(2000));
      expect((await order(1)).ask.srcAmount).bignumber.eq(await srcToken.amount(4000));
      expect((await order(3)).ask.srcAmount).bignumber.eq(await srcToken.amount(1000));
    });
  });
});
