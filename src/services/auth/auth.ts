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
    return ErrorUtils.newTryFail(async () => {
      const credentials = { email, password };
      const response: ResponseDto<LoginDto> = await this.connector.post({ path: API_PATHS.LOGIN, body: credentials });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      if (response.data.tempToken) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      } else {
        Container.of(this.id).set(AUTH_TOKEN, response.data.token);
      }
      return response;
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
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<RegisterDto> = await this.connector.post({
        path: API_PATHS.REGISTER,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      if (response.data.tempToken.token) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response;
    });
  }

  /**
   * verifyAccount. This method verifies a new user account
   * @param tempToken
   * @param token
   */
  async verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { tempToken, token };
      const response: ResponseDto<AccountVerifyDto> = await this.connector.post({
        path: API_PATHS.ACCOUNT_VERIFY,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;

      Container.of(this.id).set(AUTH_TOKEN, response.data.token);

      return response;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resendVerifyLink(email: string): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { email };
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.RESEND_VERIFY_LINK,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;

      if (response.data.tempToken) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resetPassword(email: string): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { email };
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.RESET_PASSWORD,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  /**
   * changePassword. This method changes account password
   * @param token
   * @param password
   */
  async changePassword(token: string, tempToken: string, password: string): Promise<ResponseDto<ChangePasswordDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { token, tempToken, password };
      const response: ResponseDto<ChangePasswordDto> = await this.connector.post({
        path: API_PATHS.CHANGE_PASSWORD,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  validatePasswordToken(token: string, tempToken: string): Promise<ResponseDto<ValidatePasswordToken>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { token, tempToken };
      const response: ResponseDto<ChangePasswordDto> = await this.connector.post({
        path: `${API_PATHS.VALIDATE_PASSWORD_TOKEN}/${token}`,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { token };
      const response: ResponseDto<ValidateReferralDto> = await this.connector.post({
        path: `${API_PATHS.VALIDATE_REFERRAL}`,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
