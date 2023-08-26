import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, ResponseDto, parseUrlWithQuery } from "../../utils";
import { ConnectionFilterModuleType, IConnectionFilter } from "./connectionFilter.dto";

@Service({
  factory: (data: { id: string }) => {
    return new ConnectionFilterModule(data.id);
  },
  transient: true,
})
export class ConnectionFilterModule implements ConnectionFilterModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  create(payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>> {
    return ErrorUtils.tryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IConnectionFilter> = await this.connector.post({
        path: API_PATHS.CREATE_CONNECTION_FILTER,
        body: requestBody,
      });
      return response.data;
    });
  }

  update(payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>> {
    return ErrorUtils.tryFail(async () => {
      const requestBody = { ...payload };
      const response: ResponseDto<IConnectionFilter> = await this.connector.patch({
        path: API_PATHS.UPDATE_CONNECTION_FILTER,
        body: requestBody,
      });
      return response.data;
    });
  }

  getForAUser(): Promise<ResponseDto<IConnectionFilter>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.GET_CONNECTION_FILTER, null);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IConnectionFilter> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }
}
