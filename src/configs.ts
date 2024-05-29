import { networks } from "@defi.org/web3-candies";
import _ from "lodash";
import twapArtifact from "../artifacts/contracts/TWAP.sol/TWAP.json";
import lensArtifact from "../artifacts/contracts/periphery/Lens.sol/Lens.json";
import takerArtifact from "../artifacts/contracts/periphery/Taker.sol/Taker.json";
import * as legacyAbis from "./legacy-abi";
import * as bnbConfig from "../script/input/56/config.json";
import * as polyConfig from "../script/input/137/config.json";
import * as arbConfig from "../script/input/42161/config.json";
import * as ftmConfig from "../script/input/250/config.json";
import * as avaxConfig from "../script/input/43114/config.json";
import * as baseConfig from "../script/input/8453/config.json";

import * as lineaConfig from "../script/input/59144/config.json";
import * as moonbeamConfig from "../script/input/1284/config.json";

export { nativeTokenAddresses, zeroAddress } from "@defi.org/web3-candies";

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

  name: string;
  partner: string;
  exchangeAddress: string;
  exchangeType:
    | "RouterExchange"
    | "UniswapV2Exchange"
    | "ParaswapExchange"
    | "PangolinDaasExchange"
    | "OdosExchange"
    | "OpenOceanExchange"
    | "KyberExchange";
  pathfinderKey: string;
}

const abis = {
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
    ...abis,
  },
  bsc: {
    chainName: "bsc",
    chainId: 56,
    twapVersion: 4,
    twapAddress: bnbConfig.twap,
    lensAddress: bnbConfig.lens,
    bidDelaySeconds: 60,
    minChunkSizeUsd: 50,
    nativeToken: networks.bsc.native,
    wToken: networks.bsc.wToken,
    ...abis,
  },
  arb: {
    chainName: "arb",
    chainId: 42161,
    twapVersion: 4,
    twapAddress: arbConfig.twap,
    lensAddress: arbConfig.lens,
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.arb.native,
    wToken: networks.arb.wToken,
    ...abis,
  },
  ftm: {
    chainName: "ftm",
    chainId: 250,
    twapVersion: 4,
    twapAddress: ftmConfig.twap,
    lensAddress: ftmConfig.lens,
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    nativeToken: networks.ftm.native,
    wToken: networks.ftm.wToken,
    ...abis,
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
    ...abis,
  },
  avax: {
    chainName: "avax",
    chainId: 43114,
    twapVersion: 4,
    twapAddress: "0xF2687e119B0A4aB00bED9c9F425403566D605020",
    lensAddress: "0xfA1e5Da0Cbb780b891Cd635264354a9F4d3A726E",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 100,
    nativeToken: networks.avax.native,
    wToken: networks.avax.wToken,
    ...abis,
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
    ...abis,
  },
  linea: {
    chainName: "linea",
    chainId: 59144,
    twapVersion: 4,
    twapAddress: lineaConfig.twap,
    lensAddress: lineaConfig.lens,
    bidDelaySeconds: 60,
    minChunkSizeUsd: 100,
    nativeToken: networks.linea.native,
    wToken: networks.linea.wToken,
    ...abis,
  },
  zkSync: {
    chainName: "zkSync",
    chainId: 324,
    twapVersion: 4,
    twapAddress: "0x971f855C98f45fcdD2782f03bD80Cf6C146Cf123",
    lensAddress: "0x3a661ACA20Cb9Ff8551D1F100cBCE4683fa31Af7",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 100,
    nativeToken: networks.zksync.native,
    wToken: networks.zksync.wToken,
    ...abis,
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
    pathfinderKey: "SpiritSwap,SpiritSwapV2,SpiritSwapV3",
  } as Config,

  SpookySwap: {
    ...ChainConfigs.ftm,
    name: "SpookySwap",
    partner: "Orbs:TWAP:SpookySwap",
    exchangeAddress: "0x704b9764cb36B8856f3097845dcc594d82192638",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: "SpookySwap",
  } as Config,

  Pangolin: {
    ...ChainConfigs.avax,
    name: "Pangolin",
    partner: "Orbs:TWAP:Pangolin",
    exchangeAddress: "0xf2d96E7BE676153d202e1453804E2749923C7c5b",
    exchangeType: "UniswapV2Exchange",
    pathfinderKey: "PangolinSwap",
  } as Config,

  PangolinDaas: {
    ...ChainConfigs.avax,
    name: "PangolinDaas",
    partner: "Orbs:TWAP:PangolinDaas",
    exchangeAddress: "0x1579EED0527781B1A748043AA1f59a3858Ace4a7",
    exchangeType: "PangolinDaasExchange",
    pathfinderKey: "PangolinSwap",
  } as Config,

  QuickSwap: {
    ...ChainConfigs.poly,
    name: "QuickSwap",
    partner: "Orbs:TWAP:QuickSwap",
    exchangeAddress: "0x26D0ec4Be402BCE03AAa8aAf0CF67e9428ba54eF",
    exchangeType: "ParaswapExchange",
    pathfinderKey: "QuickSwap,QuickSwapV3",
  } as Config,

  Chronos: {
    ...ChainConfigs.arb,
    name: "Chronos",
    partner: "Orbs:TWAP:Chronos",
    exchangeAddress: "0xceFf098C9199c5d9cf24078dc14Eb8F787631cC0",
    exchangeType: "OdosExchange",
    pathfinderKey: "Chronos Stable,Chronos Volatile,Chronos V3",
  } as Config,

  BaseSwap: {
    ...ChainConfigs.base,
    name: "BaseSwap",
    partner: "Orbs:TWAP:BaseSwap",
    exchangeAddress: "0xeFE1B6096838949156e5130604434A2a13c68C68",
    exchangeType: "OdosExchange",
    pathfinderKey: "BaseSwap,BaseSwapX",
  } as Config,

  Arbidex: {
    ...ChainConfigs.arb,
    name: "Arbidex",
    partner: "Orbs:TWAP:Arbidex",
    exchangeAddress: "0x8ffde23Fba2d7Aea9C3CBf2d5B7B533BB46754a8",
    exchangeType: "OdosExchange",
    pathfinderKey: "Arbidex Classic,Arbidex Quantum",
  } as Config,

  Thena: {
    ...ChainConfigs.bsc,
    name: "Thena",
    partner: "Orbs:TWAP:Thena",
    exchangeAddress: "0xc2aBC02acd77Bb2407efA22348dA9afC8B375290",
    exchangeType: "OpenOceanExchange",
    pathfinderKey: "43,47",
  } as Config,

  PancakeSwap: {
    ...ChainConfigs.bsc,
    name: "PancakeSwap",
    partner: "Orbs:TWAP:PancakeSwap",
    exchangeAddress: "0xb2BAFe188faD927240038cC4FfF2d771d8A58905",
    exchangeType: "RouterExchange",
    pathfinderKey: "",
  } as Config,

  Lynex: {
    ...ChainConfigs.linea,
    name: "Lynex",
    partner: "Orbs:TWAP:Lynex",
    exchangeAddress: "0x72e3e1fD5D2Ee2F1C2Eb695206D490a1D45C3835",
    exchangeType: "OpenOceanExchange",
    pathfinderKey: "19,18",
  } as Config,

  SyncSwap: {
    ...ChainConfigs.zkSync,
    name: "SyncSwap",
    partner: "Orbs:TWAP:SyncSwap",
    exchangeAddress: "0x5D96A072B2854d9a9D56C68806b0Bbcf7Db60b6d",
    exchangeType: "OpenOceanExchange",
    pathfinderKey: "2,3",
  } as Config,

  Retro: {
    ...ChainConfigs.poly,
    name: "Retro",
    partner: "Orbs:TWAP:Retro",
    exchangeAddress: "0xC454Abb5b0CA974a4397139764478C736327d2B0",
    exchangeType: "KyberExchange",
    pathfinderKey: "retro,retro-v3",
  } as Config,
};

export const chainConfig = (chainId: number) => _.find(ChainConfigs, (c) => c.chainId === chainId)!;
