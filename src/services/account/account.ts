import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import {
  AccountModuleType,
  FilterUserDto,
  FindUsers,
  TwoFATypeDto,
  TwoFAresponse,
  fetchAccountDto,
  updateUserDto,
} from "./account.dto";
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";

// Export all Types to Service
export * from "./account.dto";

@Service({
  factory: (data: { id: string }) => {
    return new AccountModule(data.id);
  },
  transient: true,
})
export class AccountModule implements AccountModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  /**
   * getUser.
   */
  async getUser(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<fetchAccountDto>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<fetchAccountDto> = await this.connector.get({ path: API_PATHS.ACCOUNT, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * onboardEndpoint.
   * @param skillCategory string
   * @param profileImage string
   * @param type string
   */
  async onboardEndpoint(props: {
    skillCategory: string;
    profileImage: string;
    type: string;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>> {
    const { skillCategory, profileImage, type, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const body = { skillCategory, profileImage, type };
      const response: ResponseDto<fetchAccountDto> = await this.connector.post({
        path: API_PATHS.ACCOUNT_ONBOARD,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * onboardEndpoint.
   * @param skillCategory string
   * @param profileImage string
   * @param type string
   */
  async updateAccount(props: {
    payload: updateUserDto;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<fetchAccountDto> = await this.connector.patch({
        path: API_PATHS.ACCOUNT_UPDATE,
        body: payload,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * change Password.
   * @param oldPassword string
   * @param newPassword string
   */
  async changePassword(props: {
    oldPassword: string;
    newPassword: string;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>> {
    const { oldPassword, newPassword, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const body = { oldPassword, newPassword };
      const response: ResponseDto<fetchAccountDto> = await this.connector.put({
        path: API_PATHS.ACCOUNT_PASSWORD,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * initate2FA.
   * @param type TwoFATypeDto
   */
  async initate2FA(props: {
    type: TwoFATypeDto;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<TwoFAresponse>> {
    const { type, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const body = { type };
      const response: ResponseDto<TwoFAresponse> = await this.connector.post({
        path: API_PATHS.ACCOUNT_PASSWORD,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * active2FA.
   * @param code string
   */
  async activate2FA(props: { code: string; authToken: string; options?: BackoffOptions }): Promise<ResponseDto<void>> {
    const { code, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ACCOUNT_TWO_ACTIVATE,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * active2FA.
   * @param code string
   */
  async deactivate2FA(props: {
    code: string;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<void>> {
    const { code, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ACCOUNT_TWO_DEACTIVATE,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  async sendEmailTwoFA(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<{}> = await this.connector.post({
        path: API_PATHS.ACCOUNT_SEND_EMAIL_TWO_FA,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  async getAUser(props: {
    id: string;
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<fetchAccountDto>> {
    const { id, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<fetchAccountDto> = await this.connector.get({
        path: `${API_PATHS.ACCOUNT_FETCH_SINGLE}${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  async getUsers(props: {
    authToken: string;
    filter?: FilterUserDto | undefined;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindUsers>> {
    const { filter, authToken, options } = props;
    if (filter) {
      const query = parseUrlWithQuery(API_PATHS.ACCOUNT_FETCH_ALL, { ...filter });
      return ErrorUtils.newTryFail(async () => {
        const response: ResponseDto<FindUsers> = await this.connector.get({ path: query, authToken });
        if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
        return response;
      });
    }
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<FindUsers> = await this.connector.get({ path: API_PATHS.ACCOUNT_FETCH_ALL });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * Logout.
   */
  async logout(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<void>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_LOGOUT, authToken });
      return response;
    }, options || this.configBackOff);
  }
}
