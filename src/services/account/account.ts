import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto } from "../../utils/response";
import { AccountModuleType, TwoFATypeDto, TwoFAresponse, fetchAccountDto, updateUserDto } from "./account.dto";

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
      return response.data;
    });
  }

  /**
   * active2FA.
   * @param code string
   */
  async active2FA(code: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_TWO_ACTIVATE, body });
      return response.data;
    });
  }

  /**
   * active2FA.
   * @param code string
   */
  async deactive2FA(code: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const body = { code };
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.ACCOUNT_TWO_DEACTIVATE, body });
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
