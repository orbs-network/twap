import { expect } from "chai";
import {
  dstToken,
  exchange,
  initFixture,
  pangolinDaasSamplePartner,
  srcToken,
  swapBidDataForUniV2,
  user,
  userSrcTokenStartBalance,
  withPangolinDaasExchange,
  withParaswapExchange,
  withUniswapV2Exchange,
} from "./fixture";
import { chainId, contract, maxUint256, web3, zero, zeroAddress } from "@defi.org/web3-candies";
import { Paraswap } from "../src";
import BigNumber from "bignumber.js";
import { artifact, expectRevert } from "@defi.org/web3-candies/dist/hardhat";
import { IPangolinDaas } from "../typechain-hardhat/contracts/exchange/PangolinDaasExchange.sol";

describe("IExchange implementations", async () => {
  describe("UniswapV2Exchange", () => {
    beforeEach(() => initFixture());
    beforeEach(() => withUniswapV2Exchange());

    it("prevent invalid paths", async () => {
      await expectRevert(
        () =>
          exchange.methods
            .getAmountOut(
              srcToken.address,
              dstToken.address,
              100000,
              [],
              web3().eth.abi.encodeParameters(["bool", "address[]"], [false, [dstToken.address, srcToken.address]])
            )
            .call(),
        "UE1"
      );
    });

    it("swap", async () => {
      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });

      const expectedOut = await exchange.methods
        .getAmountOut(srcToken.address, dstToken.address, await srcToken.amount(100), [], swapBidDataForUniV2)
        .call();
      expect(expectedOut).bignumber.gt(zero);

      await exchange.methods
        .swap(srcToken.address, dstToken.address, await srcToken.amount(100), expectedOut, [], swapBidDataForUniV2)
        .send({ from: user });

      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).minus(await srcToken.amount(100))
      );
      expect(await dstToken.methods.balanceOf(user).call()).bignumber.closeTo(
        expectedOut,
        BigNumber(expectedOut).times(0.01)
      );
    });
  });

  describe("ParaswapExchange", () => {
    beforeEach("must run on latest block due to paraswap backend", async function () {
      await initFixture("latest");
    });

    beforeEach(() => withParaswapExchange());

    it("getAmountOut using pure encoded data from offchain", async () => {
      const encodedSwapData = web3().eth.abi.encodeParameters(
        ["uint256", "bytes"],
        [await dstToken.amount(123456789), []]
      );
      const expectedOut = await exchange.methods
        .getAmountOut(zeroAddress, zeroAddress, zero, [], encodedSwapData)
        .call();
      expect(expectedOut).bignumber.eq(await dstToken.amount(123456789));
    });

    it("swap with data from paraswap", async () => {
      const paraswapRoute = await Paraswap.findRoute(
        await chainId(),
        { address: srcToken.address, decimals: await srcToken.decimals(), symbol: "" },
        { address: dstToken.address, decimals: await dstToken.decimals(), symbol: "" },
        await srcToken.amount(10_000)
      );
      expect(paraswapRoute.destAmount).bignumber.gte(await dstToken.amount(1));
      const dstMinOut = BigNumber(paraswapRoute.destAmount).times(0.99).integerValue(BigNumber.ROUND_FLOOR);

      const swapData = await Paraswap.buildSwapData(paraswapRoute, exchange.options.address);

      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });
      await exchange.methods
        .swap(srcToken.address, dstToken.address, await srcToken.amount(10_000), dstMinOut, [], swapData)
        .send({ from: user });

      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).minus(await srcToken.amount(10_000))
      );
      expect(await dstToken.methods.balanceOf(user).call()).bignumber.gte(dstMinOut);
    });
  });

  if (process.env.NETWORK!.toLowerCase() === "avax")
    describe("Pangolin DEX as a service Exchange", () => {
      beforeEach("must run on block with specific partner DAAS fees", async () => await initFixture(18471000));
      beforeEach(async () => await withPangolinDaasExchange());

      it("swap with partnerDaas fee", async () => {
        const pangolin = contract<IPangolinDaas>(
          artifact("IPangolinDaas").abi,
          "0xEfd958c7C68b7e6a88300E039cAE275ca741007F"
        );

        expect(await dstToken.methods.balanceOf(user).call()).bignumber.zero;
        await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });

        expect((await pangolin.methods.getFeeInfo(pangolinDaasSamplePartner).call()).feeTotal).bignumber.eq(100); // 1%

        const expectedOut = await exchange.methods
          .getAmountOut(
            srcToken.address,
            dstToken.address,
            await srcToken.amount(100),
            web3().eth.abi.encodeParameter("address", pangolinDaasSamplePartner),
            swapBidDataForUniV2
          )
          .call();
        expect(expectedOut).bignumber.gt(zero);

        await exchange.methods
          .swap(
            srcToken.address,
            dstToken.address,
            await srcToken.amount(100),
            expectedOut,
            web3().eth.abi.encodeParameter("address", pangolinDaasSamplePartner),
            swapBidDataForUniV2
          )
          .send({ from: user });

        expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
          (await srcToken.amount(userSrcTokenStartBalance)).minus(await srcToken.amount(100))
        );
        expect(await dstToken.methods.balanceOf(user).call()).bignumber.closeTo(
          expectedOut,
          BigNumber(expectedOut).times(0.01)
        );
      });
    });
});
