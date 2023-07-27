import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, parseUrlWithQUery } from "../../utils/response";
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

  createWithdrawal(payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>> {
    return ErrorUtils.tryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IWithdrawalDto> = await this.connector.post({
        path: API_PATHS.CREATE_WITHDRAWAL,
        body: requestBody,
      });
      return response.data;
    });
  }

  fetchWithdrawal(filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>> {
    const fetchUrl = parseUrlWithQUery(API_PATHS.FETCH_WITHDRAWALS, filter);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindWithdrawalsDto> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }
}
