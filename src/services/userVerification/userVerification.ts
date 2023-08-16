import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS, ErrorUtils, ResponseDto, parseUrlWithQUery } from "../../utils";
import {
  CreateSessionResponse,
  ICreateSessionPayload,
  ISendSessionMedia,
  IVerification,
  SendSessionMediaResponse,
  SessionAttempts,
  UserVerificationModuleType,
} from "./userVerification.dto";

export * from "./userVerification.dto";

@Service({
  factory: (data: { id: string }) => {
    return new UserVerificationModule(data.id);
  },
  transient: true,
})
export class UserVerificationModule implements UserVerificationModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  createSession(payload: ICreateSessionPayload): Promise<ResponseDto<CreateSessionResponse>> {
    const credentials = { ...payload };
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<CreateSessionResponse> = await this.connector.post({
        path: API_PATHS.CREATE_SESSION,
        body: credentials,
      });
      return response.data;
    });
  }

  sendSessionMedia(payload: ISendSessionMedia): Promise<ResponseDto<SendSessionMediaResponse>> {
    const credentials = { ...payload };
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<SendSessionMediaResponse> = await this.connector.post({
        path: API_PATHS.SEND_SESSION_MEDIA,
        body: credentials,
      });
      return response.data;
    });
  }

  getSessionAttempts(): Promise<ResponseDto<SessionAttempts>> {
    const fetchUrl = parseUrlWithQUery(API_PATHS.SESSION_ATTEMPTS, null);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<SessionAttempts> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }

  getUserVerifications(): Promise<ResponseDto<IVerification[]>> {
    const fetchUrl = parseUrlWithQUery(API_PATHS.USER_VERIFICATION, null);
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IVerification[]> = await this.connector.get({
        path: fetchUrl,
      });
      return response.data;
    });
  }
}
