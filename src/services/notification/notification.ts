import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, parseUrlWithQuery } from "../../utils/response";
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

  async getAll(filter?: filterNotificationDto): Promise<ResponseDto<FindNotificationDto>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.NOTIFICATION_FETCH, filter);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindNotificationDto> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }

  async markAll(): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.NOTIFICATION_MARK_ALL,
      });
      return response.data;
    });
  }

  async markOneAsRead(id: string): Promise<ResponseDto<void>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.NOTIFICATION_MARK_ONE + "/" + id, null);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: fetchUrl,
      });
      return response.data;
    });
  }
}
