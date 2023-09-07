import { ResponseDto } from "../../utils";
import { IUser } from "../auth/auth.dto";
import { ICollectionDto } from "../collection/collection.dto";

export type IInviteStatus = "pending" | "accepted" | "rejected";

export interface IInviteDto {
  sender: IUser | string;
  reciever: IUser | string;
  data: ICollectionDto | string;
  message: string;
  description: string;
  status: IInviteStatus;
  emailToken: string;
  acceptedAt?: string;
}

export interface SendInviteDto {
  receiver: string;
  collectionId: string;
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
  sendInvite(payload: SendInviteDto): Promise<ResponseDto<{}>>;
  acceptInvite(inviteId: string): Promise<ResponseDto<{}>>;
  declineInvite(inviteId: string): Promise<ResponseDto<{}>>;
  getAll(filter?: FilterInviteDto): Promise<ResponseDto<FindInvitesDto>>;
  getAnInvite(id: string): Promise<ResponseDto<IInviteDto>>;
}
