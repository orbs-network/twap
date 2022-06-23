import { useChaiBN } from "@defi.org/web3-candies";
import { ask, bid, describeOnETH, expectFilled, fill, withMockExchange } from "./base.test";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";

useChaiBN();

describeOnETH("DOTC", async () => {
  it("single chunk", async () => {
    await ask(2000, 2000, 1);
    await bid(0);
    await mineBlock(10);
    await fill(0);

    await expectFilled(0, 2000, 1);
  });

  it("mutiple chunks", async () => {
    await ask(10_000, 2500, 1.25);

    for (let i = 1; i <= 4; i++) {
      await bid(0);
      await mineBlock(10);
      await fill(0);
      await expectFilled(0, 2500 * i, 1.25 * i);

      await mineBlock(60);
    }

    await expectFilled(0, 10_000, 5);
  });

  it("last chunk may be partial amount", async () => {
    await ask(10_000, 4000, 2);

    await bid(0);
    await mineBlock(10);
    await fill(0);
    await mineBlock(60);

    await bid(0);
    await mineBlock(10);
    await fill(0);
    await mineBlock(60);

    await expectFilled(0, 8000, 4);

    await bid(0);
    await mineBlock(10);
    await fill(0);
    await expectFilled(0, 10_000, 5);
  });

  it("outbid current bid within pending period", async () => {
    await ask(2000, 1000, 0.5);

    await bid(0);
    await mineBlock(1);

    await withMockExchange(0.6);
    await bid(0);

    await mineBlock(10);
    await fill(0);
    await expectFilled(0, 1000, 0.6);
  });
});
