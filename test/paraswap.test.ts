import { expect } from "chai";
import { Configs, Paraswap, TokenData } from "../src";
import { erc20s, network, zeroAddress } from "@defi.org/web3-candies";
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
          const address = _.get(erc20s, [network(c.chainId).shortname, "USDC"])().address;
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

        it("direct path for univ2 exchanges", async function () {
          const route = await Paraswap.findRoute(
            c.chainId,
            usdc,
            c.wToken,
            100_000 * 1e6,
            c.pathfinderKey as Paraswap.OnlyDex
          );
          expect(route.dstAmount).bignumber.gt(0);
          expect(route.path.length).gte(
            c.exchangeType !== "UniswapV2Exchange" && c.exchangeType !== "PangolinDaasExchange" ? 1 : 0
          );
        });

        it("direct path might be invalid", async () => {
          const route = await Paraswap.findRoute(c.chainId, usdc, usdc, 100_000 * 1e6);
          expect(route.path.length).eq(0);
        });
      });
    }
  );
});
