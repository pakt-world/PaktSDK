import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
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

  createSession(authToken: string, payload: ICreateSessionPayload): Promise<ResponseDto<CreateSessionResponse>> {
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<CreateSessionResponse> = await this.connector.post({
        path: API_PATHS.CREATE_SESSION,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  sendSessionMedia(authToken: string, payload: ISendSessionMedia): Promise<ResponseDto<SendSessionMediaResponse>> {
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<SendSessionMediaResponse> = await this.connector.post({
        path: API_PATHS.SEND_SESSION_MEDIA,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  getSessionAttempts(authToken: string): Promise<ResponseDto<SessionAttempts>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.SESSION_ATTEMPTS, null);
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<SessionAttempts> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  getUserVerifications(authToken: string): Promise<ResponseDto<IVerification[]>> {
    const fetchUrl = parseUrlWithQuery(API_PATHS.USER_VERIFICATION, null);
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IVerification[]> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
