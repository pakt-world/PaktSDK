import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import {
  CreateWithdrawal,
  FilterWithdrawal,
  FindWithdrawalsDto,
  IWithdrawalDto,
  WithdrawalModuleType,
} from "./withdrawal.dto";
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";

export * from "./withdrawal.dto";

@Service({
  factory: (data: { id: string }) => {
    return new WithdrawalModule(data.id);
  },
})
export class WithdrawalModule implements WithdrawalModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  createWithdrawal(props: {
    authToken: string;
    payload: CreateWithdrawal;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IWithdrawalDto>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IWithdrawalDto> = await this.connector.post({
        path: API_PATHS.CREATE_WITHDRAWAL,
        body: requestBody,
        authToken,
      });
      return response;
    }, options || this.configBackOff);
  }

  fetchWithdrawal(props: {
    authToken: string;
    filter: FilterWithdrawal;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindWithdrawalsDto>> {
    const { authToken, filter, options } = props;
    const fetchUrl = parseUrlWithQuery(API_PATHS.FETCH_WITHDRAWALS, filter);
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<FindWithdrawalsDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
