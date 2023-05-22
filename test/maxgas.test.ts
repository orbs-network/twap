import { expect } from "chai";
import hardhatConfig from "../hardhat.config";
import { ask, endTime, time } from "./twap-utils";
import { dstToken, exchange, initFixture, lens, srcToken, taker, twap, user, withOdosExchange } from "./fixture";
import { mineBlock } from "@defi.org/web3-candies/dist/hardhat";
import _ from "lodash";

/**
 * very long test: only enable this without logs, otherwise will timeout
 */
xdescribe("maxgas: special test: large order history, paginated reads", async () => {
  const ASSUME_MAX_GAS = 15_000_000;
  const EXPIRED_ASKS = 5_000;

  const PAGE_SIZE = 2500; // under 15m gas

  beforeEach(() => initFixture());

  // beforeEach(() => withOdosExchange());

  beforeEach(async () => {
    expect(hardhatConfig.networks?.hardhat?.blockGasLimit).eq(ASSUME_MAX_GAS);
    await ask(2000, 123, 0.5, endTime());
    await manyExpiredAsks();
    await ask(2000, 456, 0.5);
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
      .approve(twap.options.address, (await srcToken.amount(2000)).times(EXPIRED_ASKS))
      .send({ from: user });
    const now = await time();
    const _srcAmount = await srcToken.amount(2000);
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
              _srcAmount.toString(),
              _srcBidAmount.toString(),
              _dstMinAmount.toString(),
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
