import { BackoffOptions } from "../../utils/backOff/options";
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
  getUser(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<fetchAccountDto>>;
  onboardEndpoint(props: {
    tagCategory: string;
    skillCategory: string;
    profileImage: string;
    type: string;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>>;
  updateAccount(props: {
    payload: updateUserDto;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>>;
  changePassword(props: {
    oldPassword: string;
    newPassword: string;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>>;
  initate2FA(props: {
    type: TwoFATypeDto;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<TwoFAresponse>>;
  activate2FA(props: { code: string; authToken: string; options?: BackoffOptions }): Promise<ResponseDto<void>>;
  deactivate2FA(props: { code: string; authToken: string; options?: BackoffOptions }): Promise<ResponseDto<void>>;
  sendEmailTwoFA(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<{}>>;
  getAUser(props: { id: string; authToken: string; options?: BackoffOptions }): Promise<ResponseDto<fetchAccountDto>>;
  getUsers(props: {
    filter?: FilterUserDto;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindUsers>>;
  logout(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<void>>;
}
