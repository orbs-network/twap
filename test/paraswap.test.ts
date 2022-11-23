import { expect } from "chai";
import { Paraswap } from "../src";
import { chainId, erc20s, networks, zeroAddress } from "@defi.org/web3-candies";
import { useChaiBigNumber } from "@defi.org/web3-candies/dist/hardhat";
import { asTokenData } from "./fixture";

useChaiBigNumber();

describe("Paraswap", () => {
  [
    { name: "Ethereum", chainId: networks.eth.id, usdc: erc20s.eth.USDC },
    { name: "Fantom", chainId: networks.ftm.id, usdc: erc20s.ftm.USDC },
    { name: "Polygon", chainId: networks.poly.id, usdc: erc20s.poly.USDC },
  ].map((c) => {
    describe(c.name, () => {
      before(async function () {
        if ((await chainId()) !== c.chainId) return this.skip();
      });

      it("priceUsd", async () => {
        const price = await Paraswap.priceUsd(c.chainId, await asTokenData(c.usdc()));
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
    });
  });
});
