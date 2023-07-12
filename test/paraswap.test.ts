import { expect } from "chai";
import { Configs, Paraswap, ParaswapOnlyDex, TokenData } from "../src";
import { erc20s, erc20sData, network, zeroAddress } from "@defi.org/web3-candies";
import { expectRevert, useChaiBigNumber } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";

useChaiBigNumber();

describe.only("Paraswap", () => {
  _.map(
    _.filter(Configs, (c) => c.chainName === process.env.NETWORK!.toLowerCase()),
    (c) => {
      describe(`${c.name} on ${c.chainId}`, () => {
        let usdc: TokenData;

        before(async function () {
          usdc = erc20sData[c.chainName].USDC;
        });

        it("direct path for univ2 exchanges", async function () {
          const route = await Paraswap.findRoute(
            c.chainId,
            usdc,
            c.wToken,
            100_000 * 10 ** usdc.decimals,
            c.pathfinderKey as ParaswapOnlyDex
          );
          expect(route.dstAmount).bignumber.gt(0);
          expect(route.path.length).gte(
            c.exchangeType === "UniswapV2Exchange" || c.exchangeType === "PangolinDaasExchange" ? 1 : 0
          );
        });

        it("direct path might be invalid", async () => {
          const route = await Paraswap.findRoute(c.chainId, usdc, usdc, 100_000 * 10 ** usdc.decimals);
          expect(route.path.length).eq(0);
        });
      });
    }
  );
});
