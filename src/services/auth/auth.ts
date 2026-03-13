import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, parseUrlWithQuery, ResponseDto, Status } from "../../utils/response";
import { AUTH_TOKEN, TEMP_TOKEN } from "../../utils/token";
import {
  AccountVerifyDto,
  AuthenticationModuleType,
  ChangeAuthenticationPasswordPayload,
  ChangePasswordDto,
  GoogleOAuthGenerateDto,
  GoogleOAuthValdatePayload,
  GoogleOAuthValidateDto,
  IRegisterResponse,
  IResendVerifyLink,
  LoginDto,
  LoginPayload,
  LoginTwoFADTO,
  LoginTwoFAPayload,
  RegisterDto,
  RegisterPayload,
  ResendVerifyPayload,
  ResetDto,
  ResetPasswordPayload,
  ValidatePasswordToken,
  ValidateReferralDto,
  VerifyAccountPayload,
  Web3AuthOnboardDto,
  Web3AuthOnboardPayload,
  Web3AuthRequestDto,
  Web3AuthRequestPayload,
  Web3AuthValidateDto,
  Web3AuthValidatePayload,
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
  async login(payload: LoginPayload): Promise<ResponseDto<LoginDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<LoginDto> = await this.connector.post({ path: API_PATHS.v1.LOGIN, body: payload });
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
   * login with Two FA. This method completes authentication for a user with Two-FA Activated.
   * @param email
   * @param password
   */
  async loginTwoFa(payload: LoginTwoFAPayload): Promise<ResponseDto<LoginTwoFADTO>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<LoginTwoFADTO> = await this.connector.post({
        path: API_PATHS.v1.LOGIN_TWO_FA,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      Container.of(this.id).set(AUTH_TOKEN, response.data.token);
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
      const response: ResponseDto<IRegisterResponse> = await this.connector.post({
        path: API_PATHS.v1.REGISTER,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        return response as unknown as ResponseDto<RegisterDto>;
      if (response.data?.tempToken.token) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return {
        ...response,
        data: {
          token: response.data.tempToken.token,
          token_type: response.data.tempToken.token_type,
          expiresIn: response.data.tempToken.expiresIn,
        },
      };
    });
  }

  /**
   * verifyAccount. This method verifies a new user account
   * @param tempToken
   * @param token
   */
  async verifyAccount(payload: VerifyAccountPayload): Promise<ResponseDto<AccountVerifyDto>> {
    const { tempToken, token } = payload;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { tempToken, token };
      const response: ResponseDto<AccountVerifyDto> = await this.connector.post({
        path: API_PATHS.v1.ACCOUNT_VERIFY,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;

      Container.of(this.id).set(AUTH_TOKEN, response.data.token);

      return { ...response, data: { ...response.data, code: response.data.token } };
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resendVerifyLink(payload: ResendVerifyPayload): Promise<ResponseDto<IResendVerifyLink>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.v1.RESEND_VERIFY_LINK,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;

      if (response.data.tempToken) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response;
    });
  }

  /**
   * resendResetPassword. This method resends an email for account password reset
   * @param email
   */
  async resendResetPassword(payload: ResetPasswordPayload): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.v1.RESEND_RESET_PASSWORD,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ResetDto> = await this.connector.post({
        path: API_PATHS.v1.RESET_PASSWORD,
        body: payload,
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
  async changePassword(payload: ChangeAuthenticationPasswordPayload): Promise<ResponseDto<ChangePasswordDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ChangePasswordDto> = await this.connector.post({
        path: API_PATHS.v1.CHANGE_PASSWORD,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async validatePasswordToken(props: {
    token: string;
    tempToken: string;
  }): Promise<ResponseDto<ValidatePasswordToken>> {
    return ErrorUtils.newTryFail(async () => {
      const { token, tempToken } = props;
      const response: ResponseDto<ChangePasswordDto> = await this.connector.post({
        path: API_PATHS.v1.VALIDATE_PASSWORD_TOKEN,
        body: { tempToken, token },
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { token };
      const response: ResponseDto<ValidateReferralDto> = await this.connector.post({
        path: API_PATHS.v1.VALIDATE_REFERRAL,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async googleOAuthGenerateState(): Promise<ResponseDto<GoogleOAuthGenerateDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<GoogleOAuthGenerateDto> = await this.connector.get({
        path: API_PATHS.v1.GOOGLE_OAUTH_GENERATE_STATE,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  googleOAuthValidateState(props: GoogleOAuthValdatePayload): Promise<ResponseDto<GoogleOAuthValidateDto>> {
    return ErrorUtils.newTryFail(async () => {
      const { state, code } = props;
      const query = parseUrlWithQuery(API_PATHS.v1.GOOGLE_OAUTH_VALIDATE_STATE, { state, code });
      const response: ResponseDto<GoogleOAuthValidateDto> = await this.connector.post({
        path: query,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  resendTwoFAEmailCode(email: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<{}> = await this.connector.post({
        body: { email },
        path: API_PATHS.v1.RESEND_TWO_FA_EMAIL_CODE,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async web3AuthRequest(payload: Web3AuthRequestPayload): Promise<ResponseDto<Web3AuthRequestDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<Web3AuthRequestDto> = await this.connector.post({
        path: API_PATHS.v1.WEB3_AUTH_REQUEST,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      if (response.data?.tempToken?.token) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response;
    });
  }

  async web3AuthValidate(payload: Web3AuthValidatePayload): Promise<ResponseDto<Web3AuthValidateDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<Web3AuthValidateDto> = await this.connector.post({
        path: API_PATHS.v1.WEB3_AUTH_VALIDATE,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      if (response.data?.token) {
        Container.of(this.id).set(AUTH_TOKEN, response.data.token);
      } else if (response.data?.tempToken?.token) {
        Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
      }
      return response;
    });
  }

  async web3AuthOnboard(payload: Web3AuthOnboardPayload): Promise<ResponseDto<Web3AuthOnboardDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<Web3AuthOnboardDto> = await this.connector.post({
        path: API_PATHS.v1.WEB3_AUTH_ONBOARD,
        body: payload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
