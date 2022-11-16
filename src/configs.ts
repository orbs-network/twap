import { eqIgnoreCase, zeroAddress } from "@defi.org/web3-candies";
import _ from "lodash";

export interface TokenData {
  address: string;
  decimals: number;
  symbol: string;
  logoUrl?: string;
}

export interface Config {
  partner: string;
  chainId: number;
  twapAddress: string;
  lensAddress: string;
  exchangeAddress: string;
  bidDelaySeconds: number;
  minChunkSizeUsd: number;
  wToken: TokenData;
}

const ChainConfigs = {
  eth: {
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
    chainId: 250,
    twapAddress: "0xdE2ed02ef21895B97a937E82068F28390fF464aC",
    lensAddress: "0xbF8e5B3Af58b041c0ADf0c3DEA933e7D32b8D5ef",
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
    chainId: 137,
    twapAddress: "0x50482c3BDb5f257C04620C73F1Be9b30090E9e5D",
    lensAddress: "0xd209419e822E3d68929B33E2CB5A66Ea089005C6",
    bidDelaySeconds: 60,
    minChunkSizeUsd: 10,
    wToken: {
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      decimals: 18,
      symbol: "WMATIC",
      logoUrl: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    },
  },
};

export const UniswapV2Config: Config = {
  ...ChainConfigs.eth,
  partner: "UniswapV2",
  exchangeAddress: "0xE83df5BfA9F14a84e550c38c4ec505cB22C6A0d7",
};

export const SushiSwapConfig: Config = {
  ...ChainConfigs.eth,
  partner: "SushiSwap",
  exchangeAddress: "0x72a18A408e329E7052d08aA0746243Dc30Ad2530",
};

export const QuickSwapConfig: Config = {
  ...ChainConfigs.poly,
  partner: "QuickSwap",
  exchangeAddress: "0xeFE1B6096838949156e5130604434A2a13c68C68",
};

export const SpiritSwapConfig: Config = {
  ...ChainConfigs.ftm,
  partner: "SpiritSwap",
  exchangeAddress: "0xAd19179201be5A51D1cBd3bB2fC651BB05822404",
};

export const SpookySwapConfig: Config = {
  ...ChainConfigs.ftm,
  partner: "SpookySwap",
  exchangeAddress: "0x37F427DA0D12Fe2C80aCa09EE08e7e92A1B2B114",
};

export const nativeTokenAddresses = [
  zeroAddress,
  "0x0000000000000000000000000000000000001010",
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
];

export const isNativeAddress = (address: string) => !!_.find(nativeTokenAddresses, (a) => eqIgnoreCase(a, address));
export const chainConfig = (chainId: number) => _.find(ChainConfigs, (c) => c.chainId === chainId)!;
