import { ResponseDto } from "src/utils/response";
import { IUser } from "../auth";

export interface CreateWithdrawal {
  coin: string;
  amount: number;
  address: string;
  password: string;
}

export interface FilterWithdrawal {
  page: number;
  limit: number;
  owner: string;
}

export type FindWithdrawalsDto = {
  page: number;
  pages: number;
  total: number;
  data: IWithdrawalDto[];
};

interface ITransactionDto {
  owner: IUser | string;
  amount: number;
  sender: string;
  reciever: IUser | string;
  currency: string;
  usdValue: number;
  description: string;
  tx: string;
  type: string;
  hash: string;
  method: string;
  status: string;
  data?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IWithdrawalDto {
  owner: string | IUser;
  txId: string | ITransactionDto;
  chainTxId: string;
  coin: string;
  address: string;
  amount: number;
  usdValue: number;
  usdRate: number;
  status: string;
}

export interface WithdrawalModuleType {
  createWithdrawal(payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>>;
  fetchWithdrawal(filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>>;
}
