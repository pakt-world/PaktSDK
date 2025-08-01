import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { FindNotificationDto, NotificationModuleType, filterNotificationDto } from "./notification.dto";
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";

export * from "./notification.dto";

@Service({
  factory: (data: { id: string }) => {
    return new NotificationModule(data.id);
  },
  transient: true,
})
export class NotificationModule implements NotificationModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  async getAll(props: {
    authToken: string;
    filter?: filterNotificationDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindNotificationDto>> {
    const { authToken, filter, options } = props;
    const fetchUrl = parseUrlWithQuery(API_PATHS.NOTIFICATION_FETCH, filter);
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<FindNotificationDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  async markAll(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<void>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.NOTIFICATION_MARK_ALL,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  async markOneAsRead(props: {
    authToken: string;
    notificationId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<void>> {
    const { authToken, notificationId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.NOTIFICATION_MARK_ONE + "/" + notificationId,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
