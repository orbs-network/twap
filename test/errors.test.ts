import {
  ask,
  bid,
  describeOnETH,
  dotc,
  fill,
  setMockExchangeAmountOut,
  taker,
  time,
  withMockExchange,
} from "./base.test";
import { account, expectRevert } from "@defi.org/web3-candies";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";

describe("Errors", () => {
  describe("order", async () => {
    it("invalid id", async () => {
      await expectRevert(() => dotc.methods.order(0).call(), "invalid id");
      await expectRevert(() => dotc.methods.order(123).call(), "invalid id");
    });
  });

  describeOnETH("verify bid", async () => {
    it("expired", async () => {
      await ask(2000, 2000, 1, (await time()) - 1);
      await expectRevert(() => bid(0), "expired");

      await ask(2000, 2000, 1, (await time()) + 10);
      await bid(1);
    });

    it("low bid", async () => {
      await ask(2000, 2000, 1);
      await bid(0);
      await expectRevert(() => bid(0), "low bid");

      await ask(2000, 2000, 1);
      await bid(1);
    });

    it("recently filled", async () => {
      // TODO
      await ask(2000, 1000, 0.5);
      await bid(0);
      await mineBlock(30);
      await fill(0);

      await expectRevert(() => bid(0), "recently filled");

      await mineBlock(await dotc.methods.FILL_DELAY_SEC().call().then(parseInt));
      await bid(0);
    });

    it("insufficient amount out", async () => {
      await ask(2000, 1000, 2);
      await expectRevert(() => bid(0), "insufficient out");
    });

    it("insufficient amount out when last partial fill", async () => {
      await ask(2000, 1500, 1);
      await bid(0);
      await mineBlock(10);
      await fill(0);
      await mineBlock(60);

      await withMockExchange(0.1);

      await expectRevert(() => bid(0), "insufficient out");
    });

    xit("check balanceOf in the bid?", async () => {
      // TODO
    });
  });

  describeOnETH("perform fill", async () => {
    it("expired", async () => {
      await ask(2000, 1000, 0.5);
      await bid(0);
      await mineBlock(10000);
      await expectRevert(() => fill(0), "expired");
    });

    it("invalid taker when no existing bid", async () => {
      await ask(2000, 1000, 0.5);
      await expectRevert(() => fill(0), "invalid taker");
    });

    it("invalid taker when not the winning taker", async () => {
      await ask(2000, 1000, 0.5);
      await bid(0);
      const otherTaker = await account(9);
      expect(otherTaker).not.eq(taker);
      await expectRevert(() => dotc.methods.fill(0).send({ from: otherTaker }), "invalid taker");
    });

    it("pending bid when still in bidding window", async () => {
      await ask(2000, 1000, 0.5);
      await bid(0);
      await expectRevert(() => fill(0), "pending bid");
    });

    it("insufficient out", async () => {
      await ask(2000, 1000, 0.5);

      await withMockExchange(1);

      await bid(0);
      await mineBlock(10);

      await setMockExchangeAmountOut(0.1);
      await expectRevert(() => fill(0), "insufficient out");
    });
  });
});
