import {
  deployer,
  dstToken,
  fundSrcTokenFromWhale,
  initFixture,
  lens,
  srcToken,
  taker,
  twap,
  user,
  withUniswapV2Exchange,
  ask,
  bid,
  endTime,
  fill,
  time,
} from "./fixture";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { account, maxUint256, zeroAddress } from "@defi.org/web3-candies";

describe("Lens", async () => {
  const PAGE_SIZE = 2000; // under 15m gas

  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  async function takerBiddableOrders() {
    const length = await lens.methods.length().call().then(parseInt);
    let result: any[] = [];
    for (let i = length - 1; i >= 0; i -= PAGE_SIZE) {
      result = result.concat(await lens.methods.takerBiddableOrders(taker, length - 1, PAGE_SIZE).call());
    }
    return result;
  }

  async function takerFillableOrders() {
    const length = await lens.methods.length().call().then(parseInt);
    let result: any[] = [];
    for (let i = length - 1; i >= 0; i -= PAGE_SIZE) {
      result = result.concat(await lens.methods.takerFillableOrders(taker, length - 1, PAGE_SIZE).call());
    }
    return result;
  }

  describe("taker biddable orders", async () => {
    it("filters valid bid orders for taker, by status, paginated", async () => {
      await ask({ srcBidAmount: 1000, deadline: endTime() });
      await ask({ srcBidAmount: 1000, deadline: (await time()) + 60 });
      await ask({ srcBidAmount: 1000, deadline: endTime() });
      await mineBlock(10_000);

      expect(await lens.methods.length().call().then(parseInt)).eq(3);

      const result = await takerBiddableOrders();
      expect(result).length(2);
      expect(result[0].id).eq("2");
      expect(result[1].id).eq("0");
    });

    it("filled orders", async () => {
      await ask({ srcBidAmount: 2000 });
      expect(await takerBiddableOrders()).length(1);
      await bid(0);
      await mineBlock(60);
      await fill(0);
      await mineBlock(60);
      expect(await takerBiddableOrders()).empty;
    });

    it("canceled orderes", async () => {
      await ask({ srcBidAmount: 2000 });
      await twap.methods.cancel(0).send({ from: user });
      expect(await takerBiddableOrders()).empty;
    });

    it("recently filled, after asked delay", async () => {
      await ask({ srcBidAmount: 1000, chunks: 2 });
      await ask({ srcBidAmount: 1000, chunks: 2 });
      await bid(0);
      await mineBlock(60);
      await fill(0);

      const result = await takerBiddableOrders();
      expect(result).length(1);
      expect(result[0].id).eq("1");
    });

    it("different taker, or stale bid", async () => {
      await ask({ srcBidAmount: 1000, chunks: 2 });
      await bid(0);
      expect(await takerBiddableOrders()).empty;
      await mineBlock(60 * 11);
      expect(await takerBiddableOrders()).length(1);
    });

    it("insufficient maker allowance and balance", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2 });
      await srcToken.methods.approve(twap.options.address, 100).send({ from: user });
      expect(await takerBiddableOrders()).empty;

      await srcToken.methods.approve(twap.options.address, maxUint256).send({ from: user });
      expect(await takerBiddableOrders()).length(1);

      await srcToken.methods.transfer(deployer, await srcToken.methods.balanceOf(user).call()).send({ from: user });
      expect(await takerBiddableOrders()).empty;
    });
  });

  describe("taker fillable orders", async () => {
    it("filter valid fillable orders for taker, paginated, not expired", async () => {
      await ask({ srcBidAmount: 1000, chunks: 2, deadline: endTime() });
      await bid(0);
      await ask({ srcBidAmount: 1000, chunks: 2, deadline: (await time()) + 60 });
      await bid(1);
      await ask({ srcBidAmount: 1000, chunks: 2, deadline: endTime() });
      await bid(2);
      await mineBlock(10000);

      expect(await lens.methods.length().call().then(parseInt)).eq(3);

      const result = await takerFillableOrders();
      expect(result).length(2);
      expect(result[0].id).eq("2");
      expect(result[1].id).eq("0");
    });

    it("taker won the bid after pending bid window", async () => {
      await ask({ srcBidAmount: 2000 });
      await bid(0);
      expect(await takerFillableOrders()).empty;
      await mineBlock(60);
      expect(await takerFillableOrders()).length(1);
    });

    it("filled", async () => {
      await ask({ srcBidAmount: 2000 });
      await bid(0);
      await mineBlock(60);
      await fill(0);
      expect(await takerFillableOrders()).empty;
    });

    it("expired", async () => {
      await ask({ srcBidAmount: 2000, deadline: (await time()) + 60 });
      await bid(0);
      await mineBlock(1e6);
      expect(await takerFillableOrders()).empty;
    });

    it("canceled", async () => {
      await ask({ srcBidAmount: 2000 });
      await bid(0);
      await mineBlock(60);
      await twap.methods.cancel(0).send({ from: user });
      expect(await takerFillableOrders()).empty;
    });

    it("maker allowance and balance", async () => {
      await ask({ srcBidAmount: 1000, chunks: 2 });
      await bid(0);
      await mineBlock(60);
      await srcToken.methods.approve(twap.options.address, 0).send({ from: user });
      expect(await takerFillableOrders()).empty;

      await srcToken.methods.approve(twap.options.address, maxUint256).send({ from: user });
      expect(await takerFillableOrders()).length(1);

      await srcToken.methods.transfer(deployer, await srcToken.methods.balanceOf(user).call()).send({ from: user });
      expect(await takerFillableOrders()).empty;
    });
  });

  describe("maker orders", () => {
    beforeEach(async () => {
      await ask({ srcBidAmount: 2000, chunks: 5 });
      const otherUser = await account(9);
      await fundSrcTokenFromWhale(otherUser, 1);
      await srcToken.methods.approve(twap.options.address, maxUint256).send({ from: otherUser });
      await twap.methods
        .ask([zeroAddress, srcToken.address, dstToken.address, 1, 1, 1, endTime(), 60, 60, []])
        .send({ from: otherUser });
      await ask({ srcBidAmount: 3000, chunks: 5, dstMinAmount: 1 });
      await twap.methods.cancel(0).send({ from: user });
    });

    it("returns all maker orders", async () => {
      const allOrders: any[] = await lens.methods.makerOrders(user).call();
      expect(allOrders).length(2);
      expect(allOrders[0].id).eq("0");
      expect(allOrders[0].ask.srcBidAmount).bignumber.eq(await srcToken.amount(2_000));
      expect(allOrders[1].id).eq("2");
      expect(allOrders[1].ask.srcBidAmount).bignumber.eq(await srcToken.amount(3_000));
    });
  });
});
