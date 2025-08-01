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
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";

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
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  create(props: {
    authToken: string;
    payload: ICreatePaymentDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IPaymentDataDto>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IPaymentDataDto> = await this.connector.post({
        path: `${API_PATHS.CREATE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  validate(props: {
    authToken: string;
    payload: IValidatePaymentDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<{}>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IPaymentDataDto> = await this.connector.post({
        path: `${API_PATHS.VALIDATE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  release(props: {
    authToken: string;
    payload: IReleasePaymentDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<{}>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IPaymentDataDto> = await this.connector.post({
        path: `${API_PATHS.RELEASE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  paymentMethods(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IBlockchainCoinDto[]>> {
    const { options, authToken } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IBlockchainCoinDto[]> = await this.connector.get({
        path: `${API_PATHS.PAYMENT_METHODS}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  activeRpc(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IRPCDto>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IRPCDto> = await this.connector.get({
        path: `${API_PATHS.RPC}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
