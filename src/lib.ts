import { Config, isNativeAddress, TokenData } from "./configs";
import Web3 from "web3";
import BN from "bignumber.js";
import {
  contract,
  convertDecimals,
  eqIgnoreCase,
  erc20,
  iwethabi,
  parseEvents,
  setWeb3Instance,
  web3,
  zero,
  zeroAddress,
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

  constructor(public config: Config, public maker: string, public provider?: any) {
    if (provider) setWeb3Instance(new Web3(provider));
    this.twap = contract<TWAP>(twapAbi, config.twapAddress);
    this.lens = contract<Lens>(lensAbi, config.lensAddress);
  }

  dstAmount = (
    srcToken: TokenData,
    dstToken: TokenData,
    srcAmount: BN.Value,
    srcUsdMarket: BN.Value,
    dstUsdMarket: BN.Value,
    limitDstPriceFor1Src: BN.Value,
    isMarketOrder: boolean
  ) =>
    convertDecimals(
      isMarketOrder ? BN(srcAmount).times(srcUsdMarket).div(dstUsdMarket) : BN(srcAmount).times(limitDstPriceFor1Src),
      srcToken.decimals,
      dstToken.decimals
    ).integerValue(BN.ROUND_FLOOR);

  isNativeToken = (token: TokenData) => isNativeAddress(token.address);

  isWrappedToken = (token: TokenData) => eqIgnoreCase(token.address, this.config.wToken.address);

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
            .minus(BN(this.config.bidDelaySeconds * 1000 * 2)),
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
      : BN.max(
          1,
          convertDecimals(
            BN(srcChunkAmount).times(limitDstPriceFor1Src),
            srcToken.decimals,
            dstToken.decimals
          ).integerValue(BN.ROUND_FLOOR)
        );

  dstPriceFor1Src = (
    srcToken: TokenData,
    dstToken: TokenData,
    srcUsdMarket: BN.Value,
    dstUsdMarket: BN.Value,
    srcChunkAmount: BN.Value,
    dstMinAmountOut: BN.Value
  ) =>
    BN(dstMinAmountOut).eq(1)
      ? BN(srcUsdMarket).div(dstUsdMarket)
      : BN(dstMinAmountOut).div(convertDecimals(BN(srcChunkAmount), srcToken.decimals, dstToken.decimals));

  isMarketOrder = (order: Order) => order.ask.dstMinAmount.lte(1);

  orderProgress = (order: Order) => parseFloat(order.srcFilledAmount.div(order.ask.srcAmount).toFixed(4));

  percentAboveMarket = (srcUsdMarket: BN.Value, dstUsdMarket: BN.Value, limitDstPriceFor1Src: BN.Value) =>
    parseFloat(BN(limitDstPriceFor1Src).div(BN(srcUsdMarket).div(dstUsdMarket)).minus(1).toFixed(4));

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

  async wrapNativeToken(amount: BN.Value, priorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    return await this.sendTx(
      erc20<any>(
        this.config.wToken.symbol,
        this.config.wToken.address,
        this.config.wToken.decimals,
        iwethabi
      ).methods.deposit(),
      priorityFeePerGas,
      maxFeePerGas,
      amount
    );
  }

  async unwrapNativeToken(amount: BN.Value, priorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    return await this.sendTx(
      erc20<any>(
        this.config.wToken.symbol,
        this.config.wToken.address,
        this.config.wToken.decimals,
        iwethabi
      ).methods.withdraw(BN(amount).toFixed(0)),
      priorityFeePerGas,
      maxFeePerGas
    );
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
    if (this.isNativeToken(srcToken)) return true;
    const token = erc20(srcToken.symbol, srcToken.address, srcToken.decimals);
    const allowance = BN(await token.methods.allowance(this.maker, this.config.twapAddress).call());
    return allowance.gte(amount);
  }

  async approve(srcToken: TokenData, amount: BN.Value, priorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    const token = erc20(srcToken.symbol, srcToken.address, srcToken.decimals);
    await this.sendTx(
      token.methods.approve(this.config.twapAddress, amount.toString()),
      priorityFeePerGas,
      maxFeePerGas
    );
  }

  validateTokens(srcToken: TokenData, dstToken: TokenData) {
    if (_.isEqual(srcToken, dstToken) || (this.isNativeToken(srcToken) && this.isNativeToken(dstToken)))
      return TokensValidation.invalid;

    if (this.isNativeToken(srcToken)) {
      if (this.isWrappedToken(dstToken)) return TokensValidation.wrapOnly;
      return TokensValidation.wrapAndOrder;
    }

    if (this.isWrappedToken(srcToken) && this.isNativeToken(dstToken)) return TokensValidation.unwrapOnly;

    if (this.isNativeToken(dstToken)) return TokensValidation.dstTokenZero;

    return TokensValidation.valid;
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
    if (this.validateTokens(srcToken, dstToken) !== TokensValidation.valid) return OrderInputValidation.invalidTokens;

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
    srcUsd: BN.Value,
    priorityFeePerGas?: BN.Value,
    maxFeePerGas?: BN.Value
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

    const tx = await this.sendTx(
      this.twap.methods.ask(
        this.config.exchangeAddress,
        srcToken.address,
        dstToken.address,
        BN(srcAmount).toFixed(0),
        BN(srcChunkAmount).toFixed(0),
        BN(dstMinChunkAmountOut).toFixed(0),
        BN(deadline).div(1000).toFixed(0),
        BN(this.config.bidDelaySeconds).toFixed(0),
        BN(fillDelaySeconds).toFixed(0)
      ),
      priorityFeePerGas,
      maxFeePerGas
    );

    const events = parseEvents(tx, this.twap.options.jsonInterface);
    return Number(events[0].returnValues.id);
  }

  async getOrder(id: number): Promise<Order> {
    return this.parseOrder(await this.twap.methods.order(id).call());
  }

  async cancelOrder(id: number, priorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    await this.sendTx(this.twap.methods.cancel(id), priorityFeePerGas, maxFeePerGas);
  }

  async getAllOrders() {
    return _.map(await this.lens.methods.makerOrders(this.maker).call(), (o) => this.parseOrder(o));
  }

  private async sendTx(tx: any, priorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value, amount?: BN.Value) {
    let gas = 500_000;
    try {
      gas = Math.max(gas, Math.floor((await tx.estimateGas()) * 1.2));
    } catch (ignore) {}
    return await tx.send({
      from: this.maker,
      gas,
      maxPriorityFeePerGas: priorityFeePerGas ? BN(priorityFeePerGas).toFixed(0) : undefined,
      maxFeePerGas: maxFeePerGas ? BN(maxFeePerGas).toFixed(0) : undefined,
      value: amount ? BN(amount).toFixed(0) : undefined,
    });
  }

  parseOrder(r: any): Order {
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
        maker: Web3.utils.toChecksumAddress(r.ask.maker),
        exchange: Web3.utils.toChecksumAddress(r.ask.exchange),
        srcToken: Web3.utils.toChecksumAddress(r.ask.srcToken),
        dstToken: Web3.utils.toChecksumAddress(r.ask.dstToken),
        srcAmount: BN(r.ask.srcAmount),
        srcBidAmount: BN(r.ask.srcBidAmount),
        dstMinAmount: BN(r.ask.dstMinAmount),
      },
      bid: {
        time: Number(r.bid?.time || 0),
        taker: Web3.utils.toChecksumAddress(r.bid?.taker || zeroAddress),
        exchange: Web3.utils.toChecksumAddress(r.bid?.exchange || zeroAddress),
        dstAmount: BN(r.bid?.dstAmount || zero),
        dstFee: BN(r.bid?.dstFee || zero),
        data: r.bid?.data || "",
      },
    };
  }

  async getToken(address: string) {
    const t = erc20("", address);
    return { address, decimals: await t.decimals(), symbol: await t.methods.symbol().call() };
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
  invalidTokens = "invalidTokens",
  invalidSrcAmount = "invalidSrcAmount",
  invalidSrcChunkAmount = "invalidSrcChunkAmount",
  invalidDstMinChunkAmountOut = "invalidDstMinChunkAmountOut",
  invalidDeadline = "invalidDeadline",
  invalidFillDelaySeconds = "invalidFillDelaySeconds",
  invalidSrcUsd = "invalidSrcUsd",
  invalidSmallestSrcChunkUsd = "invalidSmallestSrcChunkUsd",
}

export enum TokensValidation {
  valid = "valid",
  invalid = "invalid",
  wrapOnly = "wrapOnly",
  unwrapOnly = "unwrapOnly",
  wrapAndOrder = "wrapAndOrder",
  dstTokenZero = "dstTokenZero",
}
