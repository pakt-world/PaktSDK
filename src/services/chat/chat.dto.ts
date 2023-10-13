import { ResponseDto } from "../../utils";
import { IUser } from "../auth/auth.dto";

export interface IChatMessage {
  _id: string;
  user: IUser | string;
  type: string;
  conversation: IChatConversation | string;
  mediaId: IFile | string;
  content: string;
  quotedContent: string;
  quotedContentId: IChatMessage | string;
  mediaType?: string;
  seen?: string;
  readBy?: string[];
}

export interface IChatConversation {
  _id: string;
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
