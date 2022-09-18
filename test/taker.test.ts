import {
  dstToken,
  exchange,
  fundSrcTokenFromWhale,
  initFixture,
  nativeToken,
  srcToken,
  swapDataForUniV2,
  taker,
  twap,
  user,
  withUniswapV2Exchange,
} from "./fixture";
import { deployArtifact, expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { ask, expectFilled } from "./twap-utils";
import { account, bn, bn18, web3, zeroAddress } from "@defi.org/web3-candies";
import type { Taker } from "../typechain-hardhat/contracts/periphery";
import BigNumber from "bignumber.js";

describe("Taker", async () => {
  let takerContract: Taker;

  beforeEach(initFixture);
  beforeEach(withUniswapV2Exchange);

  beforeEach(async () => {
    takerContract = await deployArtifact<Taker>("Taker", { from: taker }, [twap.options.address, nativeToken.address]);
    await ask(2000, 1000, 0.5);
  });

  afterEach(async () => {
    expect(await dstToken.methods.balanceOf(takerContract.options.address).call()).bignumber.zero;
    expect(await nativeToken.methods.balanceOf(takerContract.options.address).call()).bignumber.zero;
    expect(await web3().eth.getBalance(takerContract.options.address)).bignumber.zero;
  });

  it("sanity", async () => {
    expect(await takerContract.methods.owner().call()).eq(taker);
    expect(await takerContract.methods.twap().call()).eq(twap.options.address);
    expect(await takerContract.methods.weth().call()).eq(nativeToken.address);
  });

  it("onlyOwner", async () => {
    await expectRevert(
      () => takerContract.methods.bid(0, zeroAddress, 0, 0, []).send({ from: user }),
      "caller is not the owner"
    );
    await expectRevert(
      () => takerContract.methods.fill(0, zeroAddress, 0, []).send({ from: user }),
      "caller is not the owner"
    );
  });

  it("bid & fill, gas rebate as dstToken without swapping", async () => {
    await takerContract.methods
      .bid(0, exchange.options.address, await dstToken.amount(0.01), 0, swapDataForUniV2)
      .send({ from: taker });
    await mineBlock(10);

    const dstTokenBefore = await dstToken.methods.balanceOf(taker).call();
    await takerContract.methods.fill(0, zeroAddress, 0, []).send({ from: taker });

    await expectFilled(0, 1000, 0.5);
    expect(await dstToken.methods.balanceOf(taker).call()).bignumber.gte(dstTokenBefore);
  });

  it("gas rebate when dstToken == nativeToken, unwrap with or without swapping to native", async () => {
    await takerContract.methods
      .bid(0, exchange.options.address, await dstToken.amount(0.01), 0, swapDataForUniV2)
      .send({ from: taker });
    await mineBlock(10);

    const nativeBefore = await web3().eth.getBalance(taker);
    await takerContract.methods
      .fill(
        0,
        exchange.options.address,
        1,
        web3().eth.abi.encodeParameters(["bool", "address[]"], [false, [dstToken.address, nativeToken.address]])
      )
      .send({ from: taker });

    await expectFilled(0, 1000, 0.5);
    expect(await web3().eth.getBalance(taker)).bignumber.gte(nativeBefore);
  });

  describe("rescue", async () => {
    it("sends native token balance to owner", async () => {
      const sombody = await account(6);
      await web3().eth.sendTransaction({
        value: bn18(10).toString(),
        from: sombody,
        to: takerContract.options.address,
      });
      expect(await web3().eth.getBalance(takerContract.options.address)).bignumber.eq(bn18(10));

      const startBalance = await web3().eth.getBalance(taker);
      await takerContract.methods.rescue(zeroAddress).send({ from: sombody });
      expect(await web3().eth.getBalance(taker)).bignumber.closeTo(bn(startBalance).plus(bn18(10)), bn18(0.01));
    });

    it("sends ERC20 token balance to owner", async () => {
      const sombody = await account(6);
      await fundSrcTokenFromWhale(takerContract.options.address, 10);
      expect(await srcToken.methods.balanceOf(takerContract.options.address).call()).bignumber.eq(
        await srcToken.amount(10)
      );

      const startBalance = await srcToken.methods.balanceOf(taker).call().then(BigNumber);
      await takerContract.methods.rescue(srcToken.address).send({ from: sombody });
      expect(await srcToken.methods.balanceOf(taker).call()).bignumber.eq(startBalance.plus(await srcToken.amount(10)));
    });
  });
});
