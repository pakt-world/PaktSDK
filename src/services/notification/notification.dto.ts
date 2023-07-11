import { ResponseDto } from "src/utils/response";

enum INotificationType {
  NEW_PROJECT = "new_project",
  NEW_JOB = "new_job",
  ASSIGNED_JOB = "assigned_job",
  NEW_DEPOSIT = "new_deposit",
  NEW_TRANSFER = "new_transfer",
  NEW_WITHDRAWAL = "new_withdrawal",
  INVITE_ACCEPTED = "invite_accepted",
  INVITE_RECEIVED = "invite_received",
  INVITE_REJECTED = "invite_rejected",
  ADMIN_CONFIGURE = "ADMIN_CONFIGURE",
  USER_REGISTER = "USER_REGISTER",
  USER_LOGIN = "USER_LOGIN",
  PROJECT_CREATE = "PROJECT_CREATE",
  JOB_CREATE = "JOB_CREATE",
  JOB_ASSIGN = "JOB_ASSIGN",
  JOB_CANCEL = "JOB_CANCEL",
  JOB_APPLY = "JOB_APPLY",
  WALLET_GENERATED = "WALLET_GENERATED",
}

interface NotificationUser {
  profile: {
    talent: {
      skills: string[];
      availability: string;
      skillIds: object[];
    };
  };
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  score: number;
}

export interface INotificationDto {
  owner: NotificationUser;
  title: string;
  description: string;
  read: boolean;
  notifyUser: NotificationUser;
  data: string;
  isAdmin: boolean;
  type: INotificationType;
}

export type FindNotificationDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  notification: INotificationDto[];
};

export type filterDto =
  | ({
      page?: string;
      limit?: string;
    } & INotificationDto)
  | any;

export interface NotificationModuleType {
  getAll(filter?: filterDto): Promise<ResponseDto<FindNotificationDto>>;
  markOneAsRead(id: string, filter?: filterDto): Promise<ResponseDto<void>>;
  markAll(): Promise<ResponseDto<void>>;
}
