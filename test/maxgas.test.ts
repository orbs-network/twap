import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import { expect } from "chai";
import _ from "lodash";
import hardhatConfig from "../hardhat.config";
import {
  ask,
  dstToken,
  endTime,
  exchange,
  initFixture,
  lens,
  srcToken,
  taker,
  time,
  twap,
  user,
  withUniswapV2Exchange,
} from "./fixture";

/**
 * very long test: only enable this without logs, otherwise will timeout
 */
xdescribe("maxgas: special test: large order history, paginated reads", async () => {
  const ASSUME_MAX_GAS = 15_000_000;
  const EXPIRED_ASKS = 5_000;

  const PAGE_SIZE = 2500; // under 15m gas

  beforeEach(() => initFixture());
  beforeEach(() => withUniswapV2Exchange());

  beforeEach(async () => {
    expect(hardhatConfig.networks?.hardhat?.blockGasLimit).eq(ASSUME_MAX_GAS);
    await ask({ srcBidAmount: 123, dstMinAmount: 0.5, chunks: 10, deadline: endTime() });
    await manyExpiredAsks();
    await ask({ srcBidAmount: 456 });
    expect(parseInt(await lens.methods.length().call())).eq(EXPIRED_ASKS + 2);
  });

  it("taker biddable orders", async () => {
    const gasUsed = await lens.methods.takerBiddableOrders(taker, PAGE_SIZE, PAGE_SIZE).estimateGas();
    console.log("⚠️ gasUsed", gasUsed);
    expect(gasUsed)
      .lt(ASSUME_MAX_GAS)
      .closeTo(ASSUME_MAX_GAS, ASSUME_MAX_GAS * 0.2);

    const length = parseInt(await lens.methods.length().call());
    let result: any = [];
    for (let i = length - 1; i >= 0; i -= PAGE_SIZE) {
      result = result.concat(await lens.methods.takerBiddableOrders(taker, i, PAGE_SIZE).call());
    }

    expect(result.length).eq(2);
    expect(result[0].id).eq("5001");
    expect(result[0].ask.srcBidAmount).bignumber.eq(await srcToken.amount(456));
    expect(result[1].id).eq("0");
    expect(result[1].ask.srcBidAmount).bignumber.eq(await srcToken.amount(123));
  });

  async function manyExpiredAsks() {
    await srcToken.methods
      .approve(twap.options.address, (await srcToken.amount(2000)).times(EXPIRED_ASKS).toFixed(0))
      .send({ from: user });
    const now = await time();
    const _srcBidAmount = await srcToken.amount(1000);
    const _dstMinAmount = await dstToken.amount(0.5);

    for (let chunk = 0; chunk < 10; chunk++) {
      const times: number[] = [];
      _.times(EXPIRED_ASKS / 10, (i) => times.push((EXPIRED_ASKS / 10) * chunk + i));
      await Promise.all(
        _.map(times, async (i) =>
          twap.methods
            .ask([
              exchange.options.address,
              srcToken.address,
              dstToken.address,
              _srcBidAmount.toString(),
              _dstMinAmount.toString(),
              2,
              now + 1000 + i + (EXPIRED_ASKS / 10) * chunk,
              60,
              60,
              [],
            ])
            .send({ from: user })
        )
      );
    }
    await mineBlock(EXPIRED_ASKS * 10);
  }
});
