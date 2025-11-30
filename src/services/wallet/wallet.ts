import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import {
  AggTxns,
  FindTransactionsDto,
  ISingleWalletDto,
  ITransactionDto,
  ITransactionStatsDto,
  IWalletExchangeDto,
  IWalletResponseDto,
  WalletModuleType,
} from "./wallet.dto";
export * from "./wallet.dto";

@Service({
  factory: (data: { id: string }) => {
    return new WalletModule(data.id);
  },
})
export class WalletModule implements WalletModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  getTransactions(authToken: string): Promise<ResponseDto<FindTransactionsDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<FindTransactionsDto> = await this.connector.get({
        path: API_PATHS.v1.TRANSACTIONS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getATransaction(authToken: string, id: string): Promise<ResponseDto<ITransactionDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ITransactionDto> = await this.connector.get({
        path: `${API_PATHS.v1.A_TRANSACTION}/${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getTransactionStats(authToken: string): Promise<ResponseDto<ITransactionStatsDto[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ITransactionStatsDto[]> = await this.connector.get({
        path: API_PATHS.v1.TRANSACTION_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getAggregateTransactionStats(authToken: string): Promise<ResponseDto<AggTxns[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<AggTxns[]> = await this.connector.get({
        path: API_PATHS.v1.TRANSACTION_AGGREGATE_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getWallets(authToken: string): Promise<ResponseDto<IWalletResponseDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletResponseDto> = await this.connector.get({
        path: API_PATHS.v1.WALLETS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getSingleWalletById(authToken: string, id: string): Promise<ResponseDto<ISingleWalletDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ISingleWalletDto> = await this.connector.get({
        path: `${API_PATHS.v1.SINGLE_WALLET_BY_ID}/${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getSingleWalletByCoin(authToken: string, coin: string): Promise<ResponseDto<ISingleWalletDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ISingleWalletDto> = await this.connector.get({
        path: `${API_PATHS.v1.SINGLE_WALLET_BY_COIN}/${coin}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletExchangeDto> = await this.connector.get({
        path: API_PATHS.v1.TRANSACTION_EXCHANGE,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
