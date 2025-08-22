import { IAny, IModel, ResponseDto } from "../../utils";
import { IUser } from "../auth";
import { ICollectionDto } from "../collection";

export interface ICreateDirectDepositPayload {
  collectionType: "payments";
  amount: number;
  coin: string;
  name: string;
  description: string;
  owner: string;
  systemDeposit?: boolean;
}

export interface IValidateDirectDepositPayload {
  collection: string;
  method?: "stripe" | "crypto";
  status?: string;
  owner?: string;
  meta?: Record<string, IAny>;
  release?: boolean;
}

export interface ICreateDirectDepositResponse {
  coin: string;
  address: string;
  collectionAmount: number;
  collectionAmountCoin: number;
  expectedFee: number;
  amountToPay: number;
  usdFee: number;
  usdAmount: number;
  feePercentage: number;
  rate: number;
  chainId: string;
  contractAddress: string;
  paymentMethods: string[];
  collectionId: string;
}

export interface IValidateDirectDepositResponse extends ICollectionDto {
  isFundingRequest: boolean;
  creator: string | IUser;
}

export interface IBlockchainCoin extends IModel {
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
  order?: number;
}

export interface IRPCServer extends IModel {
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
  authlock?: boolean;
  username?: string;
  password?: string;
}

export interface DirectDepositModuleType {
  createDirectDeposit(props: {
    authToken: string;
    payload: ICreateDirectDepositPayload;
  }): Promise<ResponseDto<ICreateDirectDepositResponse>>;

  validateDirectDeposit(props: {
    authToken: string;
    payload: IValidateDirectDepositPayload;
  }): Promise<ResponseDto<IValidateDirectDepositResponse>>;

  fetchPaymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoin[]>>;

  fetchActiveRPC(authToken: string): Promise<ResponseDto<IRPCServer>>;
}
