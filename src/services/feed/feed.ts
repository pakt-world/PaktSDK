import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { CreateFeedDto, FeedModuleType, FilterFeedDto, FindFeedDto, IFeed } from "./feed.dto";

export * from "./feed.dto";

@Service({
  factory: (data: { id: string }) => {
    return new FeedModule(data.id);
  },
  transient: true,
})
export class FeedModule implements FeedModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  create(authToken: string, payload: CreateFeedDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<{}> = await this.connector.post({
        path: `${API_PATHS.FEEDS}/`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  getAll(authToken: string, filter?: FilterFeedDto): Promise<ResponseDto<FindFeedDto>> {
    return ErrorUtils.newTryFail(async () => {
      const theFilter = filter ? { ...filter, isOwner: true } : { isOwner: true };
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.FEEDS}/`, { ...theFilter });
      const response: ResponseDto<FindFeedDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  getById(authToken: string, filterId: string): Promise<ResponseDto<IFeed>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.get({
        path: `${API_PATHS.FEEDS}/${filterId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  dismissAllFeeds(authToken: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.put({
        path: `${API_PATHS.FEEDS_DISMISS_ALL}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  dismissAFeed(authToken: string, filterId: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.put({
        path: `${API_PATHS.FEEDS}/${filterId}/dismiss`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
