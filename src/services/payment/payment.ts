import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import {
  IBlockchainCoinDto,
  ICreatePaymentDto,
  IPaymentDataDto,
  IRPCDto,
  IReleasePaymentDto,
  IValidatePaymentDto,
  PaymentModuleType,
} from "./payment.dto";

export * from "./payment.dto";

@Service({
  factory: (data: { id: string }) => {
    return new PaymentModule(data.id);
  },
  transient: true,
})
export class PaymentModule implements PaymentModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  create(authToken: string, payload: ICreatePaymentDto): Promise<ResponseDto<IPaymentDataDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IPaymentDataDto> = await this.connector.post({
        path: `${API_PATHS.CREATE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  validate(authToken: string, payload: IValidatePaymentDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IPaymentDataDto> = await this.connector.post({
        path: `${API_PATHS.VALIDATE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  release(authToken: string, payload: IReleasePaymentDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IPaymentDataDto> = await this.connector.post({
        path: `${API_PATHS.RELEASE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  paymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoinDto[]>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IBlockchainCoinDto[]> = await this.connector.get({
        path: `${API_PATHS.PAYMENT_METHODS}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IRPCDto> = await this.connector.get({
        path: `${API_PATHS.RPC}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
