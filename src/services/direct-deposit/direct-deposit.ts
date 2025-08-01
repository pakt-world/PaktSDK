import Container, { Service } from "typedi";
import {
  DirectDepositModuleType,
  IBlockchainCoin,
  ICreateDirectDepositPayload,
  ICreateDirectDepositResponse,
  IRPCServer,
  IValidateDirectDepositPayload,
  IValidateDirectDepositResponse,
} from "./direct-deposit.dto";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, PAKT_BACKOFF_OPTIONS, ResponseDto, Status } from "../../utils";
import { BackoffOptions } from "../../utils/backOff/backoff";

@Service({
  factory: (data: { id: string }) => {
    return new DirectDepositModule(data.id);
  },
  transient: true,
})
export class DirectDepositModule implements DirectDepositModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  createDirectDeposit(props: {
    authToken: string;
    payload: ICreateDirectDepositPayload;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ICreateDirectDepositResponse>> {
    const { payload, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<ICreateDirectDepositResponse> = await this.connector.post({
        path: API_PATHS.CREATE_DIRECT_DEPOSIT,
        body: requestBody,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  validateDirectDeposit(props: {
    authToken: string;
    payload: IValidateDirectDepositPayload;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IValidateDirectDepositResponse>> {
    const { payload, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IValidateDirectDepositResponse> = await this.connector.post({
        path: API_PATHS.VALIDATE_DIRECT_DEPOSIT,
        body: requestBody,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  fetchPaymentMethods(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IBlockchainCoin[]>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IBlockchainCoin[]> = await this.connector.get({
        path: API_PATHS.FETCH_PAYMENT_METHODS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  fetchActiveRPC(props: { authToken: string; options: BackoffOptions }): Promise<ResponseDto<IRPCServer>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IRPCServer> = await this.connector.get({
        path: API_PATHS.FETCH_ACTIVE_RPC,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
