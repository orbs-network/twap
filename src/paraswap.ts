import BN from "bignumber.js";
import { eqIgnoreCase, web3 } from "@defi.org/web3-candies";
import { chainConfig, isNativeAddress, nativeTokenAddresses, TokenData } from "./configs";
import _ from "lodash";

export namespace Paraswap {
  const URL = "https://apiv5.paraswap.io";

  export enum OnlyDex {
    UniSwapV2 = "Uniswap",
    SushiSwap = "SushiSwap",
    QuickSwap = "QuickSwap,QuickSwapV3",
    SpiritSwap = "SpiritSwap,SpiritSwapV2",
    SpookySwap = "SpookySwap",
    Pangolin = "PangolinSwap",
    TraderJoe = "TraderJoe",
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
      low: BN(result.safeLow || 0),
      medium: BN(result.average || 0),
      high: BN(result.fast || 0),
      instant: BN(result.fastest || 0),
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
    onlyDex?: OnlyDex,
    otherExchanges = false
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
      partner: onlyDex?.toLowerCase()?.split(",")?.[0] || "",
      otherExchangePrices: otherExchanges.toString(),
    });
    const response = await fetch(`${URL}/prices/?${params}`);
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    return (await response.json()).priceRoute;
  }

  export function getDirectPath(route: ParaswapRoute, onlyDex: OnlyDex) {
    const bestRoute = _.sortBy(route.bestRoute, (r) => r.percent).reverse()[0];

    if (bestRoute.swaps.length > 1) throw new Error(`invalid direct path more than 1 path`);
    if (
      !eqIgnoreCase(bestRoute.swaps[0].srcToken, route.srcToken) ||
      !eqIgnoreCase(bestRoute.swaps[0].destToken, route.destToken)
    )
      throw new Error(`invalid direct path tokens`);

    const bestSwap = _.sortBy(bestRoute.swaps[0].swapExchanges, (s) => s.percent).reverse()[0];
    if (!onlyDex.split(",").includes(bestSwap.exchange)) throw new Error(`invalid direct path exchange`);

    const path: string[] = bestSwap.data.path;
    if (!path || path.length < 2) throw new Error(`invalid direct path`);

    return path;
  }

  export async function buildSwapData(paraswapRoute: ParaswapRoute, exchangeAdapter: string) {
    const response = await fetch(`${URL}/transactions/${paraswapRoute.network}?ignoreChecks=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
