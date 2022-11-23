import { expect } from "chai";
import {
  asTokenData,
  dstToken,
  exchange,
  initFixture,
  srcToken,
  swapDataForUniV2,
  user,
  userSrcTokenStartBalance,
  withParaswapExchange,
  withUniswapV2Exchange,
} from "./fixture";
import { chainId, maxUint256, web3, zero, zeroAddress } from "@defi.org/web3-candies";
import { Paraswap } from "../src";
import BigNumber from "bignumber.js";

describe("IExchange implementations", async () => {
  describe("UniswapV2Exchange", () => {
    beforeEach(() => initFixture());
    beforeEach(() => withUniswapV2Exchange());

    it("swap", async () => {
      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });

      const amountIn = await srcToken.amount(100);
      const expectedOut = await exchange.methods
        .getAmountOut(srcToken.address, dstToken.address, amountIn, swapDataForUniV2)
        .call();
      expect(expectedOut).bignumber.gt(zero);

      await exchange.methods
        .swap(srcToken.address, dstToken.address, amountIn, expectedOut, swapDataForUniV2)
        .send({ from: user });

      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).minus(amountIn)
      );
      expect(await dstToken.methods.balanceOf(user).call()).bignumber.closeTo(
        expectedOut,
        BigNumber(expectedOut).times(0.01)
      );
    });
  });

  describe("ParaswapExchange", () => {
    beforeEach("must run on latest block due to paraswap backend", async function () {
      await initFixture(true);
    });

    beforeEach(() => withParaswapExchange());

    it("getAmountOut using pure encoded data from offchain", async () => {
      const encodedSwapData = web3().eth.abi.encodeParameters(
        ["uint256", "bytes"],
        [await dstToken.amount(123456789), []]
      );
      const expectedOut = await exchange.methods.getAmountOut(zeroAddress, zeroAddress, zero, encodedSwapData).call();
      expect(expectedOut).bignumber.eq(await dstToken.amount(123456789));
    });

    it("swap with data from paraswap", async () => {
      const amountIn = await srcToken.amount(10_000);

      const paraswapRoute = await Paraswap.findRoute(
        await chainId(),
        await asTokenData(srcToken),
        await asTokenData(dstToken),
        amountIn
      );
      expect(paraswapRoute.destAmount).bignumber.gte(await dstToken.amount(1));
      const dstMinOut = BigNumber(paraswapRoute.destAmount).times(0.99).integerValue(BigNumber.ROUND_FLOOR);

      const swapData = await Paraswap.buildSwapData(paraswapRoute, exchange.options.address);

      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });
      await exchange.methods
        .swap(srcToken.address, dstToken.address, amountIn, dstMinOut, swapData)
        .send({ from: user });

      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).minus(amountIn)
      );
      expect(await dstToken.methods.balanceOf(user).call()).bignumber.gte(dstMinOut);
    });
  });
});
