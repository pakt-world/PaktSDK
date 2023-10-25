import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";

export type fetchAccountDto = {} & IUser;

export interface updateUserDto {
  userName?: string;
  profileImage?: string;
  bgImage?: string;
  profile?: {
    contact?: {
      country?: string;
      state?: string;
      city?: string;
      address?: string;
      phone?: string;
    };
    bio?: {
      title?: string;
      description?: string;
    };
    talent?: {
      about?: string;
      availability?: "busy" | "available" | "working";
      tags?: string[];
      tagsIds?: string | any[];
      tagsCategory?: string;
    };
    privateEarnings?: boolean;
    privateInvestments?: boolean;
  };
  isPrivate?: boolean;
  socials?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  meta?: Record<string, any>;
}

export type TwoFATypeDto = "google_auth" | "email" | "security_answer";

export type TwoFAresponse = {
  type: TwoFATypeDto;
  qrCodeUrl?: string;
  tempToken?: {
    token: string;
    expiresIn: number;
  };
};

export interface FilterUserDto {
  sort?: "score" | string;
  search?: string;
  tags?: string[];
  range?: number[];
  type?: "recipient" | "creator";
  page?: number;
  limit?: number;
}

export interface FindUsers {
  pages: number;
  page: number;
  total: number;
  limit: number;
  data: Record<string, any>[] | IUser[];
}

export interface AccountModuleType {
  getUser(): Promise<ResponseDto<fetchAccountDto>>;
  onboardEndpoint(tagCategory: string, profileImage: string, type: string): Promise<ResponseDto<fetchAccountDto>>;
  updateAccount(payload: updateUserDto): Promise<ResponseDto<fetchAccountDto>>;
  changePassword(oldPassword: string, newPassword: string): Promise<ResponseDto<fetchAccountDto>>;
  initate2FA(type: TwoFATypeDto): Promise<ResponseDto<TwoFAresponse>>;
  activate2FA(code: string): Promise<ResponseDto<void>>;
  deactivate2FA(code: string): Promise<ResponseDto<void>>;
  sendEmailTwoFA(): Promise<ResponseDto<{}>>;
  getAUser(id: string): Promise<ResponseDto<fetchAccountDto>>;
  getUsers(filter?: FilterUserDto): Promise<ResponseDto<FindUsers>>;
  logout(): Promise<ResponseDto<void>>;
}
