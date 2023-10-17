import { ResponseDto } from "../../utils/response";
import { IChatConversation } from "../chat/chat.dto";

export type IUserTwoFaType = "email" | "google_auth" | "security_answer";

export interface IUser {
  _id: string;
  type: string;
  email: string;
  lastName: string;
  firstName: string;
  score: number;
  profileCompleteness: number;
  profileImage?: {
    _id?: string;
    type?: string;
    size?: string;
    url: string;
  };
  bgImage?: {
    _id?: string;
    type?: string;
    size?: string;
    url: string;
  };
  profile: {
    contact?: {
      city?: string;
      state?: string;
      phone?: string;
      address?: string;
      country?: string;
    };
    bio?: {
      title?: string;
      description?: string;
    };
    talent: {
      availability: "busy" | "available" | "working";
      tags: string[];
      tagsIds: any[];
      tagsCategory: string;
      about?: string;
    };
  };
  socket?: {
    id: string;
    status: "ONLINE" | "AWAY" | "OFFLINE";
    conversation: IChatConversation;
  };
  twoFa?: {
    status: boolean;
    type: IUserTwoFaType;
    securityQuestion?: string;
  };
  meta?: Record<string, any>;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export type LoginDto = {
  email: string;
  token: string;
  onboarded: boolean;
  isVerified: boolean;
  tempToken: {
    token: string;
    expiresIn: number;
  };
} & IUser;

export interface RegisterDto {
  tempToken: {
    token: string;
    token_type: string;
    expiresIn: number;
  };
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referral?: string;
}

export type AccountVerifyDto = {
  token: string;
  expiresIn: number;
} & IUser;

export type ResetDto = {
  tempToken: {
    token: string;
    expiresIn: number;
  };
};
export type ResendVerifyDto = void;
export type ChangePasswordDto = void;
export type ValidatePasswordToken = void;

export type ValidateReferralDto = {
  valid: boolean;
  userId: string;
  referralId: string;
};

export interface AuthenticationModuleType {
  login(email: string, password: string): Promise<ResponseDto<LoginDto>>;
  register(payload: RegisterPayload): Promise<ResponseDto<RegisterDto>>;
  verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>>;
  resendVerifyLink(email: string): Promise<ResponseDto<ResetDto>>;
  resetPassword(email: string): Promise<ResponseDto<ResetDto>>;
  changePassword(token: string, tempToken: string, password: string): Promise<ResponseDto<ChangePasswordDto>>;
  validatePasswordToken(token: string, tempToken: string): Promise<ResponseDto<ValidatePasswordToken>>;
  validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>>;
}
