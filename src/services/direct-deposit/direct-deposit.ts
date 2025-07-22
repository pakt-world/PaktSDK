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
import { API_PATHS, ErrorUtils, ResponseDto, Status } from "../../utils";

@Service({
  factory: (data: { id: string }) => {
    return new DirectDepositModule(data.id);
  },
  transient: true,
})
export class DirectDepositModule implements DirectDepositModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  createDirectDeposit(props: {
    authToken: string;
    payload: ICreateDirectDepositPayload;
  }): Promise<ResponseDto<ICreateDirectDepositResponse>> {
    const { payload, authToken } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<ICreateDirectDepositResponse> = await this.connector.post({
        path: API_PATHS.CREATE_DIRECT_DEPOSIT,
        body: requestBody,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  validateDirectDeposit(props: {
    authToken: string;
    payload: IValidateDirectDepositPayload;
  }): Promise<ResponseDto<IValidateDirectDepositResponse>> {
    const { payload, authToken } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IValidateDirectDepositResponse> = await this.connector.post({
        path: API_PATHS.VALIDATE_DIRECT_DEPOSIT,
        body: requestBody,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  fetchPaymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoin[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IBlockchainCoin[]> = await this.connector.get({
        path: API_PATHS.FETCH_PAYMENT_METHODS,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  fetchActiveRPC(authToken: string): Promise<ResponseDto<IRPCServer>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IRPCServer> = await this.connector.get({
        path: API_PATHS.FETCH_ACTIVE_RPC,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
