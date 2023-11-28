import { ResponseDto } from "../../utils";

export type IPaymentCoins = "usdc" | "avax";

export enum IPaymentStatusEnum {
  PENDING = "pending",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  WAITING = "waiting",
  CANCELLED = "cancelled",
  DELETED = "deleted",
}

export type IPaymentStatusType = "pending" | "ongoing" | "completed" | "waiting" | "cancelled" | "deleted";

export interface ICreatePaymentDto {
  coin: IPaymentCoins;
  collection: string;
}

export interface IPaymentDataDto {
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

export interface IValidatePaymentDto {
  collection: string;
  status?: IPaymentStatusType;
}

export interface IReleasePaymentDto {
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

export interface PaymentModuleType {
  create(authToken: string, payload: ICreatePaymentDto): Promise<ResponseDto<IPaymentDataDto>>;
  validate(authToken: string, payload: IValidatePaymentDto): Promise<ResponseDto<{}>>;
  release(authToken: string, payload: IReleasePaymentDto): Promise<ResponseDto<{}>>;
  paymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoinDto[]>>;
  activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>>;
}
