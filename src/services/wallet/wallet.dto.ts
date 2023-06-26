import { ResponseDto } from "src/utils/response";

interface WalletUser {
  profile: {
    talent: {
      skills: string[];
      availability: string;
      skillIds: object[];
    };
  };
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  afroScore: number;
}

enum IWalletStatus {
  ACTIVE = "active",
  DEACTIVATED = "deactivated",
  BLOCKED = "blocked",
}

enum ITransactionStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

enum ITransactionMethod {
  SENT = "sent",
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  RECIEVED = "recieved",
  ESCROW = "escrow",
  JOBPAYOUT = "job-payout",
  FEEPAYOUT = "fee-payout",
}

export interface IWalletExchangeDto {
  avax: number;
}

export interface IWalletDto {
  owner: WalletUser;
  amount: number;
  ledger: number;
  lock: number;
  lockedUsd: number;
  usdValue: number;
  usdRate: number;
  spendable: number;
  address: string;
  addressC: string;
  addressX: string;
  coin: string;
  walletId: string;
  walletData: string;
  status: IWalletStatus;
  prod: boolean;
  isSystem: boolean;
}

export interface ITransactionDto {
  owner: WalletUser;
  amount: number;
  sender: string;
  reciever: string;
  currency: string;
  usdValue: number;
  description: string;
  tx: string;
  type: string;
  hash: string;
  method: ITransactionMethod;
  status: ITransactionStatus;
}

export type FindTransactionsDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  transactions: ITransactionDto[];
};

export interface ITransactionStatsDto {
  _id: number;
  count: number;
  date: string;
}

export interface AggTxns {
  type: string;
  amount: number;
  date: string;
}

export interface WalletModuleType {
  getExchange(): Promise<ResponseDto<IWalletExchangeDto>>;
  getTransactions(): Promise<ResponseDto<FindTransactionsDto>>;
  getATransaction(id: string): Promise<ResponseDto<ITransactionDto>>;
  getTransactionStats(): Promise<ResponseDto<ITransactionStatsDto[]>>;
  getAggregateTransactionStats(): Promise<ResponseDto<AggTxns[]>>;
  getWalletData(): Promise<ResponseDto<IWalletDto>>;
  getWallets(): Promise<ResponseDto<IWalletDto[]>>;
  getSingleWallet(coin: string): Promise<ResponseDto<IWalletDto>>;
}