import { expect } from "chai";
import {
  deployer,
  dstToken,
  encodedSwapPath,
  exchange,
  getAmountOutSrcToDst,
  initFixture,
  nativeToken,
  srcToken,
  user,
  userSrcTokenStartBalance,
  withUniswapV2Exchange,
} from "./fixture";
import {
  Abi,
  bn18,
  contract,
  currentNetwork,
  erc20,
  maxUint256,
  networks,
  Token,
  web3,
  zero,
  zeroAddress,
} from "@defi.org/web3-candies";
import { deployArtifact, expectRevert } from "@defi.org/web3-candies/dist/hardhat";
import type { MockDeflationaryToken } from "../typechain-hardhat/contracts/test";
import type { IExchange } from "../typechain-hardhat/contracts";
import { Paraswap } from "./paraswap";
import BigNumber from "bignumber.js";

describe("IExchange implementations", async () => {
  describe("UniswapV2Exchange", () => {
    beforeEach(initFixture);
    beforeEach(withUniswapV2Exchange);

    it("swap", async () => {
      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });

      const amountIn = await srcToken.amount(100);
      const expectedOut = await getAmountOutSrcToDst(amountIn);
      expect(expectedOut).bignumber.gt(zero);
      await exchange.methods
        .swap(srcToken.address, dstToken.address, amountIn, expectedOut, encodedSwapPath())
        .send({ from: user });

      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).minus(amountIn)
      );
      expect(await dstToken.methods.balanceOf(user).call()).bignumber.closeTo(expectedOut, expectedOut.times(0.01));
    });

    describe("fee on transfer tokens", async () => {
      let token: Token;

      beforeEach("deploy mock deflationary token", async () => {
        token = erc20("FoT", (await deployArtifact("MockDeflationaryToken", { from: user })).options.address);
        await expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(100));
        await expect(await web3().eth.getBalance(user)).bignumber.gte(bn18(100));
      });

      beforeEach("add liquidity, 50 token + 100 eth", async () => {
        await addLiquidityETH(user, token, 50, 100);
      });

      it("throws on normal swap", async () => {
        await token.methods.approve(exchange.options.address, maxUint256).send({ from: user });
        const data = web3().eth.abi.encodeParameters(
          ["bool", "address[]"],
          [false, [token.options.address, nativeToken.address]]
        );
        await expectRevert(
          () => exchange.methods.swap(token.options.address, nativeToken.address, 100, 0, data).send({ from: user }),
          /(UniswapV2|Pancake): K/
        );
      });

      it("sell tokens with FoT", async () => {
        const amountIn = bn18(10);
        const data = web3().eth.abi.encodeParameters(
          ["bool", "address[]"],
          [true, [token.options.address, nativeToken.address]]
        );

        expect(
          await exchange.methods.getAmountOut(token.options.address, nativeToken.address, amountIn, data).call()
        ).bignumber.closeTo(bn18(18.1), bn18(0.1)); // including exchange fee ~ 0.2-0.3%

        expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(50));
        expect(await nativeToken.methods.balanceOf(user).call()).bignumber.eq(zero);
        await token.methods.approve(exchange.options.address, amountIn).send({ from: user });
        await exchange.methods.swap(token.options.address, nativeToken.address, amountIn, 0, data).send({ from: user });

        expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(40));
        expect(await nativeToken.methods.balanceOf(user).call()).bignumber.closeTo(
          await nativeToken.amount(15.2),
          bn18(0.1)
        );
      });
    });
  });

  describe("ParaswapExchange", () => {
    before("FTM only", async function () {
      if ((await currentNetwork()) !== networks.ftm) {
        console.log("FTM only");
        this.skip();
      }
    });

    beforeEach("must run on latest block due to paraswap backend", async () => {
      await initFixture(true);
    });

    let exchange: IExchange;

    beforeEach("fixture", async () => {
      exchange = await deployArtifact<IExchange>("ParaswapExchange", { from: deployer }, [
        "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57", // Paraswap Augustus
      ]);

      expect(await dstToken.methods.balanceOf(user).call()).bignumber.zero;
    });

    it("getAmountOut using pure encoded data from offchain", async () => {
      const encodedSwapData = web3().eth.abi.encodeParameters(
        ["uint256", "bytes"],
        [await dstToken.amount(123456789), []]
      );
      const expectedOut = await exchange.methods.getAmountOut(zeroAddress, zeroAddress, zero, encodedSwapData).call();
      expect(expectedOut).bignumber.eq(await dstToken.amount(123456789));
    });

    it("swap with data from paraswap", async () => {
      const amountIn = await srcToken.amount(10_000);

      const paraswapRoute = await Paraswap.findRoute(srcToken, dstToken, amountIn);
      expect(paraswapRoute.destAmount).bignumber.gte(await dstToken.amount(1));
      const dstMinOut = BigNumber(paraswapRoute.destAmount).times(0.99).integerValue();

      const swapData = await Paraswap.buildSwapData(paraswapRoute, dstMinOut, exchange.options.address);

      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });
      await exchange.methods
        .swap(srcToken.address, dstToken.address, amountIn, dstMinOut, swapData)
        .send({ from: user });

      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).minus(amountIn)
      );
      expect(await dstToken.methods.balanceOf(user).call()).bignumber.gte(dstMinOut);
    });
  });
});

export async function addLiquidityETH(depositor: string, token: Token, tokens: number, eths: number) {
  const amountToken = await token.amount(tokens);
  const amountEth = await nativeToken.amount(eths);
  const abi = [
    {
      inputs: [
        { name: "token", type: "address" },
        { name: "amountTokenDesired", type: "uint256" },
        { name: "amountTokenMin", type: "uint256" },
        { name: "amountETHMin", type: "uint256" },
        { name: "to", type: "address" },
        { name: "deadline", type: "uint256" },
      ],
      name: "addLiquidityETH",
      outputs: [
        { name: "amountToken", type: "uint256" },
        { name: "amountETH", type: "uint256" },
        { name: "liquidity", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
    },
  ];
  const router = contract(abi as Abi, await (exchange as any).methods.uniswap().call());
  await token.methods.approve(router.options.address, amountToken).send({ from: depositor });
  await router.methods
    .addLiquidityETH(token.options.address, amountToken, amountToken, amountEth, depositor, maxUint256)
    .send({ from: depositor, value: amountEth });
}
