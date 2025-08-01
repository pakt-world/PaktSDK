import { BackoffOptions } from "../../utils/backOff/options";
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
  sendInvite(props: { authToken: string; payload: SendInviteDto; options?: BackoffOptions }): Promise<ResponseDto<{}>>;
  acceptInvite(props: { authToken: string; inviteId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>>;
  declineInvite(props: { authToken: string; inviteId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>>;
  cancelInvite(props: { authToken: string; inviteId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>>;
  getAll(props: {
    authToken: string;
    filter?: FilterInviteDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindInvitesDto>>;
  getAnInvite(props: {
    authToken: string;
    inviteId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IInviteDto>>;
}
