import { dotc, dstToken, exchange, initFixture, taker } from "./fixture";
import { deployArtifact, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import type { Bidder } from "../typechain-hardhat/contracts/Bidder";
import { ask, srcDstPathData } from "./dotc-utils";
import { zeroAddress } from "@defi.org/web3-candies";

describe("Bidder", async () => {
  let bidder: Bidder;

  beforeEach(initFixture);

  beforeEach(async () => {
    bidder = await deployArtifact<Bidder>("Bidder", { from: taker }, [dotc.options.address, dstToken.address]);
    await ask(1000, 100, 0.05);
  });

  it("sanity", async () => {
    expect(await bidder.methods.owner().call()).eq(taker);
    expect(await bidder.methods.dotc().call()).eq(dotc.options.address);
    expect(await bidder.methods.weth().call()).eq(dstToken.address);
  });

  it("bid & fill", async () => {
    await bidder.methods.bid(0, exchange.options.address, srcDstPathData(), 0.01);
    await mineBlock(10);
    await bidder.methods.fill(0, 0.01, zeroAddress, "");
  });

  it("bid & fill", async () => {
    await bidder.methods.bid(0, exchange.options.address, srcDstPathData(), 0.01);
    await mineBlock(10);
    await bidder.methods.fill(0, 0.01, zeroAddress, "");
  });
});
