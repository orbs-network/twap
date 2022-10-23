import BigNumber from "bignumber.js";
import axios from "axios";
import { currentNetwork, Token, web3 } from "@defi.org/web3-candies";
import { expect } from "chai";

export namespace Paraswap {
  const URL = "https://apiv5.paraswap.io";

  export enum OnlyDex {
    Spiritswap = "SpiritSwap,SpiritSwapV2",
  }
  export interface ParaswapRoute {
    network: number;
    srcToken: string;
    destToken: string;
    srcDecimals: number;
    destDecimals: number;
    srcAmount: string;
    destAmount: string;
  }

  export async function findRoute(
    src: Token,
    dst: Token,
    amountIn: BigNumber,
    onlyDex?: OnlyDex
  ): Promise<ParaswapRoute> {
    const params = new URLSearchParams({
      srcToken: src.address,
      destToken: dst.address,
      srcDecimals: (await src.decimals()).toString(),
      destDecimals: (await dst.decimals()).toString(),
      amount: amountIn.toString(),
      network: (await currentNetwork())!.id.toString(),
      side: "SELL",
      includeDEXS: onlyDex || "",
      // otherExchangePrices: "true",
      // partner: "chucknorris",
    });
    const response = await axios.get(`${URL}/prices/?${params}`);
    expect(response.status).gte(200).lt(400);
    return response.data.priceRoute;
  }

  export async function buildSwapData(dstMinOut: BigNumber, paraswapRoute: ParaswapRoute, exchangeAdapter: string) {
    const response = await axios.post(`${URL}/transactions/${paraswapRoute.network}?ignoreChecks=true`, {
      priceRoute: paraswapRoute,
      srcToken: paraswapRoute.srcToken,
      destToken: paraswapRoute.destToken,
      srcDecimals: paraswapRoute.srcDecimals,
      destDecimals: paraswapRoute.destDecimals,
      srcAmount: paraswapRoute.srcAmount,
      destAmount: dstMinOut,
      userAddress: exchangeAdapter,
    });
    expect(response.status).gte(200).lt(400);
    return web3().eth.abi.encodeParameters(["uint256", "bytes"], [paraswapRoute.destAmount, response.data.data]);
  }
}
