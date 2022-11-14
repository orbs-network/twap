import { expect } from "chai";
import {
  dstToken,
  exchange,
  fundSrcTokenFromWhale,
  initFixture,
  srcToken,
  swapDataForUniV2,
  taker,
  twap,
  user,
  withUniswapV2Exchange,
} from "./fixture";
import { ask, bid, fill, order, time } from "./twap-utils";
import { account, block, parseEvents, zero, zeroAddress } from "@defi.org/web3-candies";
import { expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";

describe("Sanity", () => {
  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  it("version", async () => {
    expect(await twap.methods.VERSION().call()).bignumber.eq(2);
  });

  it("maker creates ask order, emits event", async () => {
    expect(await twap.methods.length().call()).bignumber.zero;

    const deadline = (await time()) + 100;
    const tx = await ask(3, 2, 1, deadline);
    const blockTimeAtCreation = await time();

    const events = parseEvents(tx, twap);
    expect(events[0].event).eq("OrderCreated");
    expect(events[0].returnValues.id).eq("0");
    expect(events[0].returnValues.maker).eq(user);
    expect(events[0].returnValues.ask[6]).eq(srcToken.address);
    expect(await twap.methods.length().call()).bignumber.eq("1");

    const o = await order(0);
    expect(o.id).bignumber.zero;

    expect(o.status).eq(deadline.toString());

    expect(o.ask.time).bignumber.eq(blockTimeAtCreation.toString());
    expect(o.ask.deadline).bignumber.eq(deadline.toString());
    expect(o.ask.bidDelay).bignumber.eq(10);
    expect(o.ask.fillDelay).bignumber.eq(0);
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
    expect(o.bid.dstAmount).bignumber.zero;
    expect(o.bid.dstFee).bignumber.zero;
    expect(o.bid.data).deep.eq("0x");

    expect(o.filledTime).bignumber.zero;
    expect(o.srcFilledAmount).bignumber.zero;
  });

  it("bid sets Bid fields, emits event", async () => {
    await ask(2000, 2000, 1);
    const tx = await bid(0);
    const o = await order(0);
    expect(o.bid.taker).eq(taker);
    expect(o.bid.exchange).eq(exchange.options.address);
    expect(o.bid.data).deep.eq(swapDataForUniV2);
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
    await ask(2000, 1000, 0.5);
    await bid(0);
    await mineBlock(30);
    const tx = await fill(0);

    const o = await order(0);
    expect(o.filledTime).bignumber.eq((await time()).toString());
    expect(o.srcFilledAmount).bignumber.eq(await srcToken.amount(1000));

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
    expect(events[0].returnValues.srcAmountIn).bignumber.eq(await srcToken.amount(1000));
    expect(events[0].returnValues.dstAmountOut)
      .bignumber.gte(await dstToken.amount(0.5))
      .closeTo(await dstToken.amount(0.5), await dstToken.amount(0.1));
    expect(events[0].returnValues.dstFee).bignumber.eq(await dstToken.amount(0.01));
    expect(events[0].returnValues.srcFilledAmount).bignumber.eq(o.srcFilledAmount);
  });

  it("cancel order, emits event", async () => {
    await ask(2000, 1000, 0.5);
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
    await ask(2000, 1000, 0.5);
    await bid(0);
    await mineBlock(10);
    await fill(0);
    await mineBlock(60);
    await bid(0);
    await mineBlock(10);
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
      await ask(2000, 1000, 0.5);

      await ask(4000, 2000, 1);
      await twap.methods.cancel(1).send({ from: user });

      await fundSrcTokenFromWhale(await account(6), 8000);
      await ask(8000, 4000, 2, undefined, undefined, undefined, undefined, await account(6));

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

    it("makerOrders has mapping of order ids by maker address, to avoid relying on events", async () => {
      expect(await twap.methods.orderIdsByMaker(user).call()).deep.eq(["0", "1", "3"]);
    });
  });
});
