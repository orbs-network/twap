import { TokenData, bn, networks, web3, zeroAddress } from "@defi.org/web3-candies";
import BN from "bignumber.js";
import _ from "lodash";
import { OpenOceanOnlyDex } from "./configs";

export namespace OpenOcean {
  const URL = "https://open-api.openocean.finance/v3";

  export interface Route {
    dstAmount: BN;
    srcUsd: BN;
    dstUsd: BN;
    data: string;
    path: string[];
  }

  const chainNames = {
    [networks.eth.id]: "eth",
    [networks.bsc.id]: "bsc",
    [networks.arb.id]: "arbitrum",
    [networks.poly.id]: "polygon",
    [networks.ftm.id]: "fantom",
    [networks.avax.id]: "avax",
  };

  export async function findRoute(
    chainId: number,
    src: TokenData,
    dst: TokenData,
    amountIn: BN.Value,
    exchangeAdapter: string = zeroAddress,
    onlyDex?: OpenOceanOnlyDex,
    partner?: string
  ): Promise<Route> {
    const response = await fetch(
      `${URL}/${chainNames[chainId]}/swap_quote?${new URLSearchParams({
        chain: chainNames[chainId],
        inTokenAddress: src.address,
        outTokenAddress: dst.address,
        amount: BN(amountIn)
          .div(10 ** src.decimals)
          .toString(),
        slippage: "5",
        gasPrice: "5",
        account: exchangeAdapter,
        enabledDexIds: onlyDex || "",
        referrer: partner || "",
        connectors: "", //0xf4c8e32eadec4bfe97e0f595add0f4450a863a11,0x52f24a5e03aee338da5fd9df68d2b6fae1178827,0x90c97f71e18723b0cf0dfa30ee176ab653e89f40
      })}`
    );
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);

    const tokens = await fetchTokens(chainId);
    const j = await response.json();
    const srcUsd = bn(tokens[web3().utils.toChecksumAddress(src.address)].usd);
    const dstUsd = bn(tokens[web3().utils.toChecksumAddress(dst.address)].usd);
    const dstAmount = bn(j.data.outAmount);

    const data = j.data.data || "0x";

    return {
      dstAmount,
      srcUsd,
      dstUsd,
      data,
      path: [],
    };
  }

  const tokens: { [chainId: number]: { [address: string]: { token: TokenData; usd: number } } } = {};

  async function fetchTokens(chainId: number) {
    if (_.size(tokens[chainId])) return tokens[chainId];

    const response = await fetch(`${URL}/${chainNames[chainId]}/tokenList`);
    if (response.status < 200 || response.status >= 400) throw new Error(`${response.statusText}`);
    const t = (await response.json()).data;
    const parsed = _.map(t, (token) => ({
      token: {
        address: web3().utils.toChecksumAddress(token.address),
        decimals: parseInt(token.decimals),
        symbol: token.symbol || "",
        name: token.name || token.symbol || "",
        logoUrl: token.icon || "",
      },
      usd: parseFloat(token.usd),
    }));
    tokens[chainId] = _.mapKeys(parsed, (t) => t.token.address);
    return tokens[chainId];
  }
}
