import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";

export type fetchAccountDto = {} & IUser;

export interface updateUserDto {
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

export type TwoFATypeDto = "google_auth" | "email";

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
  owner?: boolean;
  profileCompletenessMin?: number;
  profileCompletenessMax?: number;
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
  getUser(authToken: string): Promise<ResponseDto<fetchAccountDto>>;
  onboardEndpoint(
    tagCategory: string,
    profileImage: string,
    type: string,
    authToken: string,
  ): Promise<ResponseDto<fetchAccountDto>>;
  updateAccount(payload: updateUserDto, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
  changePassword(oldPassword: string, newPassword: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
  initate2FA(type: TwoFATypeDto, authToken: string): Promise<ResponseDto<TwoFAresponse>>;
  activate2FA(code: string, authToken: string): Promise<ResponseDto<void>>;
  deactivate2FA(code: string, authToken: string): Promise<ResponseDto<void>>;
  sendEmailTwoFA(authToken: string): Promise<ResponseDto<{}>>;
  getAUser(id: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
  getUsers(authToken: string, filter?: FilterUserDto): Promise<ResponseDto<FindUsers>>;
  logout(authToken: string): Promise<ResponseDto<void>>;
}
