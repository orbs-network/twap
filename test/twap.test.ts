import { account, erc20s, expectRevert, parseEvents, useChaiBN } from "@defi.org/web3-candies";
import { deployer, dstToken, exchange, initFixture, srcToken, twap, user, withMockExchange } from "./fixture";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { ask, bid, expectFilled, fill, order, srcDstPathData } from "./twap-utils";

useChaiBN();

describe("TWAP", async () => {
  beforeEach(initFixture);

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

      await mineBlock(60);
    }

    await expectFilled(0, 10_000, 5);
  });

  it("last chunk may be partial amount", async () => {
    await ask(10_000, 4000, 2);

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
      .bid(0, exchange.options.address, await dstToken.amount(0.001), srcDstPathData())
      .send({ from: await account(5) });

    expect((await order(0)).bid.taker).eq(await account(5));
    expect((await order(0)).bid.dstFee).bignumber.eq(await dstToken.amount(0.001));
  });

  it("clears stale unfilled bid after max bidding window", async () => {
    expect(await twap.methods.MAX_BID_WINDOW_SECONDS().call()).bignumber.eq("60");
    await ask(2000, 1000, 0.5);
    await bid(0);

    await mineBlock(58);
    await expectRevert(() => bid(0), "low bid");

    await mineBlock(1);
    await bid(0);
  });

  it("supports market orders, english auction incentivizes best competitive price", async () => {
    await ask(2000, 1000, 0.000001);
    await bid(0, undefined, 0.4);
    await bid(0, undefined, 0.3);
    await bid(0, undefined, 0.1);
    await bid(0, undefined, 0.01);
    await mineBlock(10);
    await fill(0);
    await expectFilled(0, 1000, 0.5);
  });

  describe("prune stale invalid order", async () => {
    it("when no approval", async () => {
      await ask(2000, 1000, 0.5);

      await twap.methods.prune(0).send({ from: deployer });
      expect((await order(0)).status).eq(await twap.methods.STATUS_OPEN().call());

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
