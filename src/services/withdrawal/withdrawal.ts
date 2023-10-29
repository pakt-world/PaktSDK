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

export * from "./withdrawal.dto";

@Service({
  factory: (data: { id: string }) => {
    return new WithdrawalModule(data.id);
  },
})
export class WithdrawalModule implements WithdrawalModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  createWithdrawal(authToken: string, payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>> {
    return ErrorUtils.tryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IWithdrawalDto> = await this.connector.post({
        path: API_PATHS.CREATE_WITHDRAWAL,
        body: requestBody,
        authToken,
      });
      return response.data;
    });
  }

  fetchWithdrawal(authToken: string, filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.FETCH_WITHDRAWALS, filter);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindWithdrawalsDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
