import { account, bn, bn18, web3, zeroAddress } from "@defi.org/web3-candies";
import { deployArtifact, expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import BigNumber from "bignumber.js";
import { expect } from "chai";
import type { Taker } from "../typechain-hardhat/contracts/periphery";
import {
  ask,
  deployer,
  dstToken,
  exchange,
  expectFilled,
  fundSrcTokenFromWhale,
  initFixture,
  network,
  srcToken,
  swapBidDataForUniV2,
  taker,
  twap,
  user,
  withUniswapV2Exchange,
} from "./fixture";

describe("Taker", async () => {
  let takerContract: Taker;

  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  beforeEach(async () => {
    takerContract = await deployArtifact<Taker>("Taker", { from: deployer }, [twap.options.address, [taker, deployer]]);
    await ask(2000, 1000, 0.5);
  });

  afterEach(async () => {
    expect(await dstToken.methods.balanceOf(takerContract.options.address).call()).bignumber.zero;
    expect(await srcToken.methods.balanceOf(takerContract.options.address).call()).bignumber.zero;
    expect(await web3().eth.getBalance(takerContract.options.address)).bignumber.zero;
  });

  it("sanity", async () => {
    expect(await takerContract.methods.twap().call()).eq(twap.options.address);
    expect(await takerContract.methods.owners(taker).call()).eq(true);
    expect(await takerContract.methods.owners(deployer).call()).eq(true);
    expect(await takerContract.methods.owners(user).call()).eq(false);
  });

  it("onlyOwners", async () => {
    await expectRevert(
      async () =>
        takerContract.methods
          .bid(0, exchange.options.address, await dstToken.amount(0.01), 0, swapBidDataForUniV2)
          .send({ from: user }),
      "onlyOwners"
    );
    await expectRevert(() => takerContract.methods.fill(0, zeroAddress, 0, []).send({ from: user }), "onlyOwners");
    await expectRevert(() => takerContract.methods.rescue(zeroAddress).send({ from: user }), "onlyOwners");
    await takerContract.methods
      .bid(0, exchange.options.address, await dstToken.amount(0.01), 0, swapBidDataForUniV2)
      .send({ from: deployer }); // other owner
  });

  it("bid & fill, gas rebate as dstToken without swapping", async () => {
    await takerContract.methods
      .bid(0, exchange.options.address, await dstToken.amount(0.01), 0, swapBidDataForUniV2)
      .send({ from: taker });
    await mineBlock(60);

    const dstTokenBefore = await dstToken.methods.balanceOf(taker).call();
    await takerContract.methods.fill(0, zeroAddress, 0, []).send({ from: taker });

    await expectFilled(0, 1000, 0.5);
    expect(await dstToken.methods.balanceOf(taker).call()).bignumber.gte(dstTokenBefore);
  });

  it("gas rebate when dstToken == nativeToken, unwrap with or without swapping to native", async () => {
    await takerContract.methods
      .bid(0, exchange.options.address, await dstToken.amount(0.01), 0, swapBidDataForUniV2)
      .send({ from: taker });
    await mineBlock(60);

    const nativeBefore = await web3().eth.getBalance(taker);
    await takerContract.methods
      .fill(
        0,
        exchange.options.address,
        1,
        web3().eth.abi.encodeParameters(["bool", "address[]"], [false, [dstToken.address, network.wToken.address]])
      )
      .send({ from: taker });

    await expectFilled(0, 1000, 0.5);
    expect(await web3().eth.getBalance(taker)).bignumber.gte(nativeBefore);
  });

  describe("add and remove owners by deployer", () => {
    it("add and remove", async () => {
      expect(await takerContract.methods.owners(user).call()).eq(false);
      await takerContract.methods.addOwners([user]).send({ from: deployer });
      expect(await takerContract.methods.owners(user).call()).eq(true);
      await takerContract.methods.removeOwners([user]).send({ from: deployer });
      expect(await takerContract.methods.owners(user).call()).eq(false);
    });

    it("only deployer", async () => {
      await expectRevert(() => takerContract.methods.addOwners([user]).send({ from: taker }), "owner");
    });
  });

  describe("rescue", async () => {
    it("sends native token balance to caller", async () => {
      const sombody = await account(6);
      await web3().eth.sendTransaction({
        value: bn18(10).toString(),
        from: sombody,
        to: takerContract.options.address,
      });
      expect(await web3().eth.getBalance(takerContract.options.address)).bignumber.eq(bn18(10));

      const startBalance = await web3().eth.getBalance(taker);
      await takerContract.methods.rescue(zeroAddress).send({ from: taker });
      expect(await web3().eth.getBalance(taker)).bignumber.closeTo(bn(startBalance).plus(bn18(10)), bn18(0.01));
    });

    it("sends ERC20 token balance to owner", async () => {
      await fundSrcTokenFromWhale(takerContract.options.address, 10);
      expect(await srcToken.methods.balanceOf(takerContract.options.address).call()).bignumber.eq(
        await srcToken.amount(10)
      );

      const startBalance = await srcToken.methods.balanceOf(taker).call().then(BigNumber);
      await takerContract.methods.rescue(srcToken.address).send({ from: taker });
      expect(await srcToken.methods.balanceOf(taker).call()).bignumber.eq(startBalance.plus(await srcToken.amount(10)));
    });
  });
});
