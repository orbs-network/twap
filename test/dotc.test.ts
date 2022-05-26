import {
  deployer,
  srcToken,
  keeper,
  keeperOwner,
  orderbook,
  dstToken,
  user,
  now,
  userSrcTokenStartBalance,
  ask,
  bid,
  execute,
  order,
  expectFilled,
} from "./base.test";
import { expect } from "chai";
import {
  account,
  bn,
  bn18,
  convertDecimals,
  erc20s,
  ether,
  parseEvents,
  Token,
  useChaiBN,
  web3,
  zeroAddress,
} from "@defi.org/web3-candies";
import BN from "bn.js";
import _ from "lodash";
import { deployArtifact, mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { Keeper } from "../typechain-hardhat/Keeper";

useChaiBN();

describe.only("Decentralized OTC OrderBook", async () => {
  beforeEach(async () => {});

  it("single chunk", async () => {
    await ask(10_000, 10_000, 5);
    await bid(0, 5);
    await mineBlock(60);
    await execute(0);

    await expectFilled(0, 10_000, 5);

    expect((await order(0)).taker).eq(zeroAddress);
    expect((await order(0)).bid).eq("0");
  });

  it("mutiple chunks", async () => {
    await ask(10_000, 2500, 1.25);

    await bid(0, 1.25);
    await mineBlock(60);
    await execute(0);
    await expectFilled(0, 2500, 1.25);

    await bid(0, 1.25);
    await mineBlock(60);
    await execute(0);
    await expectFilled(0, 5000, 2.5);
  });

  it("all chunks", async () => {
    await ask(10_000, 2500, 1.25);

    for (let i = 1; i <= 4; i++) {
      await bid(0, 1.25);
      await mineBlock(60);
      await execute(0);
      await expectFilled(0, 2500 * i, 1.25 * i);
    }

    await expectFilled(0, 10_000, 5);
  });

  it("last chunk partial amount", async () => {
    await ask(10_000, 4000, 2);

    await bid(0, 2);
    await mineBlock(60);
    await execute(0);
    await bid(0, 2);
    await mineBlock(60);
    await execute(0);
    await expectFilled(0, 8000, 4);

    await bid(0, 1);
    await mineBlock(60);
    await execute(0);
    await expectFilled(0, 10_000, 5);
  });

  it("outbid current bid within pending period", async () => {
    await ask(10_000, 4000, 2);

    await bid(0, 2);
    await mineBlock(5);
    await bid(0, 2.1);
    await mineBlock(10);

    await execute(0);
    await expectFilled(0, 4000, 2.1);
  });
});
