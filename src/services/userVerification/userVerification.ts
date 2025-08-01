import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { API_PATHS, ErrorUtils, PAKT_BACKOFF_OPTIONS, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import {
  CreateSessionResponse,
  ICreateSessionPayload,
  ISendSessionMedia,
  IVerification,
  SendSessionMediaResponse,
  SessionAttempts,
  UserVerificationModuleType,
} from "./userVerification.dto";
import { BackoffOptions } from "../../utils/backOff/options";

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
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  createSession(props: {
    authToken: string;
    payload: ICreateSessionPayload;
    options?: BackoffOptions;
  }): Promise<ResponseDto<CreateSessionResponse>> {
    const { authToken, payload, options } = props;
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<CreateSessionResponse> = await this.connector.post({
        path: API_PATHS.CREATE_SESSION,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  sendSessionMedia(props: {
    authToken: string;
    payload: ISendSessionMedia;
    options?: BackoffOptions;
  }): Promise<ResponseDto<SendSessionMediaResponse>> {
    const { authToken, payload, options } = props;
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<SendSessionMediaResponse> = await this.connector.post({
        path: API_PATHS.SEND_SESSION_MEDIA,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options);
  }

  getSessionAttempts(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<SessionAttempts>> {
    const { authToken, options } = props;
    const fetchUrl = parseUrlWithQuery(API_PATHS.SESSION_ATTEMPTS, null);
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<SessionAttempts> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getUserVerifications(props: { authToken: string; options?: BackoffOptions }): Promise<ResponseDto<IVerification[]>> {
    const { authToken, options } = props;
    const fetchUrl = parseUrlWithQuery(API_PATHS.USER_VERIFICATION, null);
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IVerification[]> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
