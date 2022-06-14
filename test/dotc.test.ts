import { useChaiBN } from "@defi.org/web3-candies";
import { ask, bid } from "./base.test";

useChaiBN();

describe("DOTC", async () => {
  it("single chunk", async () => {
    await ask(10_000, 10_000, 5);
    await bid(0);
    // TODO
    // await mineBlock(10);
    // await fill(0);
    //
    // await expectFilled(0, 10_000, 5);
    //
    // expect((await order(0)).taker).eq(zeroAddress);
    // expect((await order(0)).bid).eq("0");
  });

  xit("mutiple chunks", async () => {
    // TODO
    // await ask(10_000, 2500, 1.25);
    //
    // await bid(0, 1.25);
    // await mineBlock(10);
    // await fill(0);
    // await expectFilled(0, 2500, 1.25);
    //
    // await mineBlock(60);
    // await bid(0, 1.25);
    // await mineBlock(10);
    // await fill(0);
    // await expectFilled(0, 5000, 2.5);
  });

  xit("all chunks", async () => {
    // TODO
    // await ask(10_000, 2500, 1.25);
    //
    // for (let i = 1; i <= 4; i++) {
    //   await bid(0, 1.25);
    //   await mineBlock(10);
    //   await fill(0);
    //   await mineBlock(60);
    //   await expectFilled(0, 2500 * i, 1.25 * i);
    // }
    //
    // await expectFilled(0, 10_000, 5);
  });

  xit("last chunk partial amount", async () => {
    // TODO
    // await ask(10_000, 4000, 2);
    //
    // await bid(0, 2);
    // await mineBlock(10);
    // await fill(0);
    // await mineBlock(60);
    // await bid(0, 2);
    // await mineBlock(10);
    // await fill(0);
    // await mineBlock(60);
    // await expectFilled(0, 8000, 4);
    //
    // await bid(0, 1);
    // await mineBlock(10);
    // await fill(0);
    // await expectFilled(0, 10_000, 5);
  });

  xit("outbid current bid within pending period", async () => {
    // TODO
    // await ask(10_000, 4000, 2);
    //
    // await bid(0, 2);
    // await mineBlock(5);
    // await bid(0, 2.1);
    // await mineBlock(10);
    //
    // await fill(0);
    // await expectFilled(0, 4000, 2.1);
  });
});
