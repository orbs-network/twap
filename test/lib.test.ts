import { nativeTokenAddresses, Paraswap, SpiritSwapConfig, SpookySwapConfig, Status, TokenData, TWAPLib } from "../src";
import { expect } from "chai";
import {
  asTokenData,
  dstToken,
  initFixture,
  wNativeToken,
  srcToken,
  taker,
  user,
  userSrcTokenStartBalance,
} from "./fixture";
import { expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { chainId, erc20, web3, zeroAddress } from "@defi.org/web3-candies";
import BN from "bignumber.js";

describe("TWAPLib with production config", () => {
  beforeEach(() => initFixture(true));

  [SpiritSwapConfig, SpookySwapConfig].map((c) => {
    describe(`${c.partner} on ${c.chainId}`, () => {
      let lib: TWAPLib;

      let sToken: TokenData;
      let dToken: TokenData;

      before(async function () {
        if ((await chainId()) !== c.chainId) return this.skip();
      });

      beforeEach(async () => {
        lib = new TWAPLib(c, user);
        sToken = await asTokenData(srcToken);
        dToken = await asTokenData(dstToken);
      });

      it("constructed with config", async () => {
        expect(lib.config.partner).not.empty;
        expect(lib.config.exchangeAddress).not.empty;
        expect(lib.config.twapAddress).not.empty;
      });

      it("allowance and approval", async () => {
        expect(await lib.hasAllowance(sToken, 123456789)).false;
        await lib.approve(sToken, 123456789);
        expect(await lib.hasAllowance(sToken, 123456789)).true;
        expect(await srcToken.methods.allowance(user, lib.config.twapAddress).call()).bignumber.eq(123456789);
        expect(await lib.hasAllowance(sToken, 123456790)).false;
      });

      it("native token allowance", async () => {
        expect(await lib.hasAllowance({ address: zeroAddress, symbol: "", decimals: 0 }, 123456789)).true;
      });

      it("validate tokens", async () => {
        expect(lib.validateTokens(sToken, dToken)).eq("valid");
        expect(lib.validateTokens(sToken, sToken)).eq("invalid");
        expect(lib.validateTokens(lib.config.wToken, sToken)).eq("valid");
        expect(lib.validateTokens(lib.config.wToken, lib.config.wToken)).eq("invalid");
        expect(
          lib.validateTokens({ address: nativeTokenAddresses[1], symbol: "", decimals: 18 }, lib.config.wToken)
        ).eq("wrapOnly");
        expect(
          lib.validateTokens({ address: nativeTokenAddresses[0], symbol: "", decimals: 18 }, lib.config.wToken)
        ).eq("wrapOnly");
        expect(
          lib.validateTokens(
            { address: nativeTokenAddresses[2], symbol: "", decimals: 18 },
            { address: nativeTokenAddresses[0], symbol: "", decimals: 18 }
          )
        ).eq("invalid");

        expect(lib.validateTokens({ address: nativeTokenAddresses[1], symbol: "", decimals: 18 }, dToken)).eq(
          "wrapAndOrder"
        );

        expect(
          lib.validateTokens(lib.config.wToken, { address: nativeTokenAddresses[1], symbol: "", decimals: 18 })
        ).eq("unwrapOnly");

        expect(lib.validateTokens(dToken, { address: nativeTokenAddresses[1], symbol: "", decimals: 18 })).eq(
          "dstTokenZero"
        );
      });

      it("submitOrder validations", async () => {
        await expectRevert(() => lib.submitOrder(sToken, sToken, 0, 0, 0, 0, 0, 0), "invalid inputs: invalidTokens");
        await expectRevert(() => lib.submitOrder(sToken, dToken, 0, 0, 0, 0, 0, 0), "invalid inputs: invalidSrcAmount");
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 1, 0, 0, 0, 0, 0),
          "invalid inputs: invalidSrcChunkAmount"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 11, 0, 0, 0, 0),
          "invalid inputs: invalidSrcChunkAmount"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 10, 0, 0, 0, 0),
          "invalid inputs: invalidDstMinChunkAmountOut"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 10, 1, 0, 0, 0),
          "invalid inputs: invalidDeadline"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 10, 1, 100, 0, 0),
          "invalid inputs: invalidDeadline"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 10, 1, Date.now(), 0, 0),
          "invalid inputs: invalidDeadline"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 10, 1, Date.now() + 1e6, -1, 0),
          "invalid inputs: invalidFillDelaySeconds"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 10, 1, Date.now() + 1e6, 60, 0),
          "invalid inputs: invalidSrcUsd"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10, 5, 1, Date.now() + 1e6, 60, 1),
          "invalid inputs: invalidSmallestSrcChunk"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 100, 33, 1, Date.now() + 1e6, 60, 1),
          "invalid inputs: invalidSmallestSrcChunk"
        );
      });

      describe("with order", () => {
        let orderId: number = -1;

        beforeEach(async () => {
          await lib.approve(sToken, await srcToken.amount(1000));
          orderId = await lib.submitOrder(
            sToken,
            dToken,
            await srcToken.amount(1000),
            await srcToken.amount(500),
            await dstToken.amount(0.01),
            Date.now() + 1e6,
            0,
            1
          );
        });

        it("submit order, getOrder", async () => {
          expect(orderId).gte(0);
          const order: any = await lib.twap.methods.order(orderId).call();
          expect(order.ask.maker).eq(user);
          expect(order.ask.srcAmount).bignumber.eq(await srcToken.amount(1000));
          expect((await lib.getOrder(orderId)).ask.maker).eq(user);
        });

        it("cancel order", async () => {
          await lib.cancelOrder(orderId);
          expect((await lib.getOrder(orderId)).status).deep.eq(1);
        });

        it("status opened, canceled", async () => {
          expect(lib.status(await lib.getOrder(orderId)))
            .eq(Status.Open)
            .eq("Open");

          await lib.cancelOrder(orderId);
          expect(lib.status(await lib.getOrder(orderId)))
            .eq(Status.Canceled)
            .eq("Canceled");
        });

        it("status expired", async () => {
          const orig = Date.now;
          Date.now = () => 1e18;
          expect(Date.now()).eq(1e18);
          expect(lib.status(await lib.getOrder(orderId)))
            .eq(Status.Expired)
            .eq("Expired");
          Date.now = orig;
        });

        it("status completed", async () => {
          const { dstAmountOut, data } = await swapData(lib, orderId);

          await lib.twap.methods.bid(orderId, lib.config.exchangeAddress, 0, 2000, data).send({ from: taker });
          await mineBlock(60);
          await lib.twap.methods.fill(orderId).send({ from: taker });

          await lib.twap.methods.bid(orderId, lib.config.exchangeAddress, 0, 2000, data).send({ from: taker });
          await mineBlock(60);
          await lib.twap.methods.fill(orderId).send({ from: taker });

          const order = await lib.getOrder(orderId);
          expect(lib.status(order)).eq(Status.Completed).eq("Completed");

          expect(order.srcFilledAmount).bignumber.eq(await srcToken.amount(1000));
          expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
            await srcToken.amount(userSrcTokenStartBalance - 1000)
          );
          expect(await dstToken.methods.balanceOf(user).call()).bignumber.closeTo(
            dstAmountOut.times(2),
            dstAmountOut.times(0.05)
          );
        });

        it("getAllOrders", async () => {
          const orders = await lib.getAllOrders();
          expect(orders).length(1);
          expect(orders[0].id).eq(orderId);
        });
      });

      describe("helper functions", () => {
        it("isNativeToken", async () => {
          expect(lib.isNativeToken(sToken)).false;
          expect(lib.isNativeToken(lib.config.wToken)).false;
          expect(lib.isNativeToken({ address: zeroAddress, symbol: "", decimals: 1 })).true;
        });

        it("isWrappedToken", async () => {
          expect(lib.isWrappedToken(sToken)).false;
          expect(lib.isWrappedToken(lib.config.wToken)).true;
          expect(lib.isWrappedToken({ address: zeroAddress, symbol: "", decimals: 1 })).false;
        });

        it("isValidNetwork", async () => {
          expect(lib.isValidChain(0)).false;
          expect(lib.isValidChain(lib.config.chainId)).true;
        });

        it("maker balance", async () => {
          expect(await lib.makerBalance(sToken)).bignumber.eq(await srcToken.amount(userSrcTokenStartBalance));
          expect(await lib.makerBalance(dToken)).bignumber.zero;
          expect(await lib.makerBalance(await asTokenData(wNativeToken))).bignumber.zero;
          expect(await lib.makerBalance({ address: zeroAddress, symbol: "", decimals: 1 })).bignumber.eq(
            BN(1e6).times(1e18)
          );
        });

        it("wrap native", async () => {
          expect(await lib.makerBalance(lib.config.wToken)).bignumber.zero;
          await lib.wrapNativeToken(100 * 1e18);
          expect(await lib.makerBalance(lib.config.wToken)).bignumber.eq(100 * 1e18);
        });

        it("unwrap to native", async () => {
          await lib.wrapNativeToken(100 * 1e18);
          expect(await lib.makerBalance(lib.config.wToken)).bignumber.eq(100 * 1e18);

          const balance = await web3().eth.getBalance(lib.maker);
          await lib.unwrapNativeToken(100 * 1e18);
          expect(await lib.makerBalance(lib.config.wToken)).bignumber.zero;
          expect(await web3().eth.getBalance(lib.maker)).bignumber.closeTo(
            BN(balance).plus(BN(100).times(1e18)),
            0.01 * 1e18
          );
        });

        it("waitForConfirmation", async () => {
          await lib.waitForConfirmation(() => lib.wrapNativeToken(100));
          expect(await lib.makerBalance(lib.config.wToken)).bignumber.eq(100);
        });
      });

      describe("calculations helpers", async () => {
        it("orderProgress", async () => {
          const order = lib.parseOrder({ ask: { srcAmount: 1000 }, srcFilledAmount: 500 });
          expect(lib.orderProgress(order)).eq(0.5);
        });

        it("isMarketOrder", async () => {
          const order = lib.parseOrder({ ask: { srcAmount: 1000, dstMinAmount: 0 }, srcFilledAmount: 500 });
          expect(lib.isMarketOrder(order)).true;
          order.ask.dstMinAmount = BN(1);
          expect(lib.isMarketOrder(order)).true;
          order.ask.dstMinAmount = BN(10);
          expect(lib.isMarketOrder(order)).false;
        });

        it("market price dstAmount = srcAmount * (srcUsd/dstUsd)", async () => {
          expect(sToken.decimals).eq(6);
          expect(dToken.decimals).eq(18);
          expect(lib.dstAmount(sToken, dToken, 123 * 1e6, 1.234, 5.678, 0, true)).bignumber.closeTo(
            26_731595632300000000,
            0.001 * 1e18
          );
        });

        it("limit price dstAmount = srcAmount * limitPrice", async () => {
          expect(sToken.decimals).eq(6);
          expect(dToken.decimals).eq(18);
          expect(lib.dstAmount(sToken, dToken, 123 * 1e6, 1.234, 5.678, 1.2345, false)).bignumber.closeTo(
            151_843500000000000000,
            0.001 * 1e18
          );
        });

        it("percent above/below market", async () => {
          expect(lib.percentAboveMarket(1500, 20_000, 0.07)).eq(-0.0667);
          expect(lib.percentAboveMarket(1500, 20_000, 0.08)).eq(0.0667);
        });

        it("max possible chunk count", async () => {
          expect(lib.config.minChunkSizeUsd).bignumber.eq(10);
          const srcAmount = await srcToken.amount(100);
          expect(lib.maxPossibleChunks(sToken, srcAmount, 1)).bignumber.eq(10);
          expect(lib.maxPossibleChunks(sToken, srcAmount, 10)).bignumber.eq(100);
          expect(lib.maxPossibleChunks(sToken, srcAmount, 30)).bignumber.eq(300);
          expect(lib.maxPossibleChunks(sToken, srcAmount, 0.5)).bignumber.eq(5);
          expect(lib.maxPossibleChunks(sToken, srcAmount, 0.0001)).bignumber.eq(1);
        });

        it("srcChunkAmount", async () => {
          const srcAmount = await srcToken.amount(100);
          expect(lib.srcChunkAmount(srcAmount, 2)).bignumber.eq(await srcToken.amount(50));
          expect(lib.srcChunkAmount(srcAmount, 5)).bignumber.eq(await srcToken.amount(20));
          expect(lib.srcChunkAmount(srcAmount, 10)).bignumber.eq(await srcToken.amount(10));
          expect(lib.srcChunkAmount(srcAmount, 100)).bignumber.eq(await srcToken.amount(1));
          expect(lib.srcChunkAmount(srcAmount, 3)).bignumber.eq((await srcToken.amount(100)).idiv(3));
        });

        it("totalChunks", async () => {
          const srcAmount = await srcToken.amount(100);
          expect(lib.totalChunks(srcAmount, await srcToken.amount(100))).bignumber.eq(1);
          expect(lib.totalChunks(srcAmount, await srcToken.amount(50))).bignumber.eq(2);
          expect(lib.totalChunks(srcAmount, await srcToken.amount(1))).bignumber.eq(100);
          expect(lib.totalChunks(srcAmount, await srcToken.amount(33))).bignumber.eq(4);
        });

        it("fillDelayMillis for evenly distributed trades over maxDuration", async () => {
          expect(lib.config.bidDelaySeconds).eq(60);
          const minute = 60 * 1000;
          const hour = 60 * minute;
          expect(lib.fillDelayMillis(0, 0)).bignumber.eq(0);
          expect(lib.fillDelayMillis(10, 0)).bignumber.eq(0);
          expect(lib.fillDelayMillis(10, 1000)).bignumber.eq(0);
          expect(lib.fillDelayMillis(10, minute)).bignumber.eq(0);
          expect(lib.fillDelayMillis(10, hour)).bignumber.eq(5 * minute);
          expect(lib.fillDelayMillis(4, hour)).bignumber.eq(14 * minute);
          expect(lib.fillDelayMillis(3, hour)).bignumber.eq(19 * minute);
          expect(lib.fillDelayMillis(2, hour)).bignumber.eq(29 * minute);
          expect(lib.fillDelayMillis(1, hour)).bignumber.eq(0);
          expect(lib.fillDelayMillis(100, hour)).bignumber.eq(0);
          expect(lib.fillDelayMillis(5, 5 * hour)).bignumber.eq(59 * minute);
        });

        it("dstMinAmountOut", async () => {
          expect(lib.dstMinAmountOut(sToken, dToken, 1, 0, false)).bignumber.eq(1);
          const srcChunkAmount = await srcToken.amount(100);
          expect(lib.dstMinAmountOut(sToken, dToken, srcChunkAmount, 1, true)).bignumber.eq(1);
          expect(lib.dstMinAmountOut(sToken, dToken, srcChunkAmount, 1, false)).bignumber.eq(
            await dstToken.amount(100)
          );
          expect(lib.dstMinAmountOut(sToken, dToken, srcChunkAmount, 0.5, false)).bignumber.eq(
            await dstToken.amount(50)
          );
          expect(lib.dstMinAmountOut(sToken, dToken, srcChunkAmount, BN(1).div(3), false)).bignumber.eq(
            (await dstToken.amount(100)).idiv(3)
          );
        });
      });
    });
  });
});

async function swapData(lib: TWAPLib, orderId: number) {
  const order = await lib.getOrder(orderId);
  const amountIn = order.ask.srcBidAmount;
  const srcToken = erc20("srcToken", order.ask.srcToken);
  const dstToken = erc20("dstToken", order.ask.dstToken);
  const route = await Paraswap.findRoute(
    lib.config.chainId,
    await asTokenData(srcToken),
    await asTokenData(dstToken),
    amountIn,
    lib.config.pathfinderKey
  );
  switch (lib.config.exchangeContract) {
    case "UniswapV2Exchange":
      return {
        dstAmountOut: BN(route.destAmount),
        data: web3().eth.abi.encodeParameters(
          ["bool", "address[]"],
          [false, route.bestRoute[0].swaps[0].swapExchanges[0].data.path]
        ),
      };
    case "ParaswapExchange":
      return {
        dstAmountOut: BN(route.destAmount),
        data: await Paraswap.buildSwapData(route, lib.config.twapAddress),
      };
    default:
      throw new Error(`unhandled exchangeContract ${lib.config.exchangeContract}`);
  }
}
