import { account, erc20s, network, zeroAddress } from "@defi.org/web3-candies";
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
          const address = _.get(erc20s, [network(c.chainId).shortname, "USDC"])().address;
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
          expect(result.dstAmount).bignumber.gt(0);
        });
      });
    }
  );
});
