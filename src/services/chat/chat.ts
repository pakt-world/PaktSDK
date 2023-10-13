import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, ResponseDto, Status } from "../../utils";
import { ChatModuleType, IChatConversation } from "./chat.dto";

// Export all Types to Service
export * from "./chat.dto";

@Service({
  factory: (data: { id: string }) => {
    return new ChatModule(data.id);
  },
  transient: true,
})
export class ChatModule implements ChatModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  getUserMessages(): Promise<ResponseDto<IChatConversation[]>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IChatConversation[]> = await this.connector.get({
        path: API_PATHS.GET_USER_MESSAGES,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
