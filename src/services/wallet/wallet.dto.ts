import { BackoffOptions } from "../../utils/backOff/options";
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

export type ITransactionType = "sent" | "deposit" | "withdrawal" | "recieved" | "escrow" | "job-payout" | "fee-payout";

export interface IWalletExchangeDto {
  avax: number;
  [key: string]: number;
}

export interface IWalletDto {
  _id: string;
  owner: WalletUser;
  amount: number | string;
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

export interface ISingleWalletDto {
  _id: string;
  coin: string;
  amount: number;
  usdValue: number;
  icon: string;
  address: string;
}

export interface IWalletResponseDto {
  totalBalance: number;
  value: number;
  wallets: IWalletDto[];
}

export interface IWalletBalanceDto {
  balance: number;
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
  type: ITransactionType;
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

export type ITransactionStatsFormat = "weekly" | "monthly" | "yearly";

export interface ITransactionStatsDto {
  _id: number;
  count: number;
  date?: string;
}

export interface AggTxns {
  type: string;
  amount: number;
  date: string;
}

export interface WalletModuleType {
  getExchange(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IWalletExchangeDto>>;
  getTransactions(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<FindTransactionsDto>>;
  getATransaction(props: {
    authToken: string;
    id: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ITransactionDto>>;
  getTransactionStats(props: {
    authToken: string;
    format: ITransactionStatsFormat;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ITransactionStatsDto[]>>;
  getAggregateTransactionStats(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<AggTxns[]>>;
  getWallets(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IWalletResponseDto>>;
  getSingleWalletById(props: {
    authToken: string;
    id: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ISingleWalletDto>>;
  getSingleWalletByCoin(props: {
    authToken: string;
    coin: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ISingleWalletDto>>;
}
