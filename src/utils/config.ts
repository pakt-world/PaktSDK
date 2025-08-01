import { BackoffOptions } from "./backOff/options";

export interface PaktConfig {
  baseUrl: string;
  testnet?: boolean;
  verbose?: boolean;
  defaultBackoff?: BackoffOptions;
}
