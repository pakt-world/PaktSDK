import { ResponseDto } from "../../utils";
import { IUser } from "../auth/auth.dto";

export interface IChatMessage {
  user: IUser | string;
  type: string;
  conversation: IChatConversation | string;
  mediaId: IFile | string;
  content: string;
  quotedContent: string;
  quotedContentId: IChatMessage | string;
  mediaType?: string;
  seen?: string;
}

export interface IChatConversation {
  type: string;
  recipients: IUser[] | string[];
  messages: IChatMessage[] | string[];
}

export interface IFile {
  name: string;
  uploaded_by: IUser | string;
  url: string;
  meta: object;
  status: boolean;
  isDeleted: boolean;
  deletedAt?: string;
}

export interface ChatModuleType {
  getUserMessages(): Promise<ResponseDto<IChatConversation[]>>;
}
