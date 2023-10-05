import { PaktConnector } from "src/connector/connector";
import { Container, Service } from "typedi";
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

  create(payload: CreateFeedDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<{}> = await this.connector.post({
        path: `${API_PATHS.FEEDS}/`,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getAll(filter?: FilterFeedDto): Promise<ResponseDto<FindFeedDto>> {
    return ErrorUtils.tryFail(async () => {
      const theFilter = filter ? { ...filter, isOwner: true } : { isOwner: true };
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.FEEDS}/`, { ...theFilter });
      const response: ResponseDto<FindFeedDto> = await this.connector.get({
        path: fetchUrl,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getById(filterId: string): Promise<ResponseDto<IFeed>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.get({
        path: `${API_PATHS.FEEDS}/${filterId}`,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  dismissAllFeeds(): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.put({
        path: `${API_PATHS.FEEDS_DISMISS_ALL}`,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  dismissAFeed(filterId: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.put({
        path: `${API_PATHS.FEEDS}/${filterId}/dismiss`,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
