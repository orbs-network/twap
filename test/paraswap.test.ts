import { expect } from "chai";
import { Configs, Paraswap, TokenData } from "../src";
import { chainId, currentNetwork, erc20s, zeroAddress } from "@defi.org/web3-candies";
import { expectRevert, useChaiBigNumber } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";

useChaiBigNumber();

describe("Paraswap", () => {
  _.map(
    _.filter(Configs, (c) => c.chainName === process.env.NETWORK!.toLowerCase()),
    (c) => {
      describe(`${c.partner} on ${c.chainId}`, () => {
        let usdc: TokenData;

        before(async function () {
          const address = _.get(erc20s, [(await currentNetwork())!.shortname, "USDC"])().address;
          usdc = { address, decimals: 6, symbol: "USDC" };
        });

        it("priceUsd", async () => {
          const price = await Paraswap.priceUsd(c.chainId, usdc);
          expect(price).bignumber.closeTo(1, 0.01);
        });

        it("priceUsd for native token uses wToken", async () => {
          const price = await Paraswap.priceUsd(c.chainId, { address: zeroAddress, symbol: "", decimals: 1 });
          expect(price).bignumber.gt(0);
        });

        it("gas prices", async () => {
          const result = await Paraswap.gasPrices(c.chainId);
          expect(result.low).bignumber.gt(0).lte(result.medium).lte(result.high).lte(result.instant);
        });

        it("find route with other exchanges", async function () {
          if (!Object.values(Paraswap.OnlyDex).includes(c.pathfinderKey as Paraswap.OnlyDex)) return this.skip();

          const result = await Paraswap.findRoute(c.chainId, usdc, c.wToken, 100_000 * 1e6, undefined, true);
          expect(result.destAmount).bignumber.gt(0);

          const others = (result as any).others.map((i: any) => i.exchange);
          const exchanges = _.flattenDeep(
            result.bestRoute.map((r: any) => r.swaps.map((s: any) => s.swapExchanges.map((e: any) => e.exchange)))
          );
          const allExchanges = _.uniq([...exchanges, ...others]);
          const intersection = _.intersection(allExchanges, c.pathfinderKey.split(","));
          expect(intersection.length, allExchanges.toString()).eq(c.pathfinderKey.split(",").length);
        });

        it("direct path for univ2 exchanges", async function () {
          if (c.exchangeType !== "UniswapV2Exchange" && c.exchangeType !== "PangolinDaasExchange") return this.skip();

          const route = await Paraswap.findRoute(
            c.chainId,
            usdc,
            c.wToken,
            100_000 * 1e6,
            c.pathfinderKey as Paraswap.OnlyDex
          );
          const path = Paraswap.getDirectPath(route, c.pathfinderKey as Paraswap.OnlyDex);
          expect(route.destAmount).bignumber.gt(0);
          expect(path.length).gt(1);
        });

        it("direct path might be invalid", async () => {
          const route = await Paraswap.findRoute(c.chainId, usdc, usdc, 100_000 * 1e6);
          await expectRevert(
            () => Paraswap.getDirectPath(route, c.pathfinderKey as Paraswap.OnlyDex),
            "invalid direct path"
          );
        });
      });
    }
  );
});
