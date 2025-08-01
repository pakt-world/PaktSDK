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
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";
export * from "./wallet.dto";

@Service({
  factory: (data: { id: string }) => {
    return new WalletModule(data.id);
  },
})
export class WalletModule implements WalletModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  getTransactions(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<FindTransactionsDto>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<FindTransactionsDto> = await this.connector.get({
        path: API_PATHS.TRANSACTIONS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  getATransaction(props: {
    authToken: string;
    options?: BackoffOptions;
    id: string;
  }): Promise<ResponseDto<ITransactionDto>> {
    const { authToken, id, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ITransactionDto> = await this.connector.get({
        path: `${API_PATHS.A_TRANSACTION}/${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  getTransactionStats(props: {
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ITransactionStatsDto[]>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ITransactionStatsDto[]> = await this.connector.get({
        path: API_PATHS.TRANSACTION_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  getAggregateTransactionStats(props: {
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<AggTxns[]>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<AggTxns[]> = await this.connector.get({
        path: API_PATHS.TRANSACTION_AGGREGATE_STATS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  getWallets(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IWalletResponseDto>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletResponseDto> = await this.connector.get({
        path: API_PATHS.WALLETS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  getSingleWalletById(props: {
    authToken: string;
    id: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ISingleWalletDto>> {
    const { authToken, id, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ISingleWalletDto> = await this.connector.get({
        path: `${API_PATHS.SINGLE_WALLET_BY_ID}/${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  getSingleWalletByCoin(props: {
    authToken: string;
    coin: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ISingleWalletDto>> {
    const { authToken, coin, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ISingleWalletDto> = await this.connector.get({
        path: `${API_PATHS.SINGLE_WALLET_BY_COIN}/${coin}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  async getExchange(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IWalletExchangeDto>> {
    const { authToken, options } = props;

    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IWalletExchangeDto> = await this.connector.get({
        path: API_PATHS.TRANSACTION_EXCHANGE,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
