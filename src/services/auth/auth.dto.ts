import { ResponseDto } from "../../utils/response";

export interface IUser {
  _id: string;
  type: string;
  email: string;
  lastName: string;
  firstName: string;
  afroScore: number;
  profileCompleteness: number;
  profileImage?: {
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
      availability: string;
      skills: string[];
      skillIds: any[];
      about?: string;
    };
  };
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

export type RegisterDto = {
  tempToken: {
    token: string;
    token_type: string;
    expiresIn: number;
  }
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

export interface AuthenticationModuleType {
  login(email: string, password: string): Promise<ResponseDto<LoginDto>>;
  register(firstName: string, lastName: string, email: string, password: string): Promise<ResponseDto<RegisterDto>>;
  verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>>;
  resendVerifyLink(email: string): Promise<ResponseDto<ResendVerifyDto>>;
  resetPassword(email: string): Promise<ResponseDto<ResetDto>>;
  changePassword(token: string, pasword: string): Promise<ResponseDto<ChangePasswordDto>>;
  validatePasswordToken(token: string): Promise<ResponseDto<ValidatePasswordToken>>;
}