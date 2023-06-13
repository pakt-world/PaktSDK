import { Container, Service } from 'typedi'
import { AccountVerifyDto, ChangePasswordDto, LoginDto, RegisterDto, ResetDto } from "./auth.dto";
import { API_PATHS } from "../../utils/constants";
import { PaktConnector } from '../../connector';
import { ErrorUtils, ResponseDto } from '../../utils/response';

// Export all Types to Service
export * from "./auth.dto";

@Service({
  factory: (data: { id: string }) => {
    return new AuthenticationModule(data.id)
  },
  transient: true,
})
export class AuthenticationModule {
  private id: string
  private connector: PaktConnector
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector)
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
      return response;
    })
  }

  /**
   * register. This method creates a new user account.
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   */
  async register(firstName: string, lastName: string, email: string, password: string): Promise<RegisterDto> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { firstName, lastName, email, password }
      const response: RegisterDto = await this.connector.post({ path: API_PATHS.REGISTER, body: credentials });
      return response;
    });
  }

  /**
   * verifyAccount. This method verifies a new user account
   * @param tempToken
   * @param token
   */
  async verifyAccount(tempToken: string, token: string): Promise<AccountVerifyDto> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { tempToken, token }
      const response: AccountVerifyDto = await this.connector.post({ path: API_PATHS.ACCOUNT_VERIFY, body: credentials });
      return response;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resendVerifyLink(email: string): Promise<ResetDto> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { email }
      const response: ResetDto = await this.connector.post({ path: API_PATHS.RESET_PASSWORD, body: credentials });
      return response;
    });
  }

  /**
   * resetPassword. This method sends an email for account password reset
   * @param email
   */
  async resetPassword(email: string): Promise<ResponseDto<ResetDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { email }
      const response: ResponseDto<ResetDto> = await this.connector.post({ path: API_PATHS.RESET_PASSWORD, body: credentials });
      return response;
    })
  }

  /**
   * changePassword. This method changes account password
   * @param token
   * @param password
   */
  async changePassword(token: string, password: string): Promise<ResponseDto<ChangePasswordDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { token, password }
      const response: ChangePasswordDto = this.connector.post({ path: API_PATHS.CHANGE_PASSWORD, body: credentials });
      return response;
    });
  }
}