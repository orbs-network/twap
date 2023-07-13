import { account, block, parseEvents, zero, zeroAddress } from "@defi.org/web3-candies";
import { expectRevert, mineBlock, useChaiBigNumber } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import _ from "lodash";
import {
  ask,
  bid,
  dstToken,
  exchange,
  fill,
  fundSrcTokenFromWhale,
  initFixture,
  order,
  srcToken,
  swapBidDataForUniV2,
  taker,
  time,
  twap,
  user,
  withUniswapV2Exchange,
} from "./fixture";

useChaiBigNumber();

describe("Sanity", () => {
  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  it("maker creates ask order, emits event", async () => {
    expect(await twap.methods.length().call()).bignumber.zero;

    const deadline = (await time()) + 100;
    const tx = await ask({ srcBidAmount: 3000, dstMinAmount: 100, chunks: 3, deadline });
    const blockTimeAtCreation = await time();

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderCreated");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.maker).eq(user);
    expect(events[0].returnValues.ask.srcToken).eq(srcToken.address);
    expect(await twap.methods.length().call()).bignumber.eq("1");

    const o = await order(0);
    expect(o.id).bignumber.zero;
    expect(o.status).eq(deadline.toString());
    expect(o.maker).eq(user);
    expect(o.time).bignumber.eq(blockTimeAtCreation.toString());
    expect(o.ask.deadline).bignumber.eq(deadline.toString());
    expect(o.ask.bidDelay).bignumber.eq(30);
    expect(o.ask.fillDelay).bignumber.eq(0);
    expect(o.ask.exchange).eq(zeroAddress);
    expect(o.ask.srcToken).eq(srcToken.address);
    expect(o.ask.dstToken).eq(dstToken.address);
    expect(o.ask.srcBidAmount).bignumber.eq(await srcToken.amount(3000));
    expect(o.ask.dstMinAmount).bignumber.eq(await dstToken.amount(100));
    expect(o.ask.count).bignumber.eq(3);

    expect(o.bid.time).bignumber.zero;
    expect(o.bid.taker).eq(zeroAddress);
    expect(o.bid.exchange).eq(zeroAddress);
    expect(o.bid.dstAmount).bignumber.zero;
    expect(o.bid.dstFee).bignumber.zero;
    expect(o.bid.data).deep.eq("0x");

    expect(o.filled.time).bignumber.zero;
    expect(o.filled.count).bignumber.zero;
    expect(o.filled.dstAmount).bignumber.zero;
    expect(o.filled.dstFee).bignumber.zero;
  });

  it("bid sets Bid fields, emits event", async () => {
    await ask({ srcBidAmount: 2000 });
    const tx = await bid(0);
    const o = await order(0);
    expect(o.bid.taker).eq(taker);
    expect(o.bid.exchange).eq(exchange.options.address);
    expect(o.bid.data).deep.eq(swapBidDataForUniV2);
    expect(o.bid.dstFee).bignumber.eq(await dstToken.amount(0.01));
    expect(o.bid.dstAmount)
      .bignumber.gte(await dstToken.amount(1))
      .closeTo(await dstToken.amount(1), await dstToken.amount(0.2));
    expect(o.bid.time).bignumber.eq((await time()).toString());

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderBid");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.maker).eq(user);
    expect(events[0].returnValues.exchange).eq(exchange.options.address);
    expect(events[0].returnValues.bid[0]).eq(o.bid.time);
  });

  it("fill sets Fill fields and clears the Bid, emits event", async () => {
    await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2 });
    await bid(0);
    await mineBlock(30);
    const tx = await fill(0);

    const o = await order(0);
    expect(o.filled.time).bignumber.eq((await time()).toString());
    expect(o.filled.count).bignumber.eq(1);
    expect(o.filled.dstAmount).bignumber.gte(0.5);
    expect(o.filled.dstFee).bignumber.eq(await dstToken.amount(0.01));

    expect(o.bid.taker).eq(zeroAddress);
    expect(o.bid.time).bignumber.zero;
    expect(o.bid.exchange).eq(zeroAddress);
    expect(o.bid.dstAmount).bignumber.zero;
    expect(o.bid.dstFee).bignumber.zero;
    expect(o.bid.data).deep.eq("0x");

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderFilled");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.taker).eq(taker);
    expect(events[0].returnValues.count).bignumber.eq(1);
    expect(events[0].returnValues.dstAmount)
      .bignumber.gte(await dstToken.amount(0.5))
      .closeTo(await dstToken.amount(0.5), await dstToken.amount(0.1));
    expect(events[0].returnValues.dstFee).bignumber.eq(await dstToken.amount(0.01));
  });

  it("cancel order, emits event", async () => {
    await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2 });
    const tx = await twap.methods.cancel(0).send({ from: user });
    const o = await order(0);
    expect(o.ask.deadline).bignumber.not.eq(zero);
    expect(o.status)
      .eq(await twap.methods.STATUS_CANCELED().call())
      .eq("1");
    await expectRevert(() => bid(0), "status");

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderCanceled");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.sender).eq(user);
  });

  it("order fully filled, emits event", async () => {
    await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2 });
    await bid(0);
    await mineBlock(60);
    await fill(0);
    await mineBlock(60);
    await bid(0);
    await mineBlock(60);
    const tx = await fill(0);
    const o = await order(0);
    expect(o.ask.deadline).bignumber.not.eq(zero);
    expect(o.status)
      .eq(await twap.methods.STATUS_COMPLETED().call())
      .eq("2");
    await expectRevert(() => bid(0), "status");

    const events = parseEvents(tx, twap);
    expect(events[1].event).eq("OrderCompleted");
    expect(events[1].returnValues.id).eq("0");
    expect(events[1].returnValues.taker).eq(taker);
  });

  describe("History", async () => {
    beforeEach(async () => {
      await ask({ srcBidAmount: 1234, dstMinAmount: 0.5, chunks: 2 });

      await ask({ srcBidAmount: 4567, dstMinAmount: 1, chunks: 2 });
      await twap.methods.cancel(1).send({ from: user });

      await fundSrcTokenFromWhale(await account(6), 8000);
      await ask({ srcBidAmount: 123, dstMinAmount: 2, chunks: 2, user: await account(6) });

      await ask({ srcBidAmount: 321, dstMinAmount: 0.5, chunks: 1, deadline: (await time()) + 10 });
      await mineBlock(60);
    });

    it("find orders for maker", async () => {
      const toBlock = (await block()).number;
      const fromBlock = toBlock - 10;
      const events = await twap.getPastEvents("OrderCreated", { fromBlock, toBlock, filter: { maker: user } });
      expect(_.map(events, (e) => e.returnValues.id)).deep.eq(["0", "1", "3"]);
      expect((await order(0)).ask.srcBidAmount).bignumber.eq(await srcToken.amount(1234));
      expect((await order(1)).ask.srcBidAmount).bignumber.eq(await srcToken.amount(4567));
      expect((await order(3)).ask.srcBidAmount).bignumber.eq(await srcToken.amount(321));
    });

    it("makerOrders has mapping of order ids by maker address, to avoid relying on events", async () => {
      expect(await (twap as any).methods.makerOrders(user).call()).deep.eq(["0", "1", "3"]);
    });
  });
});
