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
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  /**
   * getUser.
   */
  async getUser(authToken: string): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<fetchAccountDto> = await this.connector.get({ path: API_PATHS.ACCOUNT, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * onboardEndpoint.
   * @param skillCategory string
   * @param profileImage string
   * @param type string
   */
  async onboardEndpoint(
    skillCategory: string,
    profileImage: string,
    type: string,
    authToken: string,
  ): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const body = { skillCategory, profileImage, type };
      const response: ResponseDto<fetchAccountDto> = await this.connector.post({
        path: API_PATHS.ACCOUNT_ONBOARD,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * onboardEndpoint.
   * @param skillCategory string
   * @param profileImage string
   * @param type string
   */
  async updateAccount(payload: updateUserDto, authToken: string): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const body = { ...payload };
      const response: ResponseDto<fetchAccountDto> = await this.connector.patch({
        path: API_PATHS.ACCOUNT_UPDATE,
        body: payload,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * change Password.
   * @param oldPassword string
   * @param newPassword string
   */
  async changePassword(
    oldPassword: string,
    newPassword: string,
    authToken: string,
  ): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const body = { oldPassword, newPassword };
      const response: ResponseDto<fetchAccountDto> = await this.connector.put({
        path: API_PATHS.ACCOUNT_PASSWORD,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * initate2FA.
   * @param type TwoFATypeDto
   */
  async initate2FA(type: TwoFATypeDto, authToken: string): Promise<ResponseDto<TwoFAresponse>> {
    return ErrorUtils.tryFail(async () => {
      const body = { type };
      const response: ResponseDto<TwoFAresponse> = await this.connector.post({
        path: API_PATHS.ACCOUNT_PASSWORD,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * active2FA.
   * @param code string
   */
  async activate2FA(code: string, authToken: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ACCOUNT_TWO_ACTIVATE,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * active2FA.
   * @param code string
   */
  async deactivate2FA(code: string, authToken: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ACCOUNT_TWO_DEACTIVATE,
        body,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  async sendEmailTwoFA(authToken: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<{}> = await this.connector.post({
        path: API_PATHS.ACCOUNT_SEND_EMAIL_TWO_FA,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  async getAUser(id: string, authToken: string): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<fetchAccountDto> = await this.connector.get({
        path: `${API_PATHS.ACCOUNT_FETCH_SINGLE}${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  async getUsers(authToken: string, filter?: FilterUserDto | undefined): Promise<ResponseDto<FindUsers>> {
    if (filter) {
      const query = parseUrlWithQuery(API_PATHS.ACCOUNT_FETCH_ALL, { ...filter });
      return ErrorUtils.tryFail(async () => {
        const response: ResponseDto<FindUsers> = await this.connector.get({ path: query, authToken });
        if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
          throw new Error(response.message);
        return response.data;
      });
    }
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindUsers> = await this.connector.get({ path: API_PATHS.ACCOUNT_FETCH_ALL });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * Logout.
   */
  async logout(authToken: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_LOGOUT, authToken });
      return response.data;
    });
  }
}
