import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import { AUTH_TOKEN, TEMP_TOKEN } from "../../utils/token";
import {
  AccountVerifyDto,
  AuthenticationModuleType,
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  RegisterPayload,
  ResetDto,
  ValidatePasswordToken,
  ValidateReferralDto,
} from "./auth.dto";

// Export all Types to Service
export * from "./auth.dto";

@Service({
  factory: (data: { id: string }) => {
    return new AuthenticationModule(data.id);
  },
  transient: true,
})
export class AuthenticationModule implements AuthenticationModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  /**
   * login. This method authenticates a user.
   * @param email
   * @param password
   */
  async login(email: string, password: string): Promise<ResponseDto<LoginDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { email, password };
      const response: ResponseDto<LoginDto> = await this.connector.post({ path: API_PATHS.LOGIN, body: credentials });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      if (response.data.tempToken) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      } else {
        Container.of(this.id).set(AUTH_TOKEN, response.data.token);
      }
      return response.data;
    });
  }

  /**
   * register. This method creates a new user account.
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   */
  async register(payload: RegisterPayload): Promise<ResponseDto<RegisterDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<RegisterDto> = await this.connector.post({
        path: API_PATHS.REGISTER,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      if (response.data.tempToken.token) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response.data;
    });
  }

  /**
   * verifyAccount. This method verifies a new user account
   * @param tempToken
   * @param token
   */
  async verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { tempToken, token };
      const response: ResponseDto<AccountVerifyDto> = await this.connector.post({
        path: API_PATHS.ACCOUNT_VERIFY,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);

      Container.of(this.id).set(AUTH_TOKEN, response.data.token);

      return response.data;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resendVerifyLink(email: string): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { email };
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.RESEND_VERIFY_LINK,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);

      if (response.data.tempToken) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response.data;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resetPassword(email: string): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { email };
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.RESET_PASSWORD,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * changePassword. This method changes account password
   * @param token
   * @param password
   */
  async changePassword(token: string, tempToken: string, password: string): Promise<ResponseDto<ChangePasswordDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { token, tempToken, password };
      const response: ResponseDto<ChangePasswordDto> = await this.connector.post({
        path: API_PATHS.CHANGE_PASSWORD,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  validatePasswordToken(token: string, tempToken: string): Promise<ResponseDto<ValidatePasswordToken>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { token, tempToken };
      const response: ResponseDto<ChangePasswordDto> = await this.connector.post({
        path: `${API_PATHS.VALIDATE_PASSWORD_TOKEN}/${token}`,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { token };
      const response: ResponseDto<ValidateReferralDto> = await this.connector.post({
        path: `${API_PATHS.VALIDATE_REFERRAL}`,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
