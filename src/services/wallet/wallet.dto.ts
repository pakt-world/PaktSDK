import { ResponseDto } from "../../utils/response";

interface WalletUser {
  profile: {
    talent: {
      tags: string[];
      availability: string;
      tagsIds: object[];
    };
  };
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  score: number;
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
  _id: string;
  owner: WalletUser;
  amount: number;
  ledger: number;
  lock: number;
  lockedUsd: number;
  usdValue: number;
  usdRate: number;
  spendable: number;
  address: string;
  coin: string;
  walletId: string;
  walletData: string;
  status: IWalletStatus;
  prod: boolean;
  isSystem: boolean;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updateAt?: string | Date;
}

export interface ITransactionDto {
  _id: string;
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
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
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
  getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>>;
  getTransactions(authToken: string): Promise<ResponseDto<FindTransactionsDto>>;
  getATransaction(authToken: string, id: string): Promise<ResponseDto<ITransactionDto>>;
  getTransactionStats(authToken: string): Promise<ResponseDto<ITransactionStatsDto[]>>;
  getAggregateTransactionStats(authToken: string): Promise<ResponseDto<AggTxns[]>>;
  getWallets(authToken: string): Promise<ResponseDto<IWalletDto[]>>;
  getSingleWallet(authToken: string, coin: string): Promise<ResponseDto<IWalletDto>>;
}
