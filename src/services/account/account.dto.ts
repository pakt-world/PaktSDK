import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";

export type fetchAccountDto = {} & IUser;

export type updateUserDto = {
  userName: string;
  profileImage: string;
  profile: {
    contact: {
      country: string;
      state: string;
      city: string;
      address: string;
      phone: string;
    };
    bio: {
      title: string;
      description: string;
    };
    talent: {
      about: string;
      availability: string;
      tags: string[];
      tagsIds: string | any[];
      tagsCategory: string;
    };
    privateEarnings: boolean;
    privateInvestments: boolean;
  };
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
  };
};

export type TwoFATypeDto = "google_auth" | "email";

export type TwoFAresponse = {
  type: TwoFATypeDto;
  qrCodeUrl?: string;
  tempToken?: {
    token: string;
    expiresIn: number;
  };
};

export interface AccountModuleType {
  getUser(): Promise<ResponseDto<fetchAccountDto>>;
  onboardEndpoint(tagCategory: string, profileImage: string, type: string): Promise<ResponseDto<fetchAccountDto>>;
  updateAccount(payload: updateUserDto): Promise<ResponseDto<fetchAccountDto>>;
  changePassword(oldPassword: string, newPassword: string): Promise<ResponseDto<fetchAccountDto>>;
  initate2FA(type: TwoFATypeDto): Promise<ResponseDto<TwoFAresponse>>;
  active2FA(code: string): Promise<ResponseDto<void>>;
  deactive2FA(code: string): Promise<ResponseDto<void>>;
  logout(): Promise<ResponseDto<void>>;
}
