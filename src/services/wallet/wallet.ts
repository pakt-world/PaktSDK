import { PaktConnector } from "src/connector";
import { API_PATHS } from "src/utils/constants";
import { ErrorUtils, ResponseDto, parseUrlWithQUery } from "src/utils/response";
import Container, { Service } from "typedi";
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

  getTransactions(): Promise<ResponseDto<FindTransactionsDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindTransactionsDto> = await this.connector.get({
        path: API_PATHS.WALLET_TRANSACTIONS,
      });
      return response.data;
    });
  }
  getATransaction(id: string): Promise<ResponseDto<ITransactionDto>> {
    const fetchUrl = parseUrlWithQUery(API_PATHS.A_WALLET_TRANSACTION + "/" + id, null);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ITransactionDto> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }
  getTransactionStats(): Promise<ResponseDto<ITransactionStatsDto[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ITransactionStatsDto[]> = await this.connector.get({
        path: API_PATHS.WALLET_STATS,
      });
      return response.data;
    });
  }
  getAggregateTransactionStats(): Promise<ResponseDto<AggTxns[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<AggTxns[]> = await this.connector.get({
        path: API_PATHS.WALLET_AGGREGATE_STATS,
      });
      return response.data;
    });
  }
  getWalletData(): Promise<ResponseDto<IWalletDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletDto> = await this.connector.get({
        path: API_PATHS.WALLET_AGGREGATE_STATS,
      });
      return response.data;
    });
  }
  getWallets(): Promise<ResponseDto<IWalletDto[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletDto[]> = await this.connector.get({
        path: API_PATHS.WALLETS,
      });
      return response.data;
    });
  }
  getSingleWallet(coin: string): Promise<ResponseDto<IWalletDto>> {
    const fetchUrl = parseUrlWithQUery(API_PATHS.SINGLE_WALLET + "/" + coin, null);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletDto> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }

  async getExchange(): Promise<ResponseDto<IWalletExchangeDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IWalletExchangeDto> = await this.connector.get({
        path: API_PATHS.WALLET_EXCHANGE,
      });
      return response.data;
    });
  }
}
