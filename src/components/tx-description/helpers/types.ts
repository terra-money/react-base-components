import { LCDClientConfig } from '@terra-money/terra.js';

export interface ComponentProps {
  network: NetworkConfig;
  config?: { printCoins: number; myWallet?: string };
}

export interface NetworkConfig extends LCDClientConfig {
  name: string;
}

export interface TokenInfo {
  protocol?: string;
  symbol: string;
  token: string;
  icon?: string;
  decimals?: number;
}

export interface ContractInfo {
  protocol: string;
  name: string;
  icon: string;
}
