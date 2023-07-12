import { TokenData, eqIgnoreCase, zeroAddress } from "@defi.org/web3-candies";
import BN from "bignumber.js";
import _ from "lodash";
import { ParaswapOnlyDex } from "./configs";

export namespace Paraswap {
  const URL = "https://apiv5.paraswap.io";

  export interface Route {
    dstAmount: BN;
    srcUsd: BN;
    dstUsd: BN;
    data: string;
    path: string[];
  }

  interface ParaswapRoute {
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

  export async function findRoute(
    chainId: number,
    src: TokenData,
    dst: TokenData,
    amountIn: BN.Value,
    exchangeAdapter: string = zeroAddress,
    onlyDex?: ParaswapOnlyDex,
    partner?: string
  ): Promise<Route> {
    const params = new URLSearchParams({
      srcToken: src.address,
      destToken: dst.address,
      srcDecimals: src.decimals.toString(),
      destDecimals: dst.decimals.toString(),
      amount: amountIn.toString(),
      network: chainId.toString(),
      side: "SELL",
      maxImpact: "100",
      includeDEXS: onlyDex || "",
      partner: partner || "",
    });
    const response = await fetch(`${URL}/prices/?${params}`);
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    const route = (await response.json()).priceRoute as ParaswapRoute;
    const path = getDirectPath(route, onlyDex);

    let data = "0x";
    try {
      if (exchangeAdapter !== zeroAddress) {
        data = await buildSwapData(route, exchangeAdapter);
      }
    } catch (e) {}

    return { dstAmount: BN(route.destAmount), srcUsd: BN(route.srcUSD), dstUsd: BN(route.destUSD), data, path };
  }

  function getDirectPath(route: ParaswapRoute, onlyDex?: ParaswapOnlyDex) {
    if (!onlyDex || !route.bestRoute.length) return [];

    const bestRoute = _.sortBy(route.bestRoute, (r) => r.percent).reverse()[0];

    if (bestRoute.swaps.length > 1) return []; // invalid direct path more than 1 path
    if (
      !eqIgnoreCase(bestRoute.swaps[0].srcToken, route.srcToken) ||
      !eqIgnoreCase(bestRoute.swaps[0].destToken, route.destToken)
    )
      return []; //invalid direct path tokens

    const bestSwap = _.sortBy(bestRoute.swaps[0].swapExchanges, (s) => s.percent).reverse()[0];
    if (!onlyDex.split(",").includes(bestSwap.exchange)) return []; // invalid direct path exchange

    const path: string[] = bestSwap.data.path;
    if (!path || path.length < 2) return []; // invalid direct path

    return path;
  }

  async function buildSwapData(paraswapRoute: ParaswapRoute, exchangeAdapter: string) {
    const response = await fetch(`${URL}/transactions/${paraswapRoute.network}?ignoreChecks=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceRoute: paraswapRoute,
        srcToken: paraswapRoute.srcToken,
        destToken: paraswapRoute.destToken,
        srcDecimals: paraswapRoute.srcDecimals,
        destDecimals: paraswapRoute.destDecimals,
        srcAmount: paraswapRoute.srcAmount,
        destAmount: "1", //paraswapRoute.destAmount ? BN(paraswapRoute.destAmount).times(0.9).toFixed(0) : "1",
        userAddress: exchangeAdapter,
      }),
    });
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    return (await response.json()).data;
  }
}
