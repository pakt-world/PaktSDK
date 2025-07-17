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
  isPrivate?: boolean;
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
  isBookmarked?: boolean;
  bookmarkId?: string;
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
  token: string;
  token_type: string;
  expiresIn: number;
}

export interface IRegisterResponse {
  tempToken: {
    token: string;
    token_type: string;
    expiresIn: number;
  };
}

export interface RegisterPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  referral?: string;
  type?: string;
}

export interface VerifyAccountPayload {
  tempToken: string;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangeAuthenticationPasswordPayload {
  token: string;
  tempToken: string;
  password: string;
}

export interface ResendVerifyPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export type AccountVerifyDto = {
  token: string;
  expiresIn: number;
} & IUser;

export interface IResendVerifyLink {
  tempToken: {
    token: string;
    expiresIn: number;
    token_type: string;
  };
}
export type ResetDto = {
  tempToken: {
    token: string;
    expiresIn: number;
    token_type: string;
  };
};
export type ResendVerifyDto = void;
export type ChangePasswordDto = void;
export type ValidatePasswordToken = void;

export type ValidateReferralDto = {
  valid: boolean;
  userId: string;
  referralCounts: number;
  totalAllowedReferrals: number;
  referralId: string;
  role: string;
  isKyc: boolean;
};

export interface GoogleOAuthGenerateDto {
  googleAuthUrl: string;
  state: string;
}

export interface GoogleOAuthValdatePayload {
  state: string;
  code: string;
}

export interface GoogleOAuthValidateDto {
  token: string;
  token_type: string;
  expiresIn: number;
  isVerified: boolean;
  timeZone: string | undefined;
  type: "sign_in" | "sign_up";
}

export interface AuthenticationModuleType {
  login(payload: LoginPayload): Promise<ResponseDto<LoginDto>>;
  register(payload: RegisterPayload): Promise<ResponseDto<RegisterDto>>;
  verifyAccount(payload: VerifyAccountPayload): Promise<ResponseDto<AccountVerifyDto>>;
  resendVerifyLink(payload: ResendVerifyPayload): Promise<ResponseDto<IResendVerifyLink>>;
  resetPassword(payload: ResetPasswordPayload): Promise<ResponseDto<ResetDto>>;
  changePassword(payload: ChangeAuthenticationPasswordPayload): Promise<ResponseDto<ChangePasswordDto>>;
  validatePasswordToken(props: { token: string; tempToken: string }): Promise<ResponseDto<ValidatePasswordToken>>;
  validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>>;
  googleOAuthGenerateState(): Promise<ResponseDto<GoogleOAuthGenerateDto>>;
  googleOAuthValidateState(props: GoogleOAuthValdatePayload): Promise<ResponseDto<GoogleOAuthValidateDto>>;
}
