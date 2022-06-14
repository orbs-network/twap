import { ask, bid, describeOnETH, dotc, fill, time } from "./base.test";
import { expectRevert } from "@defi.org/web3-candies";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";

describe("Errors", () => {
  describe("order", async () => {
    it("invalid id", async () => {
      await expectRevert(() => dotc.methods.order(0).call(), "invalid id");
      await expectRevert(() => dotc.methods.order(123).call(), "invalid id");
    });
  });

  describeOnETH("verifyBid", async () => {
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
      await ask(2000, 1000, 0.5);
      await bid(0);
      await fill(0);

      await expectRevert(() => bid(0), "recently filled");

      await mineBlock(await dotc.methods.FILL_DELAY_SEC().call().then(parseInt));
      await bid(0);
    });

    it("low rate", async () => {
      await ask(2000, 1000, 2);
      await expectRevert(() => bid(0), "low rate");
    });
  });

  xit("check balanceOf in the bid?", async () => {
    // TODO
  });
});
