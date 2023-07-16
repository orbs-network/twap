import {
  Abi,
  Token,
  bn18,
  chainId,
  contract,
  erc20,
  iweth,
  maxUint256,
  networks,
  web3,
  zero,
  zeroAddress,
} from "@defi.org/web3-candies";
import { deployArtifact, expectRevert, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import { endTime, exchange, initFixture, network, taker, twap, user, withUniswapV2Exchange } from "./fixture";

describe("FeeOnTransfer tokens", async () => {
  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  let token: Token;

  beforeEach("deploy mock deflationary token", async () => {
    token = erc20("FoT", (await deployArtifact("MockDeflationaryToken", { from: user })).options.address);
    expect(await token.methods.balanceOf(user).call()).bignumber.eq("100e18");
    expect(await web3().eth.getBalance(user)).bignumber.gte("100e18");
  });

  beforeEach("add liquidity, 50 token + 100 eth", async () => {
    await addLiquidityETH(user, token, 50, 100);
  });

  it("TWAP supports FOT tokens", async () => {
    await token.methods.approve(twap.options.address, maxUint256).send({ from: user });
    await twap.methods
      .ask([
        zeroAddress,
        token.address,
        network.wToken.address,
        (await token.amount(10)).toString(),
        bn18().toString(),
        1,
        endTime(),
        60,
        60,
        [],
      ])
      .send({ from: user });

    await twap.methods
      .bid(
        0,
        exchange.options.address,
        0,
        30_000,
        web3().eth.abi.encodeParameters(["bool", "address[]"], [true, [token.options.address, network.wToken.address]])
      )
      .send({ from: taker });

    await mineBlock(60);
    await twap.methods.fill(0).send({ from: taker });
  });

  describe("UniswapV2Exchange supports FOT tokens", async () => {
    it("throws on normal swap", async () => {
      await token.methods.approve(exchange.options.address, maxUint256).send({ from: user });
      const data = web3().eth.abi.encodeParameters(
        ["bool", "address[]"],
        [false, [token.options.address, network.wToken.address]]
      );
      await expectRevert(
        () =>
          exchange.methods.swap(token.options.address, network.wToken.address, 100, 0, [], data).send({ from: user }),
        /(UniswapV2|Pancake|Pangolin|StellaSwapV2): K/
      );
    });

    it("sell tokens with FOT", async () => {
      const amountIn = bn18(10);
      const data = web3().eth.abi.encodeParameters(
        ["bool", "address[]"],
        [true, [token.options.address, network.wToken.address]]
      );

      expect(
        await (exchange as any).methods
          .getAmountOut(token.options.address, network.wToken.address, amountIn, [], data)
          .call()
      ).bignumber.closeTo(bn18(18.1), bn18(0.1)); // including exchange fee ~ 0.2-0.3%

      expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(50));
      expect(await iweth(network.id).methods.balanceOf(user).call()).bignumber.eq(zero);
      await token.methods.approve(exchange.options.address, amountIn).send({ from: user });
      await exchange.methods
        .swap(token.options.address, network.wToken.address, amountIn, 0, [], data)
        .send({ from: user });

      expect(await token.methods.balanceOf(user).call()).bignumber.eq(bn18(40));
      expect(await iweth(network.id).methods.balanceOf(user).call()).bignumber.closeTo(bn18(15.2), bn18(0.1));
    });
  });
});

async function addLiquidityETH(depositor: string, token: Token, tokens: number, eths: number) {
  const chain = await chainId();
  const amountToken = await token.amount(tokens);
  const amountEth = bn18(eths);
  const addLiquidityMethodName = `addLiquidity${chain === networks.avax.id ? "AVAX" : "ETH"}`;
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
      name: addLiquidityMethodName,
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
  await router.methods[addLiquidityMethodName](
    token.options.address,
    amountToken.toString(),
    amountToken.toString(),
    amountEth.toString(),
    depositor,
    maxUint256
  ).send({ from: depositor, value: amountEth });
}
