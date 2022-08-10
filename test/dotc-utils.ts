import { block, web3, zeroAddress } from "@defi.org/web3-candies";
import { expect } from "chai";
import { dotc, dstToken, exchange, srcToken, taker, user, userSrcTokenStartBalance } from "./fixture";

export async function ask(
  srcAmount: number,
  srcRate: number,
  dstRate: number,
  deadline: number = 0,
  exchange: string = zeroAddress
) {
  deadline = deadline || (await time()) + 1000;
  const _srcAmount = await srcToken.amount(srcAmount);
  const _srcRate = await srcToken.amount(srcRate);
  const _dstRate = await dstToken.amount(dstRate);
  await srcToken.methods.approve(dotc.options.address, _srcAmount).send({ from: user });
  return dotc.methods
    .ask(exchange, srcToken.address, dstToken.address, _srcAmount, _srcRate, _dstRate, deadline)
    .send({ from: user });
}

export async function bid(id: number, path: string[] = [srcToken.address, dstToken.address], fee: number = 0.01) {
  return dotc.methods
    .bid(id, exchange.options.address, web3().eth.abi.encodeParameter("address[]", path), await dstToken.amount(fee))
    .send({ from: taker });
}

export async function fill(id: number) {
  return dotc.methods.fill(id).send({ from: taker });
}

export async function order(id: number): Promise<any> {
  return dotc.methods.order(id).call();
}

export async function expectFilled(id: number, srcExactAmount: number, dstMinAmount: number) {
  expect((await order(id)).filled.amount).bignumber.eq(await srcToken.amount(srcExactAmount));

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

export function srcDstPathData() {
  return web3().eth.abi.encodeParameter("address[]", [srcToken.address, dstToken.address]);
}
