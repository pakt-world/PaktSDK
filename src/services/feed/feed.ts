import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { CreateFeedDto, FeedModuleType, FilterFeedDto, FindFeedDto, IFeed } from "./feed.dto";
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";

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
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  create(props: { authToken: string; payload: CreateFeedDto; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<{}> = await this.connector.post({
        path: `${API_PATHS.FEEDS}/`,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getAll(props: {
    authToken: string;
    filter?: FilterFeedDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindFeedDto>> {
    const { authToken, filter, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const theFilter = filter ? { ...filter, isOwner: true } : { isOwner: true };
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.FEEDS}/`, { ...theFilter });
      const response: ResponseDto<FindFeedDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getById(props: { authToken: string; filterId: string; options?: BackoffOptions }): Promise<ResponseDto<IFeed>> {
    const { authToken, filterId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.get({
        path: `${API_PATHS.FEEDS}/${filterId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  dismissAllFeeds(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.put({
        path: `${API_PATHS.FEEDS_DISMISS_ALL}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  dismissAFeed(props: { authToken: string; filterId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, filterId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFeed> = await this.connector.put({
        path: `${API_PATHS.FEEDS}/${filterId}/dismiss`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options);
  }
}
