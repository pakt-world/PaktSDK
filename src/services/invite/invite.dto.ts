import { ResponseDto } from "../../utils";
import { IUser } from "../auth/auth.dto";
import { ICollectionDto } from "../collection/collection.dto";

export type IInviteStatus = "pending" | "accepted" | "rejected";

export interface IInviteDto {
  _id: string;
  sender: IUser | string;
  receiver: IUser | string;
  data: ICollectionDto | string;
  message: string;
  description: string;
  status: IInviteStatus;
  emailToken: string;
  acceptedAt?: string;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SendInviteDto {
  recipient: string;
  collection: string;
}

export type FilterInviteDto =
  | ({
      page?: string;
      limit?: string;
    } & IInviteDto)
  | any;

export interface FindInvitesDto {
  data: IInviteDto[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface InviteModuleType {
  sendInvite(authToken: string, payload: SendInviteDto): Promise<ResponseDto<{}>>;
  acceptInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
  declineInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
  cancelInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
  getAll(authToken: string, filter?: FilterInviteDto): Promise<ResponseDto<FindInvitesDto>>;
  getAnInvite(authToken: string, id: string): Promise<ResponseDto<IInviteDto>>;
}
