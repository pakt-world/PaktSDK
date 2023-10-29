import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { FindNotificationDto, NotificationModuleType, filterNotificationDto } from "./notification.dto";

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
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  async getAll(authToken: string, filter?: filterNotificationDto): Promise<ResponseDto<FindNotificationDto>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.NOTIFICATION_FETCH, filter);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindNotificationDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  async markAll(authToken: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.NOTIFICATION_MARK_ALL,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  async markOneAsRead(authToken: string, id: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.NOTIFICATION_MARK_ONE + "/" + id,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
