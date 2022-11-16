import { Config, isNativeAddress, TokenData } from "./configs";
import Web3 from "web3";
import BN from "bignumber.js";
import {
  contract,
  convertDecimals,
  erc20,
  iwethabi,
  parseEvents,
  setWeb3Instance,
  web3,
  zero,
} from "@defi.org/web3-candies";
import twapArtifact from "../artifacts/contracts/TWAP.sol/TWAP.json";
import lensArtifact from "../artifacts/contracts/periphery/Lens.sol/Lens.json";
import type { TWAP } from "../typechain-hardhat/contracts";
import type { Lens } from "../typechain-hardhat/contracts/periphery";
import _ from "lodash";

export const twapAbi = twapArtifact.abi as any;
export const lensAbi = lensArtifact.abi as any;

export class TWAPLib {
  public twap: TWAP;
  public lens: Lens;

  constructor(public config: Config, public provider: any, public maker: string) {
    setWeb3Instance(new Web3(provider));
    this.twap = contract<TWAP>(twapAbi, config.twapAddress);
    this.lens = contract<Lens>(lensAbi, config.lensAddress);
  }

  dstAmount = (srcToken: TokenData, dstToken: TokenData, srcAmount: BN.Value, srcUsd: BN.Value, dstUsd: BN.Value) =>
    convertDecimals(BN(srcAmount).times(srcUsd).div(dstUsd), srcToken.decimals, dstToken.decimals).integerValue(
      BN.ROUND_FLOOR
    );

  isNativeToken = (token: TokenData) => isNativeAddress(token.address);

  isValidChain = (chainId: number) => chainId === this.config.chainId;

  maxPossibleChunks = (srcToken: TokenData, srcAmount: BN.Value, srcUsd: BN.Value) =>
    BN.max(1, BN(srcAmount).div(BN(10).pow(srcToken.decimals).div(srcUsd).times(this.config.minChunkSizeUsd)))
      .integerValue(BN.ROUND_FLOOR)
      .toNumber();

  srcChunkAmount = (srcAmount: BN.Value, totalChunks: BN.Value) =>
    BN(srcAmount).div(totalChunks).integerValue(BN.ROUND_FLOOR);

  totalChunks = (srcAmount: BN.Value, srcChunkAmount: BN.Value) =>
    BN(srcAmount).div(srcChunkAmount).integerValue(BN.ROUND_CEIL).toNumber();

  fillDelayMillis = (totalChunks: BN.Value, maxDurationMillis: BN.Value) =>
    BN(totalChunks).lte(1) || BN(maxDurationMillis).lte(this.config.bidDelaySeconds)
      ? 0
      : BN.max(
          BN(maxDurationMillis)
            .div(totalChunks)
            .minus(BN(this.config.bidDelaySeconds * 1000)),
          0
        ).toNumber();

  dstMinAmountOut = (
    srcToken: TokenData,
    dstToken: TokenData,
    srcChunkAmount: BN.Value,
    limitDstPriceFor1Src: BN.Value,
    isMarketOrder: boolean
  ) =>
    isMarketOrder
      ? BN(1)
      : convertDecimals(
          BN(srcChunkAmount).times(limitDstPriceFor1Src),
          srcToken.decimals,
          dstToken.decimals
        ).integerValue(BN.ROUND_FLOOR);

  isMarketOrder = (order: Order) => order.ask.dstMinAmount.lte(1);

  orderProgress = (order: Order) => order.srcFilledAmount.div(order.ask.srcAmount);

  status = (order: Order) =>
    order.status > Date.now() / 1000
      ? Status.Open
      : order.status === 1
      ? Status.Canceled
      : order.status === 2
      ? Status.Completed
      : Status.Expired;

  async makerBalance(token: TokenData) {
    if (this.isNativeToken(token)) return web3().eth.getBalance(this.maker).then(BN);
    else return erc20(token.symbol, token.address, token.decimals).methods.balanceOf(this.maker).call().then(BN);
  }

  async wrapNativeToken(amount: BN.Value) {
    return erc20<any>(this.config.wToken.symbol, this.config.wToken.address, this.config.wToken.decimals, iwethabi)
      .methods.deposit()
      .send({ from: this.maker, value: BN(amount).toFixed(0) });
  }

  async waitForConfirmation<T>(fn: () => Promise<T>) {
    const nonceBefore = await web3().eth.getTransactionCount(this.maker);
    const result = await fn();
    while ((await web3().eth.getTransactionCount(this.maker)) === nonceBefore) {
      await new Promise((r) => setTimeout(r, 1000));
    }
    return result;
  }

  async hasAllowance(srcToken: TokenData, amount: BN.Value) {
    const token = erc20(srcToken.symbol, srcToken.address, srcToken.decimals);
    const allowance = BN(await token.methods.allowance(this.maker, this.config.twapAddress).call());
    return allowance.gte(amount);
  }

  async approve(srcToken: TokenData, amount: BN.Value) {
    const token = erc20(srcToken.symbol, srcToken.address, srcToken.decimals);
    await token.methods.approve(this.config.twapAddress, amount.toString()).send({ from: this.maker });
  }

  validateOrderInputs(
    srcToken: TokenData,
    dstToken: TokenData,
    srcAmount: BN.Value,
    srcChunkAmount: BN.Value,
    dstMinChunkAmountOut: BN.Value,
    deadline: BN.Value,
    fillDelaySeconds: BN.Value,
    srcUsd: BN.Value
  ): OrderInputValidation {
    if (_.isEqual(srcToken, dstToken)) return OrderInputValidation.equalTokens;

    if (BN(srcAmount).lte(0)) return OrderInputValidation.invalidSrcAmount;

    if (BN(srcChunkAmount).lte(0) || BN(srcChunkAmount).gt(srcAmount))
      return OrderInputValidation.invalidSrcChunkAmount;

    if (BN(dstMinChunkAmountOut).lte(0)) return OrderInputValidation.invalidDstMinChunkAmountOut;

    if (BN(deadline).integerValue(BN.ROUND_FLOOR).lte(Date.now())) return OrderInputValidation.invalidDeadline;

    if (BN(fillDelaySeconds).integerValue(BN.ROUND_FLOOR).lt(0)) return OrderInputValidation.invalidFillDelaySeconds;

    if (BN(srcUsd).lte(0)) return OrderInputValidation.invalidSrcUsd;
    const smallestChunkSize = BN(srcAmount).mod(srcChunkAmount).gt(0)
      ? BN(srcAmount).mod(srcChunkAmount)
      : BN(srcChunkAmount);
    if (smallestChunkSize.times(srcUsd).lt(this.config.minChunkSizeUsd))
      return OrderInputValidation.invalidSmallestSrcChunkUsd;

    return OrderInputValidation.valid;
  }

  async submitOrder(
    srcToken: TokenData,
    dstToken: TokenData,
    srcAmount: BN.Value,
    srcChunkAmount: BN.Value,
    dstMinChunkAmountOut: BN.Value,
    deadline: number,
    fillDelaySeconds: number,
    srcUsd: BN.Value
  ): Promise<number> {
    let validation = this.validateOrderInputs(
      srcToken,
      dstToken,
      srcAmount,
      srcChunkAmount,
      dstMinChunkAmountOut,
      deadline,
      fillDelaySeconds,
      srcUsd
    );
    if (validation !== OrderInputValidation.valid) throw new Error(`invalid inputs: ${validation}`);

    const tx = await this.twap.methods
      .ask(
        this.config.exchangeAddress,
        srcToken.address,
        dstToken.address,
        BN(srcAmount).toFixed(0),
        BN(srcChunkAmount).toFixed(0),
        BN(dstMinChunkAmountOut).toFixed(0),
        BN(deadline).div(1000).toFixed(0),
        BN(this.config.bidDelaySeconds).toFixed(0),
        BN(fillDelaySeconds).toFixed(0)
      )
      .send({ from: this.maker });

    const events = parseEvents(tx, this.twap.options.jsonInterface);
    return Number(events[0].returnValues.id);
  }

  async getOrder(id: number): Promise<Order> {
    return this.parseOrder(await this.twap.methods.order(id).call());
  }

  async cancelOrder(id: number) {
    await this.twap.methods.cancel(id).send({ from: this.maker });
  }

  async getAllOrders() {
    return _.map(await this.lens.methods.makerOrders(this.maker).call(), (o) => this.parseOrder(o));
  }

  parseOrder(r: any) {
    return {
      id: Number(r.id),
      status: Number(r.status),
      filledTime: Number(r.filledTime),
      srcFilledAmount: BN(r.srcFilledAmount),
      ask: {
        time: Number(r.ask.time),
        deadline: Number(r.ask.deadline),
        bidDelay: Number(r.ask.bidDelay),
        fillDelay: Number(r.ask.fillDelay),
        maker: r.ask.maker,
        exchange: r.ask.exchange,
        srcToken: r.ask.srcToken,
        dstToken: r.ask.dstToken,
        srcAmount: BN(r.ask.srcAmount),
        srcBidAmount: BN(r.ask.srcBidAmount),
        dstMinAmount: BN(r.ask.dstMinAmount),
      },
      bid: {
        time: Number(r.bid?.time || 0),
        taker: r.bid?.taker || "",
        exchange: r.bid?.exchange || "",
        dstAmount: BN(r.bid?.dstAmount || zero),
        dstFee: BN(r.bid?.dstFee || zero),
        data: r.bid?.data || "",
      },
    };
  }
}

export interface Order {
  id: number;
  status: number;
  filledTime: number;
  srcFilledAmount: BN;
  ask: {
    time: number;
    deadline: number;
    bidDelay: number;
    fillDelay: number;
    maker: string;
    exchange: string;
    srcToken: string;
    dstToken: string;
    srcAmount: BN;
    srcBidAmount: BN;
    dstMinAmount: BN;
  };
  bid: {
    time: number;
    taker: string;
    exchange: string;
    dstAmount: BN;
    dstFee: BN;
    data: string;
  };
}

export enum Status {
  Open = "Open",
  Canceled = "Canceled",
  Completed = "Completed",
  Expired = "Expired",
}

export enum OrderInputValidation {
  valid = "valid",
  equalTokens = "equalTokens",
  invalidSrcAmount = "invalidSrcAmount",
  invalidSrcChunkAmount = "invalidSrcChunkAmount",
  invalidDstMinChunkAmountOut = "invalidDstMinChunkAmountOut",
  invalidDeadline = "invalidDeadline",
  invalidFillDelaySeconds = "invalidFillDelaySeconds",
  invalidSrcUsd = "invalidSrcUsd",
  invalidSmallestSrcChunkUsd = "invalidSmallestSrcChunkUsd",
}
