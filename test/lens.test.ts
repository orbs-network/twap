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
} from "./fixture";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { ask, bid, endTime, fill } from "./twap-utils";
import { expect } from "chai";
import { account, maxUint256, zeroAddress } from "@defi.org/web3-candies";
import type { Lens } from "../typechain-hardhat/contracts/periphery";

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
      await ask(2000, 1000, 0.5, endTime());
      await ask(2000, 1000, 0.5);
      await ask(2000, 1000, 0.5, endTime());
      await mineBlock(10_000);

      expect(await lens.methods.length().call().then(parseInt)).eq(3);

      const result = await takerBiddableOrders();
      expect(result).length(2);
      expect(result[0].id).eq("2");
      expect(result[1].id).eq("0");
    });

    it("filled orders", async () => {
      await ask(2000, 2000, 1);
      expect(await takerBiddableOrders()).length(1);
      await bid(0);
      await mineBlock(10);
      await fill(0);
      await mineBlock(60);
      expect(await takerBiddableOrders()).empty;
    });

    it("canceled orderes", async () => {
      await ask(2000, 2000, 1);
      await twap.methods.cancel(0).send({ from: user });
      expect(await takerBiddableOrders()).empty;
    });

    it("recently filled, after asked delay", async () => {
      await ask(2000, 1000, 0.5);
      await ask(2000, 1000, 0.5);
      await bid(0);
      await mineBlock(10);
      await fill(0);

      const result = await takerBiddableOrders();
      expect(result).length(1);
      expect(result[0].id).eq("1");
    });

    it("different taker, or stale bid", async () => {
      await ask(2000, 1000, 0.5);
      await bid(0);
      expect(await takerBiddableOrders()).empty;
      await mineBlock(61);
      expect(await takerBiddableOrders()).length(1);
    });

    it("insufficient maker allowance and balance", async () => {
      await ask(2000, 1000, 0.5);
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
      await ask(2000, 1000, 0.5, endTime());
      await bid(0);
      await ask(2000, 1000, 0.5);
      await bid(1);
      await ask(2000, 1000, 0.5, endTime());
      await bid(2);
      await mineBlock(10000);

      expect(await lens.methods.length().call().then(parseInt)).eq(3);

      const result = await takerFillableOrders();
      expect(result).length(2);
      expect(result[0].id).eq("2");
      expect(result[1].id).eq("0");
    });

    it("taker won the bid after pending bid window", async () => {
      await ask(2000, 2000, 1);
      await bid(0);
      expect(await takerFillableOrders()).empty;
      await mineBlock(11);
      expect(await takerFillableOrders()).length(1);
    });

    it("filled", async () => {
      await ask(2000, 2000, 1);
      await bid(0);
      await mineBlock(10);
      await fill(0);
      expect(await takerFillableOrders()).empty;
    });

    it("expired", async () => {
      await ask(2000, 2000, 1);
      await bid(0);
      await mineBlock(1e6);
      expect(await takerFillableOrders()).empty;
    });

    it("canceled", async () => {
      await ask(2000, 2000, 1);
      await bid(0);
      await mineBlock(10);
      await twap.methods.cancel(0).send({ from: user });
      expect(await takerFillableOrders()).empty;
    });

    it("maker allowance and balance", async () => {
      await ask(2000, 1000, 0.5);
      await bid(0);
      await mineBlock(10);
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
      await ask(10_000, 2000, 0);
      const otherUser = await account(9);
      await fundSrcTokenFromWhale(otherUser, 1);
      await srcToken.methods.approve(twap.options.address, maxUint256).send({ from: otherUser });
      await twap.methods
        .ask(zeroAddress, srcToken.address, dstToken.address, 1, 1, 1, endTime(), 10, 60)
        .send({ from: otherUser });
      await ask(15_000, 3000, 1);
      await twap.methods.cancel(0).send({ from: user });
    });

    it("returns all maker orders", async () => {
      const allOrders: any[] = await lens.methods.makerOrders(user).call();
      expect(allOrders).length(2);
      expect(allOrders[0].id).eq("0");
      expect(allOrders[0].ask.srcAmount).bignumber.eq(await srcToken.amount(10_000));
      expect(allOrders[1].id).eq("2");
      expect(allOrders[1].ask.srcAmount).bignumber.eq(await srcToken.amount(15_000));
    });
  });
});
