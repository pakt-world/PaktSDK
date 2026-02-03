import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import {
  IBlockchainCoinDto,
  ICreateEscrowDto,
  IEscrowDataDto,
  IRPCDto,
  IReleaseEscrowDto,
  IValidateEscrowDto,
  EscrowModuleType,
} from "./escrow.dto";

export * from "./escrow.dto";

@Service({
  factory: (data: { id: string }) => {
    return new EscrowModule(data.id);
  },
  transient: true,
})
export class EscrowModule implements EscrowModuleType {
  private readonly id: string;
  private readonly connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  create(authToken: string, payload: ICreateEscrowDto): Promise<ResponseDto<IEscrowDataDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IEscrowDataDto> = await this.connector.post({
        path: `${API_PATHS.v1.CREATE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  validate(authToken: string, payload: IValidateEscrowDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IEscrowDataDto> = await this.connector.post({
        path: `${API_PATHS.v1.VALIDATE_ORDER}`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  release(authToken: string, payload: IReleaseEscrowDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IEscrowDataDto> = await this.connector.post({
        path: `${API_PATHS.v1.RELEASE_ORDER}`,
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
        path: `${API_PATHS.v1.PAYMENT_METHODS}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IRPCDto> = await this.connector.get({
        path: `${API_PATHS.v1.RPC}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
