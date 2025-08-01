import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, PAKT_BACKOFF_OPTIONS, ResponseDto, Status } from "../../utils";
import { ConnectionFilterModuleType, IConnectionFilter } from "./connectionFilter.dto";
import { BackoffOptions } from "../../utils/backOff/options";

export * from "./connectionFilter.dto";

@Service({
  factory: (data: { id: string }) => {
    return new ConnectionFilterModule(data.id);
  },
  transient: true,
})
export class ConnectionFilterModule implements ConnectionFilterModuleType {
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
    payload: IConnectionFilter;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IConnectionFilter>> {
    const { payload, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IConnectionFilter> = await this.connector.post({
        path: API_PATHS.CREATE_CONNECTION_FILTER,
        body: requestBody,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  update(props: {
    authToken: string;
    payload: IConnectionFilter;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IConnectionFilter>> {
    const { payload, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IConnectionFilter> = await this.connector.patch({
        path: API_PATHS.UPDATE_CONNECTION_FILTER,
        body: requestBody,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getForAUser(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IConnectionFilter>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IConnectionFilter> = await this.connector.get({
        path: API_PATHS.GET_CONNECTION_FILTER,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
