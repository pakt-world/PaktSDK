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
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<FindTransactionsDto> = await this.connector.get({
        path: API_PATHS.TRANSACTIONS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getATransaction(authToken: string, id: string): Promise<ResponseDto<ITransactionDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ITransactionDto> = await this.connector.get({
        path: `${API_PATHS.A_TRANSACTION}/${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getTransactionStats(authToken: string): Promise<ResponseDto<ITransactionStatsDto[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ITransactionStatsDto[]> = await this.connector.get({
        path: API_PATHS.TRANSACTION_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getAggregateTransactionStats(authToken: string): Promise<ResponseDto<AggTxns[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<AggTxns[]> = await this.connector.get({
        path: API_PATHS.TRANSACTION_AGGREGATE_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getWallets(authToken: string): Promise<ResponseDto<IWalletDto[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletDto[]> = await this.connector.get({
        path: API_PATHS.WALLETS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getSingleWallet(authToken: string, coin: string): Promise<ResponseDto<IWalletDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletDto> = await this.connector.get({
        path: API_PATHS.SINGLE_WALLET + "/" + coin,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletExchangeDto> = await this.connector.get({
        path: API_PATHS.TRANSACTION_EXCHANGE,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
