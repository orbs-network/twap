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
  sendAndWaitForConfirmations,
  setWeb3Instance,
  web3,
  zero,
  zeroAddress,
} from "@defi.org/web3-candies";
import twapArtifact from "../artifacts/contracts/TWAP.sol/TWAP.json";
import lensArtifact from "../artifacts/contracts/periphery/Lens.sol/Lens.json";
import takerArtifact from "../artifacts/contracts/periphery/Taker.sol/Taker.json";
import type { TWAP } from "../typechain-hardhat/contracts";
import type { Lens } from "../typechain-hardhat/contracts/periphery";
import { Paraswap } from "./paraswap";
import _ from "lodash";

export const twapAbi = twapArtifact.abi as any;
export const lensAbi = lensArtifact.abi as any;
export const takerAbi = takerArtifact.abi as any;

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
    BN(totalChunks).lte(1) || BN(maxDurationMillis).lte(this.config.bidDelaySeconds * 1000 * 2)
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

  async wrapNativeToken(amount: BN.Value, maxPriorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    await sendAndWaitForConfirmations(
      erc20<any>(
        this.config.wToken.symbol,
        this.config.wToken.address,
        this.config.wToken.decimals,
        iwethabi
      ).methods.deposit(),
      { from: this.maker, maxPriorityFeePerGas, maxFeePerGas, value: amount }
    );
  }

  async unwrapNativeToken(amount: BN.Value, maxPriorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    await sendAndWaitForConfirmations(
      erc20<any>(
        this.config.wToken.symbol,
        this.config.wToken.address,
        this.config.wToken.decimals,
        iwethabi
      ).methods.withdraw(BN(amount).toFixed(0)),
      { from: this.maker, maxPriorityFeePerGas, maxFeePerGas }
    );
  }

  async hasAllowance(srcToken: TokenData, amount: BN.Value) {
    if (this.isNativeToken(srcToken)) return true;
    const token = erc20(srcToken.symbol, srcToken.address, srcToken.decimals);
    const allowance = BN(await token.methods.allowance(this.maker, this.config.twapAddress).call());
    return allowance.gte(amount);
  }

  async approve(srcToken: TokenData, amount: BN.Value, maxPriorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    const token = erc20(srcToken.symbol, srcToken.address, srcToken.decimals);
    await sendAndWaitForConfirmations(token.methods.approve(this.config.twapAddress, BN(amount).toFixed(0)), {
      from: this.maker,
      maxPriorityFeePerGas,
      maxFeePerGas,
    });
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
    const tokensValidation = this.validateTokens(srcToken, dstToken);
    if (tokensValidation === TokensValidation.invalid) return OrderInputValidation.invalidTokens;

    if (BN(srcAmount).lte(0)) return OrderInputValidation.invalidSrcAmount;

    if (BN(srcChunkAmount).lte(0) || BN(srcChunkAmount).gt(srcAmount))
      return OrderInputValidation.invalidSrcChunkAmount;

    if (BN(dstMinChunkAmountOut).lte(0)) return OrderInputValidation.invalidDstMinChunkAmountOut;

    if (BN(deadline).integerValue(BN.ROUND_FLOOR).lte(Date.now())) return OrderInputValidation.invalidDeadline;

    if (BN(fillDelaySeconds).integerValue(BN.ROUND_FLOOR).lt(0)) return OrderInputValidation.invalidFillDelaySeconds;

    if (BN(srcUsd).lte(0)) return OrderInputValidation.invalidSrcUsd;

    if (
      BN(srcChunkAmount)
        .times(srcUsd)
        .lt(BN(this.config.minChunkSizeUsd).times(BN(10).pow(srcToken.decimals)))
    )
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
    maxPriorityFeePerGas?: BN.Value,
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

    const tx = await sendAndWaitForConfirmations(
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
      {
        from: this.maker,
        maxPriorityFeePerGas,
        maxFeePerGas,
      }
    );

    const events = parseEvents(tx, this.twap.options.jsonInterface);
    return Number(events[0].returnValues.id);
  }

  async getOrder(id: number): Promise<Order> {
    return this.parseOrder(await this.twap.methods.order(id).call());
  }

  async cancelOrder(id: number, maxPriorityFeePerGas?: BN.Value, maxFeePerGas?: BN.Value) {
    await sendAndWaitForConfirmations(this.twap.methods.cancel(id), {
      from: this.maker,
      maxPriorityFeePerGas,
      maxFeePerGas,
    });
  }

  async getAllOrders() {
    return _.map(await this.lens.methods.makerOrders(this.maker).call(), (o) => this.parseOrder(o));
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
    if (isNativeAddress(address)) return this.config.wToken;
    const t = erc20("", address);
    return { address, decimals: await t.decimals(), symbol: await t.methods.symbol().call() };
  }

  //TODO
  async getSwapData(orderId: number) {
    const order = await this.getOrder(orderId);
    const srcAmountIn = order.ask.srcBidAmount;

    const srcToken = await this.getToken(order.ask.srcToken);
    const dstToken = await this.getToken(order.ask.dstToken);
    const paraswapRoute = await Paraswap.findRoute(
      this.config.chainId,
      srcToken,
      dstToken,
      srcAmountIn,
      this.config.pathfinderKey
    );
    const dstAmountOut = BN(paraswapRoute.destAmount);
    const path = Paraswap.directPath(paraswapRoute, this.config.pathfinderKey);

    switch (this.config.exchangeType) {
      case "UniswapV2Exchange":
        return {
          srcToken,
          dstToken,
          srcAmountIn,
          dstAmountOut,
          path,
          data: web3().eth.abi.encodeParameters(["bool", "address[]"], [false, path]),
        };
      case "ParaswapExchange":
        return {
          srcToken,
          dstToken,
          srcAmountIn,
          dstAmountOut,
          path,
          data: await Paraswap.buildSwapData(paraswapRoute, this.config.twapAddress),
        };
      default:
        throw new Error(`unhandled exchange ${this.config.exchangeType}`);
    }
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
