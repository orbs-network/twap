import BN from "bignumber.js";
import { web3 } from "@defi.org/web3-candies";
import { chainConfig, isNativeAddress, nativeTokenAddresses, TokenData } from "./configs";

export namespace Paraswap {
  const URL = "https://apiv5.paraswap.io";

  export enum OnlyDex {
    UniSwapV2 = "Uniswap",
    SushiSwap = "SushiSwap",
    QuickSwap = "QuickSwap",
    SpiritSwap = "SpiritSwap,SpiritSwapV2",
    SpookySwap = "SpookySwap",
    Pangolin = "PangolinDex",
  }

  export interface ParaswapRoute {
    blockNumber: number;
    network: number;
    srcToken: string;
    destToken: string;
    srcDecimals: number;
    destDecimals: number;
    srcAmount: string;
    destAmount: string;
    bestRoute: any[];
    gasCostUSD: string;
    gasCost: string;
    side: string;
    tokenTransferProxy: string;
    contractAddress: string;
    contractMethod: string;
    partnerFee: number;
    srcUSD: string;
    destUSD: string;
    partner: string;
    maxImpactReached: boolean;
  }

  export async function gasPrices(chainId: number) {
    const response = await fetch(`${URL}/prices/gas/${chainId}`);
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    const result = await response.json();
    return {
      low: BN(result.safeLow),
      medium: BN(result.average),
      high: BN(result.fast),
      instant: BN(result.fastest),
    };
  }

  export async function priceUsd(chainId: number, token: TokenData) {
    const _token = isNativeAddress(token.address) ? chainConfig(chainId).wToken : token;
    const r = await findRoute(
      chainId,
      _token,
      { address: nativeTokenAddresses[2], symbol: "NATIVE", decimals: 18 },
      BN(10).pow(_token.decimals)
    );
    return BN(r.srcUSD);
  }

  export async function findRoute(
    chainId: number,
    src: TokenData,
    dst: TokenData,
    amountIn: BN.Value,
    onlyDex?: OnlyDex
  ): Promise<ParaswapRoute> {
    const params = new URLSearchParams({
      srcToken: src.address,
      destToken: dst.address,
      srcDecimals: src.decimals.toString(),
      destDecimals: dst.decimals.toString(),
      amount: amountIn.toString(),
      network: chainId.toString(),
      side: "SELL",
      includeDEXS: onlyDex || "",
      // partner: "chucknorris",
      // otherExchangePrices: "true",
    });
    const response = await fetch(`${URL}/prices/?${params}`);
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    return (await response.json()).priceRoute;
  }

  export async function buildSwapData(paraswapRoute: ParaswapRoute, exchangeAdapter: string) {
    const response = await fetch(`${URL}/transactions/${paraswapRoute.network}?ignoreChecks=true`, {
      method: "POST",
      body: JSON.stringify({
        priceRoute: paraswapRoute,
        srcToken: paraswapRoute.srcToken,
        destToken: paraswapRoute.destToken,
        srcDecimals: paraswapRoute.srcDecimals,
        destDecimals: paraswapRoute.destDecimals,
        srcAmount: paraswapRoute.srcAmount,
        destAmount: "1",
        userAddress: exchangeAdapter,
      }),
    });
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    const swapData = (await response.json()).data;
    return web3().eth.abi.encodeParameters(["uint256", "bytes"], [paraswapRoute.destAmount, swapData]);
  }
}
