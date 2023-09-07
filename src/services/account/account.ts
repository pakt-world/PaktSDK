import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { IUser } from "../auth";
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
   * @param payload CreateJobDto
   */
  async getUser(): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<fetchAccountDto> = await this.connector.get({ path: API_PATHS.ACCOUNT });
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
  ): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const body = { skillCategory, profileImage, type };
      const response: ResponseDto<fetchAccountDto> = await this.connector.post({
        path: API_PATHS.ACCOUNT_ONBOARD,
        body,
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
  async updateAccount(payload: updateUserDto): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const body = { ...payload };
      const response: ResponseDto<fetchAccountDto> = await this.connector.patch({
        path: API_PATHS.ACCOUNT_UPDATE,
        body,
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
  async changePassword(oldPassword: string, newPassword: string): Promise<ResponseDto<fetchAccountDto>> {
    return ErrorUtils.tryFail(async () => {
      const body = { oldPassword, newPassword };
      const response: ResponseDto<fetchAccountDto> = await this.connector.put({
        path: API_PATHS.ACCOUNT_PASSWORD,
        body,
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
  async initate2FA(type: TwoFATypeDto): Promise<ResponseDto<TwoFAresponse>> {
    return ErrorUtils.tryFail(async () => {
      const body = { type };
      const response: ResponseDto<TwoFAresponse> = await this.connector.post({
        path: API_PATHS.ACCOUNT_PASSWORD,
        body,
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
  async activate2FA(code: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_TWO_ACTIVATE, body });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * active2FA.
   * @param code string
   */
  async deactivate2FA(code: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_TWO_DEACTIVATE, body });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getAUser(id: string): Promise<ResponseDto<IUser>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IUser> = await this.connector.get({ path: `${API_PATHS.ACCOUNT_FETCH_ALL}${id}` });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
  getUsers(filter?: FilterUserDto | undefined): Promise<ResponseDto<FindUsers>> {
    if (filter) {
      const { tags, type, search, sort, range } = filter;
      const ranges = range?.join(",");
      const tagger = tags?.join(",");
      const query = parseUrlWithQuery(API_PATHS.ACCOUNT_FETCH_ALL, { tags: tagger, range: ranges, type, search, sort });
      return ErrorUtils.tryFail(async () => {
        const response: ResponseDto<FindUsers> = await this.connector.get({ path: query });
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
  async logout(): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_LOGOUT });
      return response.data;
    });
  }
}
