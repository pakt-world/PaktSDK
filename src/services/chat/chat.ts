import { PaktConnector } from "src/connector";
import Container, { Service } from "typedi";
import { API_PATHS, ErrorUtils, ResponseDto, parseUrlWithQuery } from "../../utils";
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
      const fetchUrl = parseUrlWithQuery(API_PATHS.GET_USER_MESSAGES, null);
      const response: ResponseDto<IChatConversation[]> = await this.connector.get({ path: fetchUrl });
      return response.data;
    });
  }
}