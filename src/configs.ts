import { eqIgnoreCase, zeroAddress } from "@defi.org/web3-candies";
import _ from "lodash";
import { Paraswap } from "./paraswap";

export interface TokenData {
  address: string;
  decimals: number;
  symbol: string;
  logoUrl?: string;
}

export interface Config {
  chainId: number;
  chainName: string;
  twapAddress: string;
  lensAddress: string;
  bidDelaySeconds: number;
  minChunkSizeUsd: number;
  wToken: TokenData;

  partner: string;
  exchangeAddress: string;
  exchangeType: "UniswapV2Exchange" | "ParaswapExchange";
  pathfinderKey: Paraswap.OnlyDex;
}

export const ChainConfigs = {
  eth: {
    chainName: "eth",
    chainId: 1,
    twapAddress: "",
    lensAddress: "",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 100,
    wToken: {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      symbol: "WETH",
      logoUrl: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
    },
  },
  ftm: {
    chainName: "ftm",
    chainId: 250,
    twapAddress: "0xBb9F828E34A1327607c3e4eA3dD35891398DD5EE",
    lensAddress: "0x042799657E971855eD619046aeDf7F30DB56d2D6",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    wToken: {
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      decimals: 18,
      symbol: "WFTM",
      logoUrl: "https://tokens.1inch.io/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83.png",
    },
  },
  poly: {
    chainName: "poly",
    chainId: 137,
    twapAddress: "0xBAFdE1cc254BB94Be5866d5a86ddafde4BB44EEF",
    lensAddress: "0xc918bdC47264687796Cd54FE362FaC4f8b99Eb55",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    wToken: {
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      decimals: 18,
      symbol: "WMATIC",
      logoUrl: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    },
  },
  avax: {
    chainName: "avax",
    chainId: 43114,
    twapAddress: "0xD63430c74C8E70D9dbdCA04C6a9E6E9E929028DA",
    lensAddress: "0xD13609A8ace04D11Ea2FFE176B69dF77C6d9375E",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    wToken: {
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      decimals: 18,
      symbol: "WAVAX",
      logoUrl: "https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png",
    },
  },
};

export const Configs = {
  SpiritSwap: {
    ...ChainConfigs.ftm,
    partner: "SpiritSwap",
    exchangeAddress: "0xAd19179201be5A51D1cBd3bB2fC651BB05822404",
    exchangeType: "ParaswapExchange",
    pathfinderKey: Paraswap.OnlyDex.SpiritSwap,
  } as Config,

  SpookySwap: {
    ...ChainConfigs.ftm,
    partner: "SpookySwap",
    exchangeAddress: "0x4b5815D263549Ff9b54a3838693C3DC0dbE7e597",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: Paraswap.OnlyDex.SpookySwap,
  } as Config,

  Pangolin: {
    ...ChainConfigs.avax,
    partner: "Pangolin",
    exchangeAddress: "0x72a18A408e329E7052d08aA0746243Dc30Ad2530",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: Paraswap.OnlyDex.Pangolin,
  } as Config,

  QuickSwap: {
    ...ChainConfigs.poly,
    partner: "QuickSwap",
    exchangeAddress: "0x9369D5465d6D90AA3c06Af5B683e617EeA9078E4",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: Paraswap.OnlyDex.QuickSwap,
  } as Config,
};

export const nativeTokenAddresses = [
  zeroAddress,
  "0x0000000000000000000000000000000000001010",
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
];

export const isNativeAddress = (address: string) => !!_.find(nativeTokenAddresses, (a) => eqIgnoreCase(a, address));
export const chainConfig = (chainId: number) => _.find(ChainConfigs, (c) => c.chainId === chainId)!;
