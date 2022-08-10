import { expect } from "chai";
import { dotc, dstToken, exchange, initFixture, srcToken, taker, user } from "./fixture";
import { ask, bid, fill, order, srcDstPathData, time } from "./dotc-utils";
import { expectRevert, parseEvents, zeroAddress } from "@defi.org/web3-candies";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";

describe("Sanity", () => {
  beforeEach(initFixture);

  it("maker creates ask order, emits event", async () => {
    expect(await dotc.methods.length().call()).bignumber.zero;

    const deadline = (await time()) + 100;
    const tx = await ask(3, 2, 1, deadline);
    const blockTimeAtCreation = await time();

    const events = parseEvents(tx, dotc);
    expect(events[0].event).eq("OrderCreated");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.maker).eq(user);
    expect(await dotc.methods.length().call()).bignumber.eq("1");

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

    const events = parseEvents(tx, dotc);
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
    await dotc.methods.cancel(0).send({ from: user });
    const o = await order(0);
    expect(o.ask.deadline).bignumber.zero;
    await expectRevert(() => bid(0), "expired");
  });
});
