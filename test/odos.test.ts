import { account, currentNetwork, erc20s, zeroAddress } from "@defi.org/web3-candies";
import { useChaiBigNumber } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import _ from "lodash";
import { Configs, Odos, TokenData } from "../src";

useChaiBigNumber();

describe("Odos", () => {
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
          const price = await Odos.priceUsd(c.chainId, usdc);
          expect(price).bignumber.closeTo(1, 0.01);
        });

        it("priceUsd for native token uses wToken", async () => {
          const price = await Odos.priceUsd(c.chainId, { address: zeroAddress, symbol: "", decimals: 1 });
          expect(price).bignumber.gt(0);
        });

        it("find route", async () => {
          const result = await Odos.findRoute(c.chainId, usdc, c.wToken, 100_000 * 1e6, await account());
          expect(result.dstAmountOut).bignumber.gt(0);
        });
      });
    }
  );
});
