import { expect } from "chai";
import { exchange, initFixture, nativeToken, srcToken, user, userSrcTokenStartBalance } from "./fixture";
import { srcDstPathData } from "./twap-utils";
import { Abi, bn18, contract, erc20, expectRevert, maxUint256, Token, web3, zero } from "@defi.org/web3-candies";
import { deployArtifact } from "@defi.org/web3-candies/dist/hardhat";
import type { UniswapV2Exchange } from "../typechain-hardhat/contracts/exchange";
import type { MockDeflationaryToken } from "../typechain-hardhat/contracts/test";

describe("IExchange implementations", async () => {
  beforeEach(initFixture);

  describe("UniswapV2Exchange", async () => {
    it("swaps with uniswap", async () => {
      await srcToken.methods.approve(exchange.options.address, maxUint256).send({ from: user });
      await exchange.methods.swap(await srcToken.amount(100), 0, srcDstPathData()).send({ from: user });
      expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
        (await srcToken.amount(userSrcTokenStartBalance)).sub(await srcToken.amount(100))
      );
    });

    describe("fee on transfer tokens", async () => {
      let token: Token;

      beforeEach("deploy mock deflationary token", async () => {
        token = erc20("FoT", (await deployArtifact("MockDeflationaryToken", { from: user })).options.address);
        await expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(100));
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
        await expectRevert(() => exchange.methods.swap(100, 0, data).send({ from: user }), "UniswapV2: K");
      });

      it("sell tokens with FoT", async () => {
        const amountIn = bn18(10);
        const data = web3().eth.abi.encodeParameters(
          ["bool", "address[]"],
          [true, [token.options.address, nativeToken.address]]
        );

        expect(await exchange.methods.getAmountOut(amountIn, data).call()).bignumber.closeTo(bn18(18.1), bn18(0.1)); // including exchange fee ~ 0.2-0.3%

        expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(50));
        expect(await nativeToken.methods.balanceOf(user).call()).bignumber.eq(zero);
        await token.methods.approve(exchange.options.address, amountIn).send({ from: user });
        await exchange.methods.swap(amountIn, 0, data).send({ from: user });

        expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(40));
        expect(await nativeToken.methods.balanceOf(user).call()).bignumber.closeTo(
          await nativeToken.amount(15.2),
          bn18(0.1)
        );
      });
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
