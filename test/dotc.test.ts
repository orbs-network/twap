import { deployer, fromToken, keeper, keeperOwner, orderbook, toToken, user } from "./base.test";
import { expect } from "chai";
import { account, bn, erc20s, Token, useChaiBN, web3 } from "@defi.org/web3-candies";
import BN from "bn.js";
import _ from "lodash";
import { deployArtifact } from "@defi.org/web3-candies/dist/hardhat";
import { Keeper } from "../typechain-hardhat/Keeper";

useChaiBN();

describe("Decentralized OTC OrderBook", async () => {
  beforeEach(async () => {});

  it("maker creates ask, adds to order book", async () => {
    expect(await orderbook.methods.length().call()).bignumber.zero;
    await ask();
    expect(await orderbook.methods.length().call()).bignumber.eq("1");
  });

  it.only("e2e", async () => {
    await ask();
    await bid(0);
    await keeper.methods.execute(0).send({ from: keeperOwner });
  });

  async function ask() {
    const fromAmount = await fromToken.amount(10_000);
    const minToAmount = await toToken.amount(5);
    await fromToken.methods.approve(orderbook.options.address, fromAmount).send({ from: user });
    await orderbook.methods.ask(fromToken.address, toToken.address, fromAmount, minToAmount, Math.round(Date.now() / 1000 + 60)).send({ from: user });
  }

  async function bid(id: number) {
    const amount = await toToken.amount(5);
    await toToken.methods.approve(keeper.options.address, amount).send({ from: keeperOwner });
    await keeper.methods.bid(id, amount).send({ from: keeperOwner });
  }
});
