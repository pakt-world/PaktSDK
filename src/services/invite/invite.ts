import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import { FilterInviteDto, FindInvitesDto, IInviteDto, InviteModuleType, SendInviteDto } from "./invite.dto";

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
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  sendInvite(payload: SendInviteDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const url = `${API_PATHS.SEND_INVITE}`;
      const payloadInfo = { ...payload };
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
        body: payloadInfo,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  acceptInvite(inviteId: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const url = `${API_PATHS.ACCEPT_INVITE}/${inviteId}/accept`;
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  declineInvite(inviteId: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const url = `${API_PATHS.DECLINE_INVITE}/${inviteId}/decline`;
      const response: ResponseDto<{}> = await this.connector.post({
        path: url,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getAll(filter?: FilterInviteDto): Promise<ResponseDto<FindInvitesDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.VIEW_ALL_INVITE, filter);
      const response: ResponseDto<FindInvitesDto> = await this.connector.get({ path: fetchUrl });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getAnInvite(id: string): Promise<ResponseDto<IInviteDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = `${API_PATHS.VIEW_A_INVITE}/${id}`;
      const response: ResponseDto<IInviteDto> = await this.connector.get({ path: fetchUrl });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
