import { Configs, nativeTokenAddresses, Paraswap, Status, TWAPLib } from "../src";
import { expect } from "chai";
import { dstToken, initFixture, srcToken, taker, user, userSrcTokenStartBalance, wNativeToken } from "./fixture";
import { expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { chainId, web3, zeroAddress } from "@defi.org/web3-candies";
import BN from "bignumber.js";
import _ from "lodash";

describe("TWAPLib with production config", () => {
  beforeEach(() => initFixture(true));

  _.map(Configs, (c) => {
    describe(`${c.partner} on ${c.chainId}`, () => {
      let lib: TWAPLib;

      before(async function () {
        if ((await chainId()) !== c.chainId) return this.skip();
      });

      beforeEach(async () => {
        lib = new TWAPLib(c, user);
      });

      it("constructed with config", async () => {
        expect(lib.config.partner).not.empty;
        expect(lib.config.exchangeAddress).not.empty;
        expect(lib.config.twapAddress).not.empty;
      });

      it("allowance and approval", async () => {
        expect(await lib.hasAllowance(await lib.getToken(srcToken.address), 123456789)).false;
        await lib.approve(await lib.getToken(srcToken.address), 123456789);
        expect(await lib.hasAllowance(await lib.getToken(srcToken.address), 123456789)).true;
        expect(await srcToken.methods.allowance(user, lib.config.twapAddress).call()).bignumber.eq(123456789);
        expect(await lib.hasAllowance(await lib.getToken(srcToken.address), 123456790)).false;
      });

      it("native token allowance", async () => {
        expect(await lib.hasAllowance({ address: zeroAddress, symbol: "", decimals: 0 }, 123456789)).true;
      });

      it("validate tokens", async () => {
        expect(lib.validateTokens(await lib.getToken(srcToken.address), await lib.getToken(dstToken.address))).eq(
          "valid"
        );
        expect(lib.validateTokens(await lib.getToken(srcToken.address), await lib.getToken(srcToken.address))).eq(
          "invalid"
        );
        expect(lib.validateTokens(lib.config.wToken, await lib.getToken(srcToken.address))).eq("valid");
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

        expect(
          lib.validateTokens(
            { address: nativeTokenAddresses[1], symbol: "", decimals: 18 },
            await lib.getToken(dstToken.address)
          )
        ).eq("wrapAndOrder");

        expect(
          lib.validateTokens(lib.config.wToken, { address: nativeTokenAddresses[1], symbol: "", decimals: 18 })
        ).eq("unwrapOnly");

        expect(
          lib.validateTokens(await lib.getToken(dstToken.address), {
            address: nativeTokenAddresses[1],
            symbol: "",
            decimals: 18,
          })
        ).eq("dstTokenZero");
      });

      it("submitOrder validations", async () => {
        const sToken = await lib.getToken(srcToken.address);
        const dToken = await lib.getToken(dstToken.address);
        await expectRevert(
          () =>
            lib.submitOrder(sToken, { address: nativeTokenAddresses[1], decimals: 18, symbol: "" }, 0, 0, 0, 0, 0, 0),
          "invalid inputs: invalidTokens"
        );
        await expectRevert(() => lib.submitOrder(sToken, dToken, 0, 0, 0, 0, 0, 0), "invalid inputs: invalidSrcAmount");
        await expectRevert(() => lib.submitOrder(sToken, dToken, 0, 0, 0, 0, 0, 0), "invalid inputs: invalidSrcAmount");
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 1, 0, 0, 0, 0, 0),
          "invalid inputs: invalidSrcChunkAmount"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 11 * 1e6, 0, 0, 0, 0),
          "invalid inputs: invalidSrcChunkAmount"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 10 * 1e6, 0, 0, 0, 0),
          "invalid inputs: invalidDstMinChunkAmountOut"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 10 * 1e6, 1, 0, 0, 0),
          "invalid inputs: invalidDeadline"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 10 * 1e6, 1, 100, 0, 0),
          "invalid inputs: invalidDeadline"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 10 * 1e6, 1, Date.now(), 0, 0),
          "invalid inputs: invalidDeadline"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 10 * 1e6, 1, Date.now() + 1e6, -1, 0),
          "invalid inputs: invalidFillDelaySeconds"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 10 * 1e6, 1, Date.now() + 1e6, 60, 0),
          "invalid inputs: invalidSrcUsd"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 10 * 1e6, 5 * 1e6, 1, Date.now() + 1e6, 60, 1),
          "invalid inputs: invalidSmallestSrcChunk"
        );
        await expectRevert(
          () => lib.submitOrder(sToken, dToken, 100 * 1e6, 33 * 1e6, 1, Date.now() + 1e6, 60, 1),
          "invalid inputs: invalidSmallestSrcChunk"
        );
      });

      describe("with order", () => {
        let orderId: number = -1;

        beforeEach(async () => {
          await lib.approve(await lib.getToken(srcToken.address), await srcToken.amount(1000));
          orderId = await lib.submitOrder(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
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
        it("getToken", async () => {
          expect(await lib.getToken(srcToken.address)).deep.eq({
            address: srcToken.address,
            decimals: 6,
            symbol: "USDC",
          });
        });

        it("isNativeToken", async () => {
          expect(lib.isNativeToken(await lib.getToken(srcToken.address))).false;
          expect(lib.isNativeToken(lib.config.wToken)).false;
          expect(lib.isNativeToken({ address: zeroAddress, symbol: "", decimals: 1 })).true;
        });

        it("isWrappedToken", async () => {
          expect(lib.isWrappedToken(await lib.getToken(srcToken.address))).false;
          expect(lib.isWrappedToken(lib.config.wToken)).true;
          expect(lib.isWrappedToken({ address: zeroAddress, symbol: "", decimals: 1 })).false;
        });

        it("isValidNetwork", async () => {
          expect(lib.isValidChain(0)).false;
          expect(lib.isValidChain(lib.config.chainId)).true;
        });

        it("maker balance", async () => {
          expect(await lib.makerBalance(await lib.getToken(srcToken.address))).bignumber.eq(
            await srcToken.amount(userSrcTokenStartBalance)
          );
          expect(await lib.makerBalance(await lib.getToken(dstToken.address))).bignumber.zero;
          expect(await lib.makerBalance(await lib.getToken(wNativeToken.address))).bignumber.zero;
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

      it("parseOrder", async () => {
        const order = lib.parseOrder({
          ask: {
            maker: user.toLowerCase(),
            srcToken: srcToken.address.toLowerCase(),
            dstToken: dstToken.address.toLowerCase(),
          },
        });
        expect(order.ask.maker).eq(user);
        expect(order.ask.srcToken).eq(srcToken.address);
        expect(order.ask.dstToken).eq(dstToken.address);
      });

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
        expect(await srcToken.decimals()).eq(6);
        expect(await dstToken.decimals()).eq(18);
        expect(
          lib.dstAmount(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            123 * 1e6,
            1.234,
            5.678,
            0,
            true
          )
        ).bignumber.closeTo(26_731595632300000000, 0.001 * 1e18);
      });

      it("limit price dstAmount = srcAmount * limitPrice", async () => {
        expect(await srcToken.decimals()).eq(6);
        expect(await dstToken.decimals()).eq(18);
        expect(
          lib.dstAmount(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            123 * 1e6,
            1.234,
            5.678,
            1.2345,
            false
          )
        ).bignumber.closeTo(151_843500000000000000, 0.001 * 1e18);
      });

      it("dst price with limit or market", async () => {
        expect(
          lib.dstPriceFor1Src(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            1.234,
            5.678,
            1,
            1
          )
        ).bignumber.closeTo(0.217, 0.001);

        expect(
          lib.dstPriceFor1Src(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            1.234,
            5.678,
            await srcToken.amount(10),
            await dstToken.amount(100)
          )
        ).bignumber.eq(10);
      });

      it("percent above/below market", async () => {
        expect(lib.percentAboveMarket(1500, 20_000, 0.07)).eq(-0.0667);
        expect(lib.percentAboveMarket(1500, 20_000, 0.08)).eq(0.0667);
      });

      it("max possible chunk count", async () => {
        expect(lib.config.minChunkSizeUsd).bignumber.eq(10);
        const srcAmount = await srcToken.amount(100);
        expect(lib.maxPossibleChunks(await lib.getToken(srcToken.address), srcAmount, 1)).bignumber.eq(10);
        expect(lib.maxPossibleChunks(await lib.getToken(srcToken.address), srcAmount, 10)).bignumber.eq(100);
        expect(lib.maxPossibleChunks(await lib.getToken(srcToken.address), srcAmount, 30)).bignumber.eq(300);
        expect(lib.maxPossibleChunks(await lib.getToken(srcToken.address), srcAmount, 0.5)).bignumber.eq(5);
        expect(lib.maxPossibleChunks(await lib.getToken(srcToken.address), srcAmount, 0.0001)).bignumber.eq(1);
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

      it("fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer", async () => {
        expect(lib.config.bidDelaySeconds).eq(60);
        const minute = 60 * 1000;
        const hour = 60 * minute;
        expect(lib.fillDelayMillis(0, 0)).bignumber.eq(0);
        expect(lib.fillDelayMillis(10, 0)).bignumber.eq(0);
        expect(lib.fillDelayMillis(10, 1000)).bignumber.eq(0);
        expect(lib.fillDelayMillis(10, minute)).bignumber.eq(0);
        expect(lib.fillDelayMillis(10, hour)).bignumber.eq(4 * minute);
        expect(lib.fillDelayMillis(4, hour)).bignumber.eq(13 * minute);
        expect(lib.fillDelayMillis(3, hour)).bignumber.eq(18 * minute);
        expect(lib.fillDelayMillis(2, hour)).bignumber.eq(28 * minute);
        expect(lib.fillDelayMillis(1, hour)).bignumber.eq(0);
        expect(lib.fillDelayMillis(100, hour)).bignumber.eq(0);
        expect(lib.fillDelayMillis(5, 5 * hour)).bignumber.eq(58 * minute);
      });

      it("dstMinAmountOut", async () => {
        expect(
          lib.dstMinAmountOut(await lib.getToken(srcToken.address), await lib.getToken(dstToken.address), 1, 0, false)
        ).bignumber.eq(1);
        const srcChunkAmount = await srcToken.amount(100);
        expect(
          lib.dstMinAmountOut(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            srcChunkAmount,
            1,
            true
          )
        ).bignumber.eq(1);
        expect(
          lib.dstMinAmountOut(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            srcChunkAmount,
            1,
            false
          )
        ).bignumber.eq(await dstToken.amount(100));
        expect(
          lib.dstMinAmountOut(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            srcChunkAmount,
            0.5,
            false
          )
        ).bignumber.eq(await dstToken.amount(50));
        expect(
          lib.dstMinAmountOut(
            await lib.getToken(srcToken.address),
            await lib.getToken(dstToken.address),
            srcChunkAmount,
            BN(1).div(3),
            false
          )
        ).bignumber.eq((await dstToken.amount(100)).idiv(3));
      });
    });
  });
});

async function swapData(lib: TWAPLib, orderId: number) {
  const order = await lib.getOrder(orderId);
  const amountIn = order.ask.srcBidAmount;
  const route = await Paraswap.findRoute(
    lib.config.chainId,
    await lib.getToken(order.ask.srcToken),
    await lib.getToken(order.ask.dstToken),
    amountIn,
    lib.config.pathfinderKey
  );
  switch (lib.config.exchangeType) {
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
      throw new Error(`unhandled exchangeContract ${lib.config.exchangeType}`);
  }
}
