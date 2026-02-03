import { ResponseDto } from "../../utils";

export type IEscrowCoins = "usdc" | "avax";

export enum IEscrowStatusEnum {
  PENDING = "pending",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  WAITING = "waiting",
  CANCELLED = "cancelled",
  DELETED = "deleted",
}

export type IEscrowStatusType = "pending" | "ongoing" | "completed" | "waiting" | "cancelled" | "deleted";

export type IEscrowType = "direct-deposit" | "escrow";

export interface ICreateEscrowDto {
  coin: IEscrowCoins;
  collection: string;
  usdValue?: number;
}

export interface IEscrowDataDto {
  coin: string;
  address: string;
  collectionAmount: number;
  collectionAmountCoin: string;
  expectedFee: string;
  amountToPay: string;
  usdFee: string;
  usdAmount: string;
  feePercentage: number;
  rate: number;
  chainId: string;
}

export interface IValidateEscrowDto {
  collection: string;
  status?: IEscrowStatusType;
}

export interface IReleaseEscrowDto {
  collection: string;
  amount: number;
}

export interface IBlockchainCoinDto {
  name: string;
  symbol: string;
  icon: string;
  reference: string;
  priceTag: string;
  contractAddress: string;
  decimal: string;
  rpcChainId: string;
  isToken: boolean;
  active: boolean;
}

export interface IRPCDto {
  rpcName: string;
  rpcChainId: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  rpcNativeCurrency: {
    name: string;
    symbol: string;
    decimals: string;
  };
  active: boolean;
}

export interface EscrowModuleType {
  create(authToken: string, payload: ICreateEscrowDto): Promise<ResponseDto<IEscrowDataDto>>;
  validate(authToken: string, payload: IValidateEscrowDto): Promise<ResponseDto<{}>>;
  release(authToken: string, payload: IReleaseEscrowDto): Promise<ResponseDto<{}>>;
  paymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoinDto[]>>;
  activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>>;
}
