import { eqIgnoreCase, zeroAddress } from "@defi.org/web3-candies";
import _ from "lodash";
import { Paraswap } from "./paraswap";
import twapArtifact from "../artifacts/contracts/TWAP.sol/TWAP.json";
import lensArtifact from "../artifacts/contracts/periphery/Lens.sol/Lens.json";
import takerArtifact from "../artifacts/contracts/periphery/Taker.sol/Taker.json";
import { lensAbiV3, takerAbiV3, twapAbiV3 } from "./legacy-abi";
import { Odos } from "./odos";

export interface TokenData {
  address: string;
  decimals: number;
  symbol: string;
  logoUrl?: string;
}

export interface Config {
  chainId: number;
  chainName: string;
  twapVersion: number;
  twapAddress: string;
  lensAddress: string;
  bidDelaySeconds: number;
  minChunkSizeUsd: number;
  nativeToken: TokenData;
  wToken: TokenData;
  twapAbi: any;
  lensAbi: any;
  takerAbi: any;

  partner: string;
  exchangeAddress: string;
  exchangeType: "UniswapV2Exchange" | "ParaswapExchange" | "PangolinDaasExchange" | "OdosExchange";
  pathfinderKey: Paraswap.OnlyDex | Odos.OnlyDex;
}

const defaultAbis = {
  twapAbi: twapArtifact.abi,
  lensAbi: lensArtifact.abi,
  takerAbi: takerArtifact.abi,
};

export const ChainConfigs = {
  eth: {
    chainName: "eth",
    chainId: 1,
    twapVersion: 0,
    twapAddress: "",
    lensAddress: "",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 100,
    nativeToken: {
      address: zeroAddress,
      decimals: 18,
      symbol: "ETH",
      logoUrl: "https://app.1inch.io/assets/images/network-logos/ethereum.svg",
    },
    wToken: {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      symbol: "WETH",
      logoUrl: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    },
    ...defaultAbis,
  },
  arb: {
    chainName: "arb",
    chainId: 42161,
    twapVersion: 4,
    twapAddress: "0xD63430c74C8E70D9dbdCA04C6a9E6E9E929028DA",
    lensAddress: "0xD13609A8ace04D11Ea2FFE176B69dF77C6d9375E",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 100,
    nativeToken: {
      address: zeroAddress,
      decimals: 18,
      symbol: "ETH",
      logoUrl: "https://app.1inch.io/assets/images/network-logos/arbitrum.svg",
    },
    wToken: {
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      decimals: 18,
      symbol: "WETH",
      logoUrl: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    },
    ...defaultAbis,
  },
  ftm: {
    chainName: "ftm",
    chainId: 250,
    twapVersion: 3,
    twapAddress: "0xBb9F828E34A1327607c3e4eA3dD35891398DD5EE",
    lensAddress: "0x042799657E971855eD619046aeDf7F30DB56d2D6",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: {
      address: zeroAddress,
      decimals: 18,
      symbol: "FTM",
      logoUrl: "https://app.1inch.io/assets/images/network-logos/fantom.svg",
    },
    wToken: {
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      decimals: 18,
      symbol: "WFTM",
      logoUrl: "https://tokens.1inch.io/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png",
    },
    twapAbi: twapAbiV3,
    lensAbi: lensAbiV3,
    takerAbi: takerAbiV3,
  },
  poly: {
    chainName: "poly",
    chainId: 137,
    twapVersion: 4,
    twapAddress: "0xceFf098C9199c5d9cf24078dc14Eb8F787631cC0",
    lensAddress: "0x8ffde23Fba2d7Aea9C3CBf2d5B7B533BB46754a8",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: {
      address: zeroAddress,
      decimals: 18,
      symbol: "MATIC",
      logoUrl: "https://app.1inch.io/assets/images/network-logos/polygon.svg",
    },
    wToken: {
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      decimals: 18,
      symbol: "WMATIC",
      logoUrl: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    },
    ...defaultAbis,
  },
  avax: {
    chainName: "avax",
    chainId: 43114,
    twapVersion: 4,
    twapAddress: "0xF2687e119B0A4aB00bED9c9F425403566D605020",
    lensAddress: "0xfA1e5Da0Cbb780b891Cd635264354a9F4d3A726E",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: {
      address: zeroAddress,
      decimals: 18,
      symbol: "AVAX",
      logoUrl: "https://app.1inch.io/assets/images/network-logos/avalanche.svg",
    },
    wToken: {
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      decimals: 18,
      symbol: "WAVAX",
      logoUrl: "https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png",
    },
    ...defaultAbis,
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
    exchangeAddress: "0xf2d96E7BE676153d202e1453804E2749923C7c5b",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: Paraswap.OnlyDex.Pangolin,
  } as Config,

  PangolinDaas: {
    ...ChainConfigs.avax,
    partner: "PangolinDaas",
    exchangeAddress: "0x1579EED0527781B1A748043AA1f59a3858Ace4a7",
    exchangeType: "PangolinDaasExchange",
    pathfinderKey: Paraswap.OnlyDex.Pangolin,
  } as Config,

  QuickSwap: {
    ...ChainConfigs.poly,
    partner: "QuickSwap",
    exchangeAddress: "0x26D0ec4Be402BCE03AAa8aAf0CF67e9428ba54eF",
    exchangeType: "ParaswapExchange",
    pathfinderKey: Paraswap.OnlyDex.QuickSwap,
  } as Config,

  Chronos: {
    ...ChainConfigs.arb,
    partner: "Chronos",
    exchangeAddress: "0xA0b07F9a11dFb01388149abBdbc5B4f2196600AB",
    exchangeType: "OdosExchange",
    pathfinderKey: Odos.OnlyDex.Chronos,
  } as Config,
};

export const nativeTokenAddresses = [
  zeroAddress,
  "0x0000000000000000000000000000000000001010",
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "0x000000000000000000000000000000000000dEaD",
];

export const isNativeAddress = (address: string) => !!_.find(nativeTokenAddresses, (a) => eqIgnoreCase(a, address));
export const chainConfig = (chainId: number) => _.find(ChainConfigs, (c) => c.chainId === chainId)!;
