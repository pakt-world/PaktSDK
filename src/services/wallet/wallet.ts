import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import {
  AggTxns,
  FindTransactionsDto,
  ITransactionDto,
  ITransactionStatsDto,
  IWalletDto,
  IWalletExchangeDto,
  WalletModuleType,
} from "./wallet.dto";
export * from "./wallet.dto";

@Service({
  factory: (data: { id: string; coin?: string }) => {
    return new WalletModule(data.id, data.coin);
  },
})
export class WalletModule implements WalletModuleType {
  private id: string;
  private coin: string | undefined;
  private connector: PaktConnector;

  constructor(id: string, coin?: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.coin = coin;
  }

  getTransactions(authToken: string): Promise<ResponseDto<FindTransactionsDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindTransactionsDto> = await this.connector.get({
        path: API_PATHS.WALLET_TRANSACTIONS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getATransaction(authToken: string, id: string): Promise<ResponseDto<ITransactionDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ITransactionDto> = await this.connector.get({
        path: `${API_PATHS.A_WALLET_TRANSACTION}/${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getTransactionStats(authToken: string): Promise<ResponseDto<ITransactionStatsDto[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ITransactionStatsDto[]> = await this.connector.get({
        path: API_PATHS.WALLET_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getAggregateTransactionStats(authToken: string): Promise<ResponseDto<AggTxns[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<AggTxns[]> = await this.connector.get({
        path: API_PATHS.WALLET_AGGREGATE_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getWalletData(authToken: string): Promise<ResponseDto<IWalletDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletDto> = await this.connector.get({
        path: API_PATHS.WALLET_AGGREGATE_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getWallets(authToken: string): Promise<ResponseDto<IWalletDto[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletDto[]> = await this.connector.get({
        path: API_PATHS.WALLETS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getSingleWallet(authToken: string, coin: string): Promise<ResponseDto<IWalletDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletDto> = await this.connector.get({
        path: API_PATHS.SINGLE_WALLET + "/" + coin,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  async getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletExchangeDto> = await this.connector.get({
        path: API_PATHS.WALLET_EXCHANGE,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
