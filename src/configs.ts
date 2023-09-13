import { networks } from "@defi.org/web3-candies";
import _ from "lodash";
import twapArtifact from "../artifacts/contracts/TWAP.sol/TWAP.json";
import lensArtifact from "../artifacts/contracts/periphery/Lens.sol/Lens.json";
import takerArtifact from "../artifacts/contracts/periphery/Taker.sol/Taker.json";
import * as legacyAbis from "./legacy-abi";

export { nativeTokenAddresses, zeroAddress } from "@defi.org/web3-candies";

export interface TokenData {
  address: string;
  decimals: number;
  symbol: string;
  logoUrl?: string;
}

export enum ParaswapOnlyDex {
  UniSwap = "Uniswap,UniswapV2,UniswapV3",
  SushiSwap = "SushiSwap",
  QuickSwap = "QuickSwap,QuickSwapV3",
  SpiritSwap = "SpiritSwap,SpiritSwapV2,SpiritSwapV3",
  SpookySwap = "SpookySwap",
  Pangolin = "PangolinSwap",
  TraderJoe = "TraderJoe,TraderJoeV2,TraderJoeV2.1",
  Thena = "Thena,ThenaFusion",
  PancakeSwap = "PancakeSwap,PancakeSwapV2,PancakeswapV3",
  Chronos = "Chronos",
}

export enum OdosOnlyDex {
  Chronos = "Chronos Stable,Chronos Volatile,Wrapped Ether",
  BaseSwap = "BaseSwap,BaseSwapX",
  Arbidex = "Arbidex Classic,Arbidex Quantum",
}

export enum OpenOceanOnlyDex {
  Thena = "43,47",
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

  name: string;
  partner: string;
  exchangeAddress: string;
  exchangeType:
    | "UniswapV2Exchange"
    | "ParaswapExchange"
    | "PangolinDaasExchange"
    | "OdosExchange"
    | "OpenOceanExchange";
  pathfinderKey: ParaswapOnlyDex | OdosOnlyDex | OpenOceanOnlyDex;
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
    nativeToken: networks.eth.native,
    wToken: networks.eth.wToken,
    ...defaultAbis,
  },
  bsc: {
    chainName: "bsc",
    chainId: 56,
    twapVersion: 4,
    twapAddress: "0x25a0A78f5ad07b2474D3D42F1c1432178465936d",
    lensAddress: "0x3b7C090857a4068e16396550423ebadae502768F",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.bsc.native,
    wToken: networks.bsc.wToken,
    ...defaultAbis,
  },
  arb: {
    chainName: "arb",
    chainId: 42161,
    twapVersion: 4,
    twapAddress: "0xD63430c74C8E70D9dbdCA04C6a9E6E9E929028DA",
    lensAddress: "0xD13609A8ace04D11Ea2FFE176B69dF77C6d9375E",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.arb.native,
    wToken: networks.arb.wToken,
    ...defaultAbis,
  },
  ftm: {
    chainName: "ftm",
    chainId: 250,
    twapVersion: 4,
    twapAddress: "0xdb55107c17Cb433D322052BFA36069fDf7Cb1031",
    lensAddress: "0x6E78fA5d48aedF302e48ef3fbD97FD11b4e98d8B",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.ftm.native,
    wToken: networks.ftm.wToken,
    ...defaultAbis,
  },
  poly: {
    chainName: "poly",
    chainId: 137,
    twapVersion: 4,
    twapAddress: "0xceFf098C9199c5d9cf24078dc14Eb8F787631cC0",
    lensAddress: "0x8ffde23Fba2d7Aea9C3CBf2d5B7B533BB46754a8",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.poly.native,
    wToken: networks.poly.wToken,
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
    nativeToken: networks.avax.native,
    wToken: networks.avax.wToken,
    ...defaultAbis,
  },
  base: {
    chainName: "base",
    chainId: 8453,
    twapVersion: 4,
    twapAddress: "0x25a0A78f5ad07b2474D3D42F1c1432178465936d",
    lensAddress: "0x3b7C090857a4068e16396550423ebadae502768F",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.base.native,
    wToken: networks.base.wToken,
    ...defaultAbis,
  },
};

export const Configs = {
  SpiritSwap: {
    ...ChainConfigs.ftm,
    twapVersion: 3,
    twapAddress: "0xBb9F828E34A1327607c3e4eA3dD35891398DD5EE",
    lensAddress: "0x042799657E971855eD619046aeDf7F30DB56d2D6",
    twapAbi: legacyAbis.twapAbiV3,
    lensAbi: legacyAbis.lensAbiV3,
    takerAbi: legacyAbis.takerAbiV3,
    name: "SpiritSwap",
    partner: "Orbs:TWAP:SpiritSwap",
    exchangeAddress: "0xAd19179201be5A51D1cBd3bB2fC651BB05822404",
    exchangeType: "ParaswapExchange",
    pathfinderKey: ParaswapOnlyDex.SpiritSwap,
  } as Config,

  SpookySwap: {
    ...ChainConfigs.ftm,
    name: "SpookySwap",
    partner: "Orbs:TWAP:SpookySwap",
    exchangeAddress: "0x704b9764cb36B8856f3097845dcc594d82192638",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: ParaswapOnlyDex.SpookySwap,
  } as Config,

  Pangolin: {
    ...ChainConfigs.avax,
    name: "Pangolin",
    partner: "Orbs:TWAP:Pangolin",
    exchangeAddress: "0xf2d96E7BE676153d202e1453804E2749923C7c5b",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: ParaswapOnlyDex.Pangolin,
  } as Config,

  PangolinDaas: {
    ...ChainConfigs.avax,
    name: "PangolinDaas",
    partner: "Orbs:TWAP:PangolinDaas",
    exchangeAddress: "0x1579EED0527781B1A748043AA1f59a3858Ace4a7",
    exchangeType: "PangolinDaasExchange",
    pathfinderKey: ParaswapOnlyDex.Pangolin,
  } as Config,

  QuickSwap: {
    ...ChainConfigs.poly,
    name: "QuickSwap",
    partner: "Orbs:TWAP:QuickSwap",
    exchangeAddress: "0x26D0ec4Be402BCE03AAa8aAf0CF67e9428ba54eF",
    exchangeType: "ParaswapExchange",
    pathfinderKey: ParaswapOnlyDex.QuickSwap,
  } as Config,

  Chronos: {
    ...ChainConfigs.arb,
    name: "Chronos",
    partner: "Orbs:TWAP:Chronos",
    exchangeAddress: "0xA0b07F9a11dFb01388149abBdbc5B4f2196600AB",
    exchangeType: "OdosExchange",
    pathfinderKey: OdosOnlyDex.Chronos,
  } as Config,

  BaseSwap: {
    ...ChainConfigs.base,
    name: "BaseSwap",
    partner: "Orbs:TWAP:BaseSwap",
    exchangeAddress: "0xD13609A8ace04D11Ea2FFE176B69dF77C6d9375E",
    exchangeType: "OdosExchange",
    pathfinderKey: OdosOnlyDex.BaseSwap,
  } as Config,

  Arbidex: {
    ...ChainConfigs.arb,
    name: "Arbidex",
    partner: "Orbs:TWAP:Arbidex",
    exchangeAddress: "0x7D73DEa3e1b8115fA2f0814B4960cBF3B38eF04a",
    exchangeType: "OdosExchange",
    pathfinderKey: OdosOnlyDex.Arbidex,
  } as Config,

  Thena: {
    ...ChainConfigs.bsc,
    name: "Thena",
    partner: "Orbs:TWAP:Thena",
    exchangeAddress: "0xD63430c74C8E70D9dbdCA04C6a9E6E9E929028DA",
    exchangeType: "ParaswapExchange",
    pathfinderKey: ParaswapOnlyDex.Thena,
  } as Config,

  PancakeSwap: {
    ...ChainConfigs.bsc,
    name: "PancakeSwap",
    partner: "Orbs:TWAP:PancakeSwap",
    exchangeAddress: "0x3dD428151c697Aa1a3E5d0ee6A52768E70D85daE",
    exchangeType: "ParaswapExchange",
    pathfinderKey: ParaswapOnlyDex.PancakeSwap,
  } as Config,
};

export const chainConfig = (chainId: number) => _.find(ChainConfigs, (c) => c.chainId === chainId)!;
