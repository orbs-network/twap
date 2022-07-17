import { deployArtifact } from "@defi.org/web3-candies/dist/hardhat";
import { bid, deployer, dotc, dstToken, expectFilled, srcToken } from "./base.test";
import type { MockVault } from "../typechain-hardhat/contracts/test";
import { maxUint256 } from "@defi.org/web3-candies";
import { expect } from "chai";

describe("user is vault", async () => {
  let vault: MockVault;

  beforeEach(async () => {
    vault = await deployArtifact("MockVault", { from: deployer }, [
      dotc.options.address,
      srcToken.address,
      dstToken.address,
    ]);
  });

  xit("callback on each fill", async () => {
    await vault.methods
      .createAsk(await srcToken.amount(10_000), await srcToken.amount(2000), await dstToken.amount(1), maxUint256)
      .send({ from: deployer });

    expect(await vault.methods.filled(0).call()).empty;

    await bid(0);
    await expectFilled(0, 2000, 1);

    const filled = await vault.methods.filled(0).call();
    expect((filled.o as any).id).bignumber.zero;
    expect(filled.srcAmountIn).bignumber.eq(await srcToken.amount(2000));
    expect(filled.dstAmountOut).bignumber.eq(await dstToken.amount(1));
  });
});
