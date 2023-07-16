import {
  deployer,
  dstToken,
  exchange,
  initFixture,
  network,
  setMockExchangeAmountOut,
  srcToken,
  swapBidDataForUniV2,
  taker,
  twap,
  user,
  withMockExchange,
  withUniswapV2Exchange,
  ask,
  bid,
  endTime,
  fill,
  order,
  time,
} from "./fixture";
import { account, zeroAddress } from "@defi.org/web3-candies";
import { deployArtifact, expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { MockExchange } from "../typechain-hardhat/contracts/test";

describe("Errors", () => {
  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  describe("order", () => {
    it("invalid id", async () => {
      await expectRevert(() => twap.methods.order(0).call(), "TWAP:order:id");
      await expectRevert(() => twap.methods.order(123).call(), "TWAP:order:id");
    });

    describe("invalid params", () => {
      let now = 0;
      beforeEach(async () => (now = await time()));

      [
        {
          name: "srcToken zero",
          act: async () =>
            twap.methods.ask([zeroAddress, zeroAddress, dstToken.address, 10, 5, 10, now + 10, 60, 60, []]),
        },
        {
          name: "same tokens",
          act: async () =>
            twap.methods.ask([zeroAddress, srcToken.address, srcToken.address, 10, 5, 10, now + 10, 60, 60, []]),
        },
        {
          name: "srcBidAmount zero",
          act: async () =>
            twap.methods.ask([zeroAddress, srcToken.address, dstToken.address, 0, 5, 10, now + 10, 60, 60, []]),
        },
        {
          name: "dstMinAmount zero",
          act: async () =>
            twap.methods.ask([zeroAddress, srcToken.address, dstToken.address, 10, 0, 10, now + 10, 60, 60, []]),
        },
        {
          name: "count",
          act: async () =>
            twap.methods.ask([zeroAddress, srcToken.address, dstToken.address, 10, 11, 0, now + 10, 60, 60, []]),
        },
        {
          name: "expired",
          act: async () =>
            twap.methods.ask([zeroAddress, srcToken.address, dstToken.address, 10, 5, 10, now, 60, 60, []]),
        },
        {
          name: "bid delay lower than minimum",
          act: async () =>
            twap.methods.ask([zeroAddress, srcToken.address, dstToken.address, 10, 5, 10, now + 10, 5, 60, []]),
        },
        {
          name: "weth to native",
          act: async () =>
            twap.methods.ask([zeroAddress, network.wToken.address, zeroAddress, 10, 5, 10, now + 10, 60, 60, []]),
        },
        {
          name: "same tokens native",
          act: async () =>
            twap.methods.ask([
              zeroAddress,
              network.wToken.address,
              network.wToken.address,
              10,
              5,
              10,
              now + 10,
              40,
              60,
              [],
            ]),
        },
      ].map((i) =>
        it(i.name, async () => {
          expect(await twap.methods.MIN_BID_DELAY_SECONDS().call().then(parseInt)).eq(30);
          twap.methods.ask([zeroAddress, srcToken.address, dstToken.address, 10, 5, 10, now + 10, 60, 60, []]); //valid
          await expectRevert(async () => (await i.act()).call(), "TWAP:ask:params");
        })
      );
    });

    it("insufficient maker allowance", async () => {
      await srcToken.methods.approve(twap.options.address, 5).send({ from: user });
      await expectRevert(
        () =>
          twap.methods
            .ask([zeroAddress, srcToken.address, dstToken.address, 100, 10, 1, endTime(), 60, 60, []])
            .send({ from: user }),
        "TWAP:ask:allowance"
      );
    });

    it("insufficient maker balance", async () => {
      await srcToken.methods.approve(twap.options.address, 15).send({ from: user });
      await srcToken.methods.transfer(taker, await srcToken.methods.balanceOf(user).call()).send({ from: user });
      await expectRevert(
        () =>
          twap.methods
            .ask([zeroAddress, srcToken.address, dstToken.address, 100, 10, 1, endTime(), 60, 60, []])
            .send({ from: user }),
        "TWAP:ask:allowance"
      );
    });
  });

  describe("verify bid", () => {
    it("bid params", async () => {
      await ask({ srcBidAmount: 2000 });
      await expectRevert(() => twap.methods.bid(0, zeroAddress, 0, 0, []).send({ from: taker }), "TWAP:bid:params");
      await expectRevert(
        () => twap.methods.bid(0, exchange.options.address, 0, 110_000, []).send({ from: taker }),
        "TWAP:bid:params"
      );
    });

    it("expired", async () => {
      await ask({ srcBidAmount: 2000, deadline: (await time()) + 10 });
      await mineBlock(60);
      await expectRevert(() => bid(0), "TWAP:bid:status");

      await ask({ srcBidAmount: 2000, deadline: (await time()) + 10 });
      await bid(1);
    });

    it("invalid exchange", async () => {
      await withMockExchange(1);
      const otherExchange = await deployArtifact<MockExchange>("MockExchange", { from: deployer });

      await ask({ srcBidAmount: 1000, exchange: exchange.options.address });
      await mineBlock(60);
      await expectRevert(
        () => twap.methods.bid(0, otherExchange.options.address, 0, 0, swapBidDataForUniV2).call(),
        "exchange"
      );
      await twap.methods.bid(0, exchange.options.address, 0, 0, swapBidDataForUniV2).call();
    });

    it("low bid", async () => {
      await ask({ srcBidAmount: 2000 });
      await bid(0);
      await expectRevert(() => bid(0), "TWAP:bid:lowBid");

      await ask({ srcBidAmount: 2000 });
      await bid(1);
    });

    it("recently filled", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2, fillDelay: 100 });
      await bid(0);
      await mineBlock(60);
      await fill(0);

      await expectRevert(() => bid(0), "TWAP:bid:fillDelay");

      await mineBlock(parseInt((await order(0)).ask.fillDelay));
      await bid(0);
    });

    it("recently filled custom fill delay", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2, bidDelay: 60, fillDelay: 600 });

      await bid(0);
      await mineBlock(60);
      await fill(0);

      await expectRevert(() => bid(0), "TWAP:bid:fillDelay");

      await mineBlock(60);
      await expectRevert(() => bid(0), "TWAP:bid:fillDelay");

      await mineBlock(600);
      await bid(0);
    });

    it("insufficient amount out", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 3 });
      await expectRevert(() => bid(0), "TWAP:bid:dstMinAmount");
    });

    it("insufficient amount out with excess fee", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5 });
      await expectRevert(() => bid(0, 0.1), "TWAP:bid:dstMinAmount");
    });

    it("fee underflow protection", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5 });
      await expectRevert(() => bid(0, 1), /(Arithmetic operation underflowed|reverted)/);
    });

    it("insufficient user allowance: success, auto cancels order", async () => {
      await ask({ srcBidAmount: 2000, dstMinAmount: 1 });
      await srcToken.methods.approve(twap.options.address, 0).send({ from: user });
      await bid(0);
      expect((await order(0)).status)
        .eq(await twap.methods.status(0).call())
        .eq(await twap.methods.STATUS_CANCELED().call());
    });

    it("insufficient user balance: sucess, auto cancels order", async () => {
      await ask({ srcBidAmount: 2000, dstMinAmount: 1 });
      await srcToken.methods.transfer(taker, await srcToken.methods.balanceOf(user).call()).send({ from: user });
      await bid(0);
      expect((await order(0)).status)
        .eq(await twap.methods.status(0).call())
        .eq(await twap.methods.STATUS_CANCELED().call());
    });
  });

  describe("perform fill", () => {
    it("expired", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2, deadline: (await time()) + 10 });
      await bid(0);
      await mineBlock(100);
      await expectRevert(() => fill(0), "TWAP:fill:status");
    });

    it("invalid taker when no existing bid", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5 });
      await expectRevert(() => fill(0), "TWAP:fill:taker");
    });

    it("invalid taker when not the winning taker", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5 });
      await bid(0);
      const otherTaker = await account(9);
      expect(otherTaker).not.eq(taker);
      await expectRevert(() => twap.methods.fill(0).send({ from: otherTaker }), "TWAP:fill:taker");
    });

    it("pending bid when still in bidding window of bid delay", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5 });
      await bid(0);
      await expectRevert(() => fill(0), "TWAP:fill:bidDelay");
    });

    it("pending bid with custom delay", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, deadline: endTime(), bidDelay: 1234, fillDelay: 9999 });
      await bid(0);

      await mineBlock(1000);
      await expectRevert(() => fill(0), "TWAP:fill:bidDelay");

      await mineBlock(234);
      await fill(0);
    });

    it("insufficient out, exchange might be manipulated on", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2 });

      await withMockExchange(1);

      await bid(0);
      await mineBlock(60);

      await setMockExchangeAmountOut(0.1);
      await expectRevert(() => fill(0), "TWAP:swap:dstMinAmount");
    });

    it("insufficient out with excess fee", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5, chunks: 2 });

      await withMockExchange(1);

      await bid(0, 0.1);
      await mineBlock(60);

      await setMockExchangeAmountOut(0.5);
      await expectRevert(() => fill(0), "TWAP:swap:dstMinAmount");
    });

    it("fee subtracted from dstAmountOut underflow protection", async () => {
      await ask({ srcBidAmount: 1000, dstMinAmount: 0.5 });

      await withMockExchange(10);

      await bid(0, 1);
      await mineBlock(60);

      await setMockExchangeAmountOut(0.5);
      await expectRevert(() => fill(0), /(Arithmetic operation underflowed|reverted)/);
    });
  });

  it("cancel only from maker", async () => {
    await ask({ srcBidAmount: 1, dstMinAmount: 1 });
    await expectRevert(() => twap.methods.cancel(0).send({ from: deployer }), "TWAP:cancel:onlyMaker");
  });

  it("prune only invalid orders", async () => {
    await ask({ srcBidAmount: 100, dstMinAmount: 0.01, fillDelay: 60 });
    await expectRevert(() => twap.methods.prune(0).send({ from: deployer }), "TWAP:prune:valid");

    await bid(0, 0);
    await mineBlock(60);
    await fill(0);
    await expectRevert(() => twap.methods.prune(0).send({ from: deployer }), "TWAP:prune:status");

    await twap.methods.cancel(0).send({ from: user });
    await expectRevert(() => twap.methods.prune(0).send({ from: deployer }), "TWAP:prune:status");
  });
});
