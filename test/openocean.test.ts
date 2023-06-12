import { account, erc20s, network, zeroAddress } from "@defi.org/web3-candies";
import { useChaiBigNumber } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import _ from "lodash";
import { Configs, Odos, TokenData, OpenOcean } from "../src";

useChaiBigNumber();

describe("OpenOcean", () => {
  _.map(
    _.filter(Configs, (c) => c.chainName === process.env.NETWORK!.toLowerCase()),
    (c) => {
      describe(`${c.name} on ${c.chainId}`, () => {
        let usdc: TokenData;

        before(async function () {
          const address = _.get(erc20s, [network(c.chainId).shortname, "USDC"])().address;
          usdc = { address, decimals: 6, symbol: "USDC" };
        });

        it("find route", async () => {
          const result = await OpenOcean.findRoute(c.chainId, usdc, c.wToken, 100_000 * 1e6, await account());
          expect(result.dstAmount).bignumber.gt(0);
          expect(result.srcUsd).bignumber.closeTo(1, 0.01);
          expect(result.dstUsd).bignumber.gt(0);
        });
      });
    }
  );
});
