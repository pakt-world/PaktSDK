import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS, ErrorUtils, PAKT_BACKOFF_OPTIONS, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import { FilterInviteDto, FindInvitesDto, IInviteDto, InviteModuleType, SendInviteDto } from "./invite.dto";
import { BackoffOptions } from "../../utils/backOff/options";

export * from "./invite.dto";

@Service({
  factory: (data: { id: string }) => {
    return new InviteModule(data.id);
  },
  transient: true,
})
export class InviteModule implements InviteModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  sendInvite(props: { authToken: string; payload: SendInviteDto; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.SEND_INVITE}`;
      const payloadInfo = { ...payload };
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
        body: payloadInfo,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  acceptInvite(props: { authToken: string; inviteId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, inviteId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.ACCEPT_INVITE}/${inviteId}/accept`;
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  declineInvite(props: { authToken: string; inviteId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, inviteId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.DECLINE_INVITE}/${inviteId}/decline`;
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getAll(props: {
    authToken: string;
    filter?: FilterInviteDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindInvitesDto>> {
    const { authToken, filter, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.VIEW_ALL_INVITE, filter);
      const response: ResponseDto<FindInvitesDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getAnInvite(props: {
    authToken: string;
    inviteId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IInviteDto>> {
    const { authToken, inviteId } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = `${API_PATHS.VIEW_A_INVITE}/${inviteId}`;
      const response: ResponseDto<IInviteDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  cancelInvite(props: { authToken: string; inviteId: string; options?: BackoffOptions }): Promise<ResponseDto<{}>> {
    const { authToken, inviteId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.CANCEL_AN_INVITE}/${inviteId}/cancel`;
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
