import { block, zeroAddress } from "@defi.org/web3-candies";
import { expect } from "chai";
import { dstToken, exchange, srcToken, swapDataForUniV2, taker, twap, user, userSrcTokenStartBalance } from "./fixture";

export async function ask(
  srcAmount: number,
  srcBidAmount: number,
  dstMinAmount: number,
  deadline: number = 0,
  exchange: string = zeroAddress,
  delay: number = 60,
  _user: string = user
) {
  deadline = deadline || (await time()) + 1000;
  const _srcAmount = await srcToken.amount(srcAmount);
  const _srcRate = await srcToken.amount(srcBidAmount);
  const _dstRate = await dstToken.amount(dstMinAmount);
  await srcToken.methods.approve(twap.options.address, _srcAmount).send({ from: _user });
  return twap.methods
    .ask(
      exchange,
      srcToken.address,
      dstToken.address,
      _srcAmount,
      _srcRate,
      _dstRate.isZero() ? 1 : _dstRate,
      deadline,
      delay
    )
    .send({ from: _user });
}

export async function bid(id: number, fee: number = 0.01, slippagePercent = 0, swapData: string = swapDataForUniV2) {
  return twap.methods
    .bid(id, exchange.options.address, await dstToken.amount(fee), slippagePercent * 1000, swapData)
    .send({ from: taker });
}

export async function fill(id: number) {
  return twap.methods.fill(id).send({ from: taker });
}

export async function order(id: number): Promise<any> {
  return twap.methods.order(id).call();
}

export async function expectFilled(id: number, srcExactAmount: number, dstMinAmount: number) {
  expect((await order(id)).srcFilledAmount).bignumber.eq(await srcToken.amount(srcExactAmount));

  expect(await srcToken.methods.balanceOf(user).call()).bignumber.eq(
    await srcToken.amount(userSrcTokenStartBalance - srcExactAmount)
  );

  expect(await dstToken.methods.balanceOf(user).call())
    .bignumber.gte(await dstToken.amount(dstMinAmount))
    .closeTo(await dstToken.amount(dstMinAmount), await dstToken.amount(dstMinAmount * 0.2));
}

export async function time() {
  return (await block()).timestamp;
}

export function endTime() {
  return 2 ** 32 - 2;
}
