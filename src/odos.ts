import { TokenData, bn, zeroAddress } from "@defi.org/web3-candies";
import { OdosOnlyDex } from "./configs";
import BN from "bignumber.js";

export namespace Odos {
  const URL = "https://api.odos.xyz";

  export interface Route {
    dstAmount: BN;
    srcUsd: BN;
    dstUsd: BN;
    data: string;
    path: string[];
  }

  export async function findRoute(
    chainId: number,
    src: TokenData,
    dst: TokenData,
    amountIn: BN.Value,
    exchangeAdapter: string = zeroAddress,
    onlyDex?: OdosOnlyDex,
    partner?: string
  ): Promise<Route> {
    const response = await fetch(`${URL}/sor/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        chainId,
        inputTokens: [{ tokenAddress: src.address, amount: amountIn.toString() }],
        outputTokens: [{ tokenAddress: dst.address, proportion: 1 }],
        slippageLimitPercent: 50,
        userAddr: exchangeAdapter,
        sourceWhitelist: onlyDex?.split(",") || [],
        simulate: false,
        partner: partner || "",
      }),
    });
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);

    const j = await response.json();
    const srcUsd = bn(j.inValues[0]);
    const dstUsd = bn(j.outValues[0]);
    const dstAmount = bn(j.outAmounts[0]);

    const data = await buildSwapData(j.pathId, dstAmount, exchangeAdapter);

    return {
      dstAmount,
      srcUsd,
      dstUsd,
      data,
      path: [],
    };
  }

  async function buildSwapData(pathId: string, dstAmountOut: BN, exchangeAdapter: string) {
    const response = await fetch(`${URL}/sor/assemble`, {
      method: "POST",
      headers: { accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        pathId,
        userAddr: exchangeAdapter,
        simulate: false,
      }),
    });
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    const swapData = (await response.json())?.transaction?.data;
    if (!swapData) throw new Error(`invalid swap data from Odos`);
    return swapData;
  }
}
